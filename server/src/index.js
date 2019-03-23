import logger from 'morgan';
import fs from 'fs';
import path from 'path';
import db from './modules';
import jwt from 'jsonwebtoken';
import express from 'express';
import { GraphQLServer } from 'graphql-yoga';
import { HOST, PORT } from './config';

const typeDefs = `

  type Error {
    path: String
    message: String
  }

  type User {
    id: String
    username: String
  }

  type Token {
    token: String
  }

  type UserGuess {
    name: String
    value: Int
  }

  input UserGuessInput {
    name: String
    value: Int
  }

  type AllUsersGuesses {
    username: String
    userGuesses: [UserGuess]
  }

  type Query {
    hello(name: String): String!
    me: User
    getUserGuess(id: String, username: String): [UserGuess]
    getUsersGuesses: [AllUsersGuesses]
  }

  type Mutation {
    register(username: String!, password: String!): [Error!]!
    login(username: String!, password: String!): Token
    vote(userGuesses: [UserGuessInput!]!): String
  }
`;

const privateKey = fs.readFileSync(path.join(__dirname, '../jwtRS256.key'), 'utf8');
const publicKey = fs.readFileSync(path.join(__dirname, '../jwtRS256.key.pub'), 'utf8');

const signOptions = { expiresIn: '1y', algorithm: 'RS256' };

const resolvers = {
  Query: {
    hello: (_, { name }) => `Hello ${name || 'World'}`,
    me: async (_, __, { db: { User }, request: { userId } }) => {
      if (userId) {
        return User.findOne({ where: { id: userId } });
      }
      return null;
    },
    getUserGuess: async (_, __, { db: { UserGuess }, request: { userId } }) => {
      if (userId) {
        const {
          guess: { userGuesses }
        } = await UserGuess.findOne({ where: { userId }, attributes: ['guess'] });
        // console.log(userGuesses);
        return userGuesses;
      }
      return null;
    },
    getUsersGuesses: async (_, __, { db: { User, UserGuess } }) => {
      const usersGuesses = await UserGuess.findAll({ include: [User] });
      return usersGuesses.map(({ dataValues: { user: { username }, guess: { userGuesses } } }) => {
        return { username, userGuesses };
      });
    }
  },
  Mutation: {
    register: async (_, { username, password }, { db: { User, UserGuess } }) => {
      const user = await User.create({ username, password });
      await UserGuess.create({ userId: user.id });
      return [{ path: '', message: '' }];
    },
    login: async (_, { username, password }, { db: { User } }) => {
      const user = await User.findOne({ where: { username } });
      if (!user) {
        throw new Error('User not found');
      }
      const legit = await user.verifyPassword(password, user.password);
      if (!legit) {
        throw new Error('Wrong password');
      }
      const { id } = user;
      return { token: jwt.sign({ userId: id }, privateKey, signOptions) };
    },
    vote: async (_, { userGuesses }, { db: { UserGuess }, request: { userId } }) => {
      if (userId) {
        // console.log(userGuesses);
        const res = await UserGuess.update({ guess: { userGuesses } }, { where: { userId } });
        console.log(res);
        return '';
      }
      return null;
    }
  }
};

const verifyUser = async req => {
  if (!req.headers.authorization) return req.next();
  const token = req.headers.authorization.split(' ')[1];
  try {
    const { userId } = await jwt.verify(token, publicKey, signOptions);
    req.userId = userId;
  } catch (err) {
    const { name, message } = err;
    console.error({ name, message });
  }
  req.next();
};

(async ({ sequelize }) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: false });
    const server = new GraphQLServer({
      typeDefs,
      resolvers,
      context: ({ request }) => ({ db, request })
    });
    server.express.use(logger('dev'));
    server.express.use(verifyUser);
    server.express.disable('x-powered-by');
    server.express.use(express.static(path.join(__dirname, 'client/build')));
    await server.start({
      endpoint: '/graphql',
      playground: '/graphql'
    });
    server.express.get('*', (_, res) => {
      res.sendFile(path.join(__dirname + '/client/build/index.html'));
    });
    console.log(`Server is running on http://${HOST}:${PORT}`);
    console.log(`GraphQL playground is running on http://${HOST}:${PORT}/graphql`);
  } catch (err) {
    console.error(err);
  }
})(db);

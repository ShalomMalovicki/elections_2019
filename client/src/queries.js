import gql from 'graphql-tag';

export const GET_ME = gql`
  query {
    me {
      id
      username
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      token
    }
  }
`;

export const REGISTER = gql`
  mutation register($username: String!, $password: String!) {
    register(username: $username, password: $password) {
      path
      message
    }
  }
`;
export const GET_USER_GUESS = gql`
  query getUserGuess($id: String, $username: String) {
    getUserGuess(id: $id, username: $username) {
      name
      value
    }
  }
`;

export const VOTE = gql`
  mutation vote($userGuesses: [UserGuessInput!]!) {
    vote(userGuesses: $userGuesses)
  }
`;

export const GET_All_USERS_GUESSES = gql`
  query {
    getUsersGuesses {
      username
      userGuesses {
        name
        value
      }
    }
  }
`;

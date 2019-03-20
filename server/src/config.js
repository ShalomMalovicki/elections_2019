import 'dotenv/config';

export const {
  PORT = 4000,
  HOST = 'localhost',

  NODE_ENV = 'development',

  DB_NAME = 'jwt_login_db',
  DB_USERNAME = 'postgres',
  DB_PASSWORD = 'admin',
  DB_HOST = 'localhost',
  DB_DIALECT = 'postgres',

  JWT_SECRET = ''
} = process.env;
export const IN_PROD = NODE_ENV === 'production';

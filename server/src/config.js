import 'dotenv/config';

export const {
  PORT = 4000,
  HOST = 'localhost',

  NODE_ENV = 'development',
  IN_PRODUCTION = NODE_ENV === 'production',
  DEV_DB_NAME = 'elections_2019_test_db',
  PROD_DB_NAME = 'elections_2019_db',
  DB_USERNAME = 'postgres',
  DB_PASSWORD = 'admin',
  DB_HOST = 'localhost',
  DB_DIALECT = 'postgres',

  JWT_SECRET = ''
} = process.env;
export const IN_PROD = NODE_ENV === 'production';

import Sequelize from 'sequelize';
import { IN_PRODUCTION, DEV_DB_NAME, PROD_DB_NAME, DB_USERNAME, DB_PASSWORD, DB_HOST, DB_DIALECT } from '../config';

const sequelize = new Sequelize(IN_PRODUCTION ? PROD_DB_NAME : DEV_DB_NAME, DB_USERNAME, DB_PASSWORD, {
  host: DB_HOST,
  dialect: DB_DIALECT,
  operatorsAliases: false,
  logging: true,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});

const db = {
  User: sequelize.import('./user'),
  UserGuess: sequelize.import('./userGuess')
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;

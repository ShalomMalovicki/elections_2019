import { hash, compare } from 'bcryptjs';
import { v4 as uuid } from 'uuid';

export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: uuid()
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  });

  User.associate = models => {
    User.hasOne(models.UserGuess, {
      foreignKey: { name: 'userId', allowNull: false }
    });
  };

  User.beforeCreate(async user => {
    user.password = await hash(user.password, 12);
  });

  User.prototype.verifyPassword = async (password, hashedPassword) => {
    const valid = await compare(password, hashedPassword);
    return valid;
  };

  return User;
};

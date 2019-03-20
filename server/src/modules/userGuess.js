import { v4 as uuid } from 'uuid';

export default (sequelize, DataTypes) => {
  const UserGuess = sequelize.define(
    'userGuess',
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuid()
      },
      userId: {
        type: DataTypes.UUID,
        allowNull: false,
        unique: true,
        validate: {
          notEmpty: true
        }
      },
      guess: {
        type: DataTypes.JSONB,
        allowNull: false,
        defaultValue: [
          {
            name: 'הליכוד',
            value: 0
          },
          {
            name: 'העבודה',
            value: 0
          },
          {
            name: 'כחול לבן',
            value: 0
          },
          {
            name: 'כולנו',
            value: 0
          },
          {
            name: 'רע"ם-בל"ד',
            value: 0
          },
          {
            name: 'ש"ס',
            value: 0
          },
          {
            name: 'יהדות התורה',
            value: 0
          },
          {
            name: 'מרצ',
            value: 0
          },
          {
            name: 'ישראל ביתנו',
            value: 0
          },
          {
            name: 'איחוד מפלגות הימין',
            value: 0
          },
          {
            name: 'חד"ש-תע"ל',
            value: 0
          },
          {
            name: 'הימין החדש',
            value: 0
          },
          {
            name: 'גשר',
            value: 0
          }
        ]
      }
    },
    {
      freezeTableName: true
    }
  );

  UserGuess.associate = models => {
    UserGuess.belongsTo(models.User, {
      foreignKey: { name: 'userId', allowNull: false }
    });
  };

  return UserGuess;
};

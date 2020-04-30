'use strict';
module.exports = (sequelize, DataTypes) => {
  const Diary = sequelize.define('Diary', {
    Diary: DataTypes.STRING,
    Notes: DataTypes.STRING
  }, {});
  Diary.associate = function(models) {
    // associations can be defined here
  };
  return Diary;
};
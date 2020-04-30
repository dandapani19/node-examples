const Sequelize = require('sequelize');

module.exports = new Sequelize(process.env.POSTGRES_DB,process.env.DB_USER,process.env.DB_PASSWORD,{
    host : process.env.DB_HOST,
    prot : process.env.DB_PORT,
    dialect :'postgres',
    operatorsAliases: false,
     
    pool:{
        max:5,
        min:0,
        acquire:30000,
        idle:10000
    },
});
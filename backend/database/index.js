const env = process.env.NODE_ENV || 'development'
console.log(`ENV: ${process.env.NODE_ENV} || Fallback ENV: ${env}`);

const dbConfig = require("./config.json")[`${env}`];


const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
  host: dbConfig.hostname,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  sync:true,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = require("./models/tutorial.model")(sequelize, Sequelize.DataTypes);



module.exports = db;
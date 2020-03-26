'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const params = require('./config/config.js')[process.env.STAGE] || require('./config.js')['remote'] ;
const dbPass = require('./password').pwd || params.dbPass;
const db = {};
const {dbHost, dbName, dbUser, dbPort, dbSSL} = params;

const sequelize = new Sequelize(dbName, dbUser, dbPass, {
  host: dbHost,
  port: dbPort,
  dialect: 'postgres',
  pool: {
    //time ms
    //max number of connections
    max: 10,
    //min number of connections
    min: 1,
    //maximum time connection can be idle before released
    idle: 100,
    //maximum time will to get a connection before give up(throwing an error)
    acquire: 20000
  },
  dialectOptions: {
    ssl: dbSSL
  },
  define: {
    options: {
      underscored: true,
    }
  },
  logging: console.log,
  benchmark: true,
});


// importing models
fs
  .readdirSync(__dirname + '/models')
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = sequelize['import'](path.join('./models', file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

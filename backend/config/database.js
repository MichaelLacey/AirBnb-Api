// backend/config/database.js
const config = require('./index');

module.exports = {
  development: {
    storage: config.dbFile,
    dialect: "sqlite",
    seederStorage: "sequelize",
    logQueryParameters: true,
    typeValidation: true
  },
  production: {
    // schema: process.env.SCHEMA,
    use_env_variable: 'DATABASE_URL',
    dialect: 'postgres',
    seederStorage: 'sequelize',
    dialectOptions: {
      define: {         // define schema here
        schema: process.env.SCHEMA
      },
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};

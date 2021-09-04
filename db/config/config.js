module.exports = {
  development: {
    username: process.env.DATABASE_USERNAME,
    password: null,
    database: process.env.DATABASE_NAME,
    host: '127.0.0.1',
    dialect: 'postgres',
    logging: false,
  },
  test: {
    username: 'root',
    password: null,
    database: 'database_test',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    use_env_variable: 'DATABASE_URL',
    username: 'root',
    password: null,
    database: 'database_production',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};

// require environment variables
const { env } = process;

// application configurations, initializing environment variables into object 
const configs = {
	PORT: env.APP_PORT,
	DB_HOST: env.DB_HOST,
	DB_USER: env.DB_USER,
	DB_PORT:env.DB_PORT,
	DB_PASSWORD: env.DB_PASSWORD,
	DATABASE: env.DATABASE,
  	JWT_KEY: env.JWT_KEY
};

// exporting configs object
module.exports = configs;
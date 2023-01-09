export const envConfig = {
  environment: process.env.ENV || 'dev',
  port: process.env.PORT || 3000,
  mongoDbUri: process.env.MONGO_DB_URI,
};

export const EnvConfiguration = () => envConfig;

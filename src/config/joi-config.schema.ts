import * as joi from 'joi';

export const JoiConfigSchema = joi.object({
  MONGO_DB_URI: joi.required(),
  ENV: joi.valid('dev', 'prod').default('dev'),
  PORT: joi.number().default(3000),
});

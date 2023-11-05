const dotenv = require('dotenv');
const Joi = require('joi');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '../../../.env') });


const envVarsSchema = Joi.object()
  .keys({
    MONGODB_URL:Joi.string().required().description("MONGODB URL"),
    NODE_ENV:Joi.number().default(8082),
  })
  .unknown();
const {value:envVars, err}=envVarsSchema.prefs({errors: {label:'key'}}).validate(process.env);

if (err) {
  throw new Error(`Config validation error: ${err.message}`);
}


module.exports={
  running_process:envVars.NODE_ENV,
  mongoose:{
    url: envVars.MONGODB_URL,
    options:{
      useCreateIndex:true,
      useNewUrlParser:true,
      useUnifiedTopology:true,
    },
  },
};
import dotenv from 'dotenv';

dotenv.config();

const config = {
  PORT: process.env.PORT!,
  CLOUD_DB_URI: process.env.CLOUD_DB_URI!,
  LOCAL_DB_URI: process.env.LOCAL_DB_URI!,
  SECRET_KEY: process.env.SECRET_KEY!
};

export default config;
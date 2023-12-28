import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join((process.cwd(), '.env')) });

export default {
  port: process.env.PORT,
  NODE_ENV: process.env.NODE_ENV,
  databaseUrl: process.env.DATABASE_URL,
  saltRound: Number(process.env.SALT_ROUND),
  access_secret: process.env.ACCESS_SECRET,
  access_expires_in: process.env.ACCESS_EXPIRES_IN,
};

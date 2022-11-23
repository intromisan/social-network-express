import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: process.env.PORT || 5001,
  host: process.env.HOST,
  dbUri: process.env.DB_URI,
  saltWorkFactor: process.env.SALT_WORK_FACTOR || 10,
  accessTokenTtl: process.env.ACCESS_TOKEN_TTL,
  refreshTokenTtl: process.env.REFRESH_TOKEN_TTL,
  publicKey: process.env.PUBLIC_KEY?.replace(/\\n/g, '\n'),
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, '\n')
};

export default config;

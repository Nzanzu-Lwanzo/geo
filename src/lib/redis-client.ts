import { createClient } from 'redis';

const url = process.env['REDIS_URL'];
if (!url) throw new Error('Redis URL not found');
const redisClient = createClient({ url });
redisClient.on('error', () => console.log('Redis database crashed'));
redisClient
  .connect()
  .then(() => console.log('Redis connection established 🚀'));
export default redisClient;

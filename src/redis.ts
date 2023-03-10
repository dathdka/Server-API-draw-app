import * as redis from "redis";
import "dotenv/config";

export class redisClient {
  static client: redis.RedisClientType;

  constructor() {}

  public async getClient() {
    if (!redisClient.client) {
      redisClient.client = redis.createClient();
      redisClient.client.on("error", (err) => {
        console.error(err);
      });
      redisClient.client.on("connect", () => {});
      await redisClient.client.connect();
    }
    return new redisClient();
  }

  public getUrl (){
      return redisClient.client.options?.url
  }

  public async setValue(key: string, value: string) {
    await redisClient.client.set(key, value);
  }

  public async getValue(key: string) {
    return await redisClient.client.get(key);
  }
}

export type RedisClientType = redisClient

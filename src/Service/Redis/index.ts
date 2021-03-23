/**
 * redis连接
 * @version: 
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 21:19:17
 */
import redis from 'redis';

/** Redis */
interface IRedis {
  /** 端口号 默认80 */
  port?: number;
  /** 地址 */
  host: string;
  /** 密码 */
  password?: string;
  /** 数据库号 */
  db?: number;
}


class Redis {

  dbnet: redis.RedisClient;
  /** 端口号 */
  port = 6379;
  /** 地址 */
  host = '127.0.0.1';
  /** 密码 */
  password = '';
  /** 数据库号 */
  db?: number;
  constructor({
    port,
    host,
    password,
    db
  }: IRedis) {
    this.port = port;
    this.host = host;
    this.password = password;
    this.db = db;
    this.connect();
  }

  /** 连接 */
  connect() {
    if(!this.dbnet) {
      const connection = redis.createClient({
        port: this.port,
        host: this.host,
        password: this.password,
        db: this.db
      });
      connection.on('connect', () => {
        console.log('Redis client connected' + this.host + ':' + this.port);
        this.dbnet = connection;
      });
      connection.on('error', (error) => {
        console.log('Redis client error');
        console.log(error);
      });
    }
  }

  /** 设置字符数据 */
  setString(key: string, data: string, time?: number) {
    this.dbnet.set(key, data, redis.print);
    if (time) {
      this.dbnet.expire(key, time);
    }
  }

  /** 获取字符数据 */
  getString(key: string) {
    return new Promise((resolve, reject) => {
      this.dbnet.get(key, (err, data) => {
        if(err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }
}

export = Redis;
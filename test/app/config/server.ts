/**
 * xioo服务配置
 * @version: 0.0.1
 * @Author: dee
 * @Date: 2021-01-19 19:40:17
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 19:51:46
 */

/** 数据服务的基础配置 */
interface IModelSQL {
  /** 端口号 默认80 */
  port?: number;
  /** 地址 */
  host: string;
  /** 密码 */
  password?: string;
}

/** MySQL */
interface IMySQL extends IModelSQL {
  user: string;
  database?: string;
}

/** Redis */
interface IRedis extends IModelSQL {
  /** 数据库号 */
  db?: number;
}

/** http服务配置 */
interface IHtppServer {
  port: number;
}

interface IConfig {
  /** redis配置 */
  redis: IRedis[];
  /** http服务配置 */
  httpServer: IHtppServer;
}

interface ISocket {
  redis: IRedis;
  [key: string]: any;
}

export = class Config implements IConfig {
  redis: IRedis[] = [
    // {
    //   port: 6379,
    //   host: 'redis-dev001.gz.cvte.cn',
    //   password: 'Pass4redisserver'
    // },
    {
      port: 6379,
      host: '127.0.0.1',
      db: 8
    }
  ];
  mysql: IMySQL[] = [
    {
      port: 3306,
      host: '119.29.143.189',
      user: 'root',
      password: 'cover123ZHAO',
      database: 'mpromise'
    }
  ]
  httpServer: IHtppServer = {
    port: 2001
  };
  /** socket配置 */
  socket: ISocket =  {
    redis: {
      port: 6379,
      host: '127.0.0.1',
      db: 2
    },
    launch: true
  };
  /** 请求实例列表 */
  xioos = {
    wx: {
      baseUrl: 'https://api.weixin.qq.com'
    }
  };

};

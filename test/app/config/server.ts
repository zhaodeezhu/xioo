/**
 * xioo服务配置
 * @version: 0.0.1
 * @Author: dee
 * @Date: 2021-01-19 19:40:17
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 19:51:46
 */
import { XiooConfig } from 'xioo';

export default class Config {
  redis: XiooConfig.IRedis[] = [
    // {
    //   port: 6379,
    //   host: 'redis-dev001.gz.cvte.cn',
    //   password: 'Pass4redisserver'
    // },
    {
      port: 6379,
      host: '127.0.0.1',
      db: 8,
      launch: false
    }
  ];
  mysql: XiooConfig.IMySQL[] = [
    {
      port: 3306,
      host: '119.29.143.189',
      user: 'root',
      password: 'cover123ZHAO',
      database: 'mpromise',
      launch: false
    }
  ]
  httpServer: XiooConfig.IHtppServer = {
    port: 2001
  };
  /** socket配置 */
  socket: XiooConfig.ISocket =  {
    redis: {
      port: 6379,
      host: '127.0.0.1',
      db: 2
    },
    launch: false
  };
  /** 请求实例列表 */
  xios: XiooConfig.IXios  = {
    wx: {
      baseUrl: 'https://api.weixin.qq.com'
    },
    base: {
      baseUrl: 'http://127.0.0.1:2001'
    }
  };

  pg: XiooConfig.IPgSQL[] = [
    {
      port: 5432,
      host: '127.0.0.1',
      password: '123456',
      user: 'postgres',
      database: 'mytest',
      launch: false
    }
  ];

  /** 
   * 开放的静态资源目录 使用的是koa-static 根目录当前项目的运行目录
   * 数据格式可以为:
   * 字符串 只开放一个目录
   * 数组 开放多个目录
   */
  openResource = 'app/config'
};

/**
 * Redis基础类，主要用于继承
 * @version: 
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-20 17:40:53
 */
import Redis from './Redis';
import App from '../App';

class Service {
  /** app全局上下文 */
  app: App;
  // /** 第一个redis连接 */
  // redis: Redis;
  // /** redis连接组 */
  // redisGroup: Redis[]
  
  constructor(app: App) {
    this.app = app;
    // this.redis = this.app.redis;
    // this.redisGroup = this.app.service.redisGroup;
  }
}

export = Service;
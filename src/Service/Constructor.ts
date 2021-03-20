/**
 * 构造服务连接
 * @version: 
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 21:19:47
 */
import * as path from 'path';
import App from  '../App';
import Redis from './Redis';
import Mysql from './MySQL';
import Service from './index';

const ModelLsit = {
  redis: {
    group: 'redisGroup',
    TypeModel: Redis,
  },
  mysql: {
    group: 'mysqlGroup',
    TypeModel: Mysql,
  }
}

class ServiceConstructor extends Service {
  /** redis连接组 */
  redisGroup: Redis[] = [];
  /** mysql连接组 */
  mysqlGroup: Mysql[] = [];

  /** 第一个redis */
  redis: Redis;
  /** 第一个mysql */
  mysql: Mysql;

  constructor(app: App) {
    super(app);

    /** 创建mysql连接 */
    this.createConnectGroup<Mysql>('mysql');
    /** 创建redis连接 */
    this.createConnectGroup<Redis>('redis');
    /** 读取service信息 */
    this.readService();
  }

  /** 创建连接分组 */
  private createConnectGroup<T>(modelName: 'redis' | 'mysql') {
    let ModelTypeGroup: T[];
    this[ModelLsit[modelName].group] = (this.app.config[modelName] as any[]).map(item => {
      return new ModelLsit[modelName].TypeModel(item)
    });
    ModelTypeGroup = this[ModelLsit[modelName].group];
    if(ModelTypeGroup.length > 0) {
      this[modelName] = ModelTypeGroup[0] as any;
    }
  }

  /** 创建service */
  readService() {
    let res = this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/service'));
    let modules = this.app.helper.dirTreeSource(path.join(this.app.readRoot, './pages'), [], [], ['service'], false);
    res = {
      ...res,
      ...modules
    }
    /** 动态给对象添加值 */ 
    Object.keys(res).forEach(key => {
      const ServiceClass = res[key];
      const instanceService = new ServiceClass(this.app);
      const serviceName = instanceService.constructor.name;
      this[serviceName] = instanceService;
    });
  }
};

export = ServiceConstructor;
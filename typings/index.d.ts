import PromiseValue from '../test/app/server/service/auth/promise';
import User from '../test/app/server/service/auth/user';
declare module 'xioo' {
  export interface IService {
          
    // PromiseValue: PromiseValue;
  
    User: User;
  
}

  // import Koa from 'koa';
  // global {
  //   export interface Console {
  //     /** 绿色 */
  //     green: (value: any) => void;
  //     /** 红色 */
  //     red: (value: any) => void;
  //   }
  // }

  // /** redis连接 */
  // interface IRedis {
  //   /** 设置字符串 */
  //   setString: (key: string, data: string, time?: number) => void;
  //   /** 获取字符串 */
  //   getString: (key: string) => Promise<string>;
  // }

  // /** mysql连接 */
  // interface IMySQL {
  //   /** 查询 */
  //   dbquery: (sql: string) => Promise<any[]>;
  // }

  // type CostomC = {
  //   state: {
  //     /** 响应数据 */
  //     data: any;
  //   },
  //   request: {
  //     /** 请求体 */
  //     body: any;
  //   }
  // }
  // type CostomCtx = Koa.DefaultContext & CostomC
  
  // export interface IService {
  //   app: App;
  //   ctx: CostomCtx;
  // }

  // /** service管理器 */
  // interface IServiceManager extends IService {
  //   /** redis连接组 */
  //   redisGroup: IRedis[];
  //   /** mysql连接组 */
  //   mysqlGroup: IMySQL[];
  //   /** 第一个redis连接 */
  //   redis: IRedis;
  //   /** 第一个mysql连接 */
  //   mysql: IMySQL;
  //   aaa: any;
  //   bbb: any;
  // }


  // interface IHelper {

  // }

  // class App {
  //   // static Controller: any;
  //   // static Route: any;
  //   // static Post: any;
  //   /** 帮助函数库 */
  //   helper: IHelper;
  //   /** 当前的启动目录 */
  //   projectRoot: string;
  //   /** 基础配置 */
  //   config: any;
  //   /** 请求器 */
  //   xioos: any;
  //   /** 服务器 */
  //   service: IServiceManager;
  //   /** 第一个redis连接 */
  //   redis: IRedis;
  //   /** 第一个mysql连接 */
  //   mysql: IMySQL;
  // }

  // export class Controller {
  //   app: App;
  //   ctx: any;
  //   service: IService
  // }

  // export const Route;
  
  // export const Post;

  // export class Service {
  //   app: App;
  //   ctx: any;
  // }

  // export const Socket;
  
  // export default App;
}

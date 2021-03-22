declare module 'xioo' {
  import Koa from 'koa';
  import cornApp from 'node-cron';
  global {
    export interface Console {
      /** 绿色 */
      green: (value: any) => void;
      /** 红色 */
      red: (value: any) => void;
    }
  }

  /** redis连接 */
  interface IRedis {
    /** 设置字符串 */
    setString: (key: string, data: string, time?: number) => void;
    /** 获取字符串 */
    getString: (key: string) => Promise<string>;
  }

  /** mysql连接 */
  interface IMySQL {
    /** 查询 */
    dbquery: (sql: string) => Promise<any[]>;
  }

  type CostomC = {
    state: {
      /** 响应数据 */
      data: any;
    },
    request: {
      /** 请求体 */
      body: any;
    }
  }
  type CostomCtx = Koa.DefaultContext & CostomC
  
  export interface IService {
    app: App;
    ctx: CostomCtx;
    // PromiseValue: any;
  }

  /** service管理器 */
  interface IServiceManager extends IService {
    /** redis连接组 */
    redisGroup: IRedis[];
    /** mysql连接组 */
    mysqlGroup: IMySQL[];
    /** 第一个redis连接 */
    redis: IRedis;
    /** 第一个mysql连接 */
    mysql: IMySQL;
    aaa: any;
    bbb: any;
  }


  interface IHelper {
    /** 获取某个目录下的所有文件路径映射 */
    dirTreePath(rootDir: string, exclude?: string[], includeFiles?: {[key: number]: string | RegExp}): {[key: string]: string};
    /** 获取某个目录的所有文件资源映射 */
    dirTreeSource(rootDir: string, exclude?: string[]): {[key: string]: any};
  }

  interface ITask {
    status: boolean;
    task: cornApp.ScheduledTask
  }
  
  interface ISchedules {
    [key: string]: ITask
  }

  interface IRegisterProps {
    /** corn表达式 */
    corn: string;
    /** 任务名称 */
    name: string;
    /** 任务体 */
    handler: () => any;
    /** 是否启用 */
    status?: boolean;
  }

  interface IScheduleManager {
    /** 任务列表 */
    tasks: ISchedules;
    /** 启动任务 */
    start(name: string): void;
    /** 停止任务 */
    stop(name: string): void;
    /** 注册任务 */
    registerTask(props: IRegisterProps[]): void;
  }

  interface IPluginManager {
    /** 注册插件 */
    registerPlugin: (plugins: any) => void;
    /** 插件列表 */
    plugins: IPlugin;
  }

  export interface IPlugin {}

  export class Plugin {
    app: App;
  }

  class App {
    // static Controller: any;
    // static Route: any;
    // static Post: any;
    /** 帮助函数库 */
    helper: IHelper;
    /** 当前的启动目录 */
    projectRoot: string;
    /** 基础配置 */
    config: any;
    /** 请求器 */
    xioos: any;
    /** 服务器 */
    service: IServiceManager;
    /** 定时任务 */
    schedule: IScheduleManager;
    /** 第一个redis连接 */
    redis: IRedis;
    /** 第一个mysql连接 */
    mysql: IMySQL;
    /** 插件 */
    plugin: IPluginManager;
  }

  interface ITaskProps {
    /** 任务名称，如果名称不存在将以方法名命名 */
    name?: string;
    /** corn表达式 */
    corn: string;
    /** 是否启用, 如果不存在以全局状态为准 */
    status?: boolean;
  }

  export class Schedule {
    static ScheduleComponent(status: boolean):(constrcutor: any) => void;
    static Task(props: ITaskProps):(target: any, controllerName: string, descriptor: any) => void;

    app: App;
  }

  export class Controller {
    app: App;
    ctx: any;
    next: any;
    service: IService
  }

  export const Route;
  
  export const Post;

  export const Get;

  export const Helper;


  export class Middleware {
    app: App;
    ctx: CostomCtx;
  }

  export const MiddleClass;
  export const Middle;

  export class Service {
    app: App;
    ctx: CostomCtx;
  }

  export const Socket;
  
  export default App;
}

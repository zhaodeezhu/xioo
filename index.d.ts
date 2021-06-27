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

  export namespace XiooConfig {
    /** 数据服务的基础配置 */
    interface IModelSQL {
      /** 端口号 默认80 */
      port?: number;
      /** 地址 */
      host: string;
      /** 密码 */
      password?: string;
      /** 是否启动 */
      launch?: boolean;
    }

    /** Redis */
    export interface IRedis extends IModelSQL {
      /** 数据库号 */
      db?: number;
    }

    /** MySQL */
    export interface IMySQL extends IModelSQL {
      user: string;
      database?: string;
    }

    /** pg */
    export interface IPgSQL extends IModelSQL {
      /** 用户 */
      user: string;
      /** 数据库 */
      database: string;
      /** 最大空闲时间 ms */
      idleTimeoutMillis?: number;
      /** 连接池最大连接数, 默认10 */
      max?: number;
      /** 连接超时时间 ms */
      connectionTimeoutMillis?: number;
    }

    /** http服务配置 */
    export interface IHtppServer {
      port: number;
    }

    /** Socket配置 */
    export interface ISocket {
      redis: IRedis;
      [key: string]: any;
    }

    interface XiosOptions {
      /** 请求基础路径 */
      baseUrl: string;
      /** 通用请求头 */
      headers?: any;
    }
    /** xios配置 */
    export interface IXios {
      [key: string]: XiosOptions
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

  interface IPgSQL {
    /** 查询 */
    query: <T>(sql: string) => Promise<T>;
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
    /** pg连接组 */
    pgGroup: IPgSQL[];
    /** 第一个redis连接 */
    redis: IRedis;
    /** 第一个mysql连接 */
    mysql: IMySQL;
    /** 第一个pg */
    pg: IPgSQL;
  }


  interface IHelper {
    /** 获取某个目录下的所有文件路径映射 */
    dirTreePath(rootDir: string, exclude?: string[], includeFiles?: { [key: number]: string | RegExp }): { [key: string]: string };
    /** 获取某个目录的所有文件资源映射 */
    dirTreeSource(rootDir: string, exclude?: string[]): { [key: string]: any };
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
    worker?: 'all' | 'worker' | string;
    /** 动态注册的状态 */
    dynamicStatus?: boolean;
  }

  interface IScheduleManager {
    /** 任务列表 */
    tasks: ISchedules;
    /** 启动任务 */
    start(name: string): void;
    /** 停止任务 */
    stop(name: string): void;
    /** 注册任务 */
    registerTask(props: IRegisterProps[], calllback?: (item: IRegisterProps) => void): void;
  }

  interface IPluginManager {
    /** 注册插件 */
    registerPlugin: (plugins: any) => void;
    /** 插件列表 */
    plugins: IPlugin;
  }

  export interface IPlugin { }

  export class Plugin {
    app: App;
  }

  interface IXiooProps {
    baseUrl?: string;
    headers?: any;
  }

  interface IOption {
    /** 请求路径 */
    url?: string;
    /** 请求方法 */
    method?: 'get' | 'post' | 'delete' | 'option' | 'patch' | 'put' | 'head';
    /** 请求头 */
    headers?: { [key: string]: any };
    /** 请求体 */
    data?: { [key: string]: any };
    /** 获取的数据类型 默认utf-8 */
    encoding?: string;
    /** 路径参数 */
    params?: { [key: string]: any }
  }

  export class Xioos {
    constructor({ baseUrl, headers }: IXiooProps)
    get: <T>(url: string, options?: IOption) => Promise<T>;
    /** post请求方法 */
    post: <T>(url: string, options?: IOption) => Promise<T>;
    /** 通用请求方法 */
    requset: <T>(options: IOption) => Promise<T>;
    /** 上传文件方法 */
    upload: <T>(url: string, file: any, options?: IOption) => Promise<T>;
  }

  export const Agant;

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
    xios: { [key: string]: Xioos };
    /** 控制器 */
    controller: ControllerManager;
    /** 服务器 */
    service: IServiceManager;
    /** 定时任务 */
    schedule: IScheduleManager;
    /** 第一个redis连接 */
    redis: IRedis;
    /** 第一个mysql连接 */
    mysql: IMySQL;
    /** 第一pg连接 */
    pg: IPgSQL;
    /** 插件 */
    plugin: IPluginManager;
    /** 进程控制器 */
    agant: any;
    /** 动态设置请求对象 */
    setXioosByConfig: (xioosConfig: any) => void;
    /** 路由 */
    router: RouterManager
  }

  class RouterManager {
    setRoute: (routes: IRoutes) => void;
  }

  interface IRoutes {
    /** 请求路径 */
    url: string;
    /** 请求方法 */
    method: 'get' | 'post' | 'delete' | 'option' | 'patch' | 'put' | 'head';
    /** controller */
    controller: (ctx: CostomCtx, next: () => void) => any;
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
    static ScheduleComponent(status: boolean): (constrcutor: any) => void;
    static Task(props: ITaskProps): (target: any, controllerName: string, descriptor: any) => void;

    app: App;
  }

  export class Controller {
    app: App;
    ctx: CostomCtx;
    next: any;
  }

  export class ControllerManager extends Controller {
    /** controller组 */
    group: { [key: string]: any };
    /** 注册路由类 */
    registerController: (name: string, CntrollerInstance: any) => void;
  }

  export const Route;

  export const Post;

  export const Get;

  export const Helper;

  export const Time;

  export class Middleware {
    app: App;
    ctx: CostomCtx;
    next: any;
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

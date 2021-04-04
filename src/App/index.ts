/**
 * App总览全局
 * @version: 0.0.1
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-19 20:07:03
 */
import Config from '../Config'
import Server from "../Server/ServerManager";
import Helper from "../Helper";
import Router from "../Router/RouterManager";
import Controller from "../Controller";
import ControllerManager from '../Controller/ControllerManager';
import Redis from '../Service/Redis';
import ServiceConstructor from "../Service/Constructor";
import MiddlewareConstructor from "../Middleware/Constructor";
import SocketManger from '../Socket/SocketManger';
import ScheduleManager from '../Schedule/ScheduleManager';
import PluginManager from '../Plugin/PluginManager';
import Agant from '../Agant';
import { Get, Delete, Post, Patch, Route } from "../Router/structure";
import Xioos from '../Service/xioos';

class App {
  /** 全局运行的目录 */
  projectRoot: string = process.cwd();
  /** 动态读取文件的目录 */
  readRoot: string = process.env.READ_ENV === 'prod' ? this.projectRoot + '/package' : this.projectRoot + '/app';
  /** 帮助函数集合 */
  helper: Helper = new Helper();
  /** 全局配置 */
  config: Config = new Config(this);
  /** 控制层 */
  controller: ControllerManager = new ControllerManager(this);
  /** 数据层 */
  service: ServiceConstructor = new ServiceConstructor(this);
  /** http服务 */
  server: Server = new Server(this);
  /** 路由 */
  router: Router = new Router(this);
  /** 中间件 */
  middleware: MiddlewareConstructor = new MiddlewareConstructor(this);
  /** 定时任务 */
  schedule: ScheduleManager = new ScheduleManager(this);
  /** 通信，只有配置了launch: true的时候才会开启 */
  socket: SocketManger;
  /** 插件 */
  plugin: PluginManager;
  /** xioos请求列表 */
  xioos: any = {};
  /** 第一个Redis连接 */
  redis: Redis;
  /** 进程管理调度器 */
  agant: Agant = new Agant(this);
  /** ctx上下文 */
  // ctx = this.server.ctx;

  static Get = Get;
  static Delete = Delete;
  static Post = Post;
  static Patch = Patch;
  static Route = Route;
  static Controller = Controller;

  constructor() {
    // this.server = new Server(this);
    // 配置开启了socket以后再开起
    if(this.config.socketConfig.launch) {
      this.socket = new SocketManger(this);
    }
    this.redis = this.service.redis;

    this.createXioosRequest();
    // 注册插件，这个一定要在所有的服务都启动了以后注册
    this.plugin = new PluginManager(this);
    // 启动服务
    this.start(this.config.http.port);
  }

  /** 创建请求对象列表数据 */
  private createXioosRequest() {
    const xioosConfig = this.config.xioos;
    if(!xioosConfig || typeof xioosConfig !== 'object') return;
    
    this.setXioosByConfig(xioosConfig);
  }

  /** 
   * 按配置设置请求对象
   * 如果键值存在相同，将会跳过并且打印提醒
   */
  setXioosByConfig(xioosConfig: any) {
    Object.keys(xioosConfig).forEach(xiooskey => {
      if(this.xioos[xiooskey]) {
        console.redunderline(`${xiooskey}请求对象已经存在，设置将被跳过！`);
        return;
      }
      this.xioos[xiooskey] = new Xioos({
        ...xioosConfig[xiooskey]
      });
    });
  }

  /** 中间件逻辑处理 */

  /** 启动app */
  start(port: number) {
    this.socket && this.socket.listen(this.server.server);
    this.middleware.registerMiddleware("front");
    this.middleware.redisterMiddleware();
    this.middleware.registerLessMiddleware();
    this.router.start();
    this.router.registerRouter();
    this.middleware.registerMiddleware("end");

    /** 读取service信息 */
    // this.service.readService()
    this.server.start(port);
  }
}
export = App;
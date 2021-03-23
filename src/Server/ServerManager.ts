/*
 * @version: 
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-18 17:15:33
 */
import Koa from 'koa';
import App from '../App';
import * as http from 'http';

import printString from './print';

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

interface ICostomS {
  costom: string;
}

const koa = new Koa<ICostomS, CostomC>();

type CostomCtx = Koa.DefaultContext & CostomC

/** http服务 */
class Server {
  /** koa的上下文 */
  // ctx: CostomCtx;
  /** 服务 */
  server: http.Server;
  /** app */
  app: App;
  constructor (app: App) {
    this.server = new http.Server(koa.callback());
    this.app = app;
    // this.use(async (ctx, next) => {
    //   this.ctx = ctx as CostomCtx;
    //   next && await next();
    // })
  }

  /** 注册中间件 */
  use(handler: (ctx?: CostomCtx, next?: () => void) => void) {
    koa.use(handler)
  }

  /** 启动服务 */
  start(port: number) {
    // 处理因为socket突然断开连接时报错的问题
    this.server.on('clientError', (err, socket) => {
      socket.end('HTTP/1.1 400 Bad Request\r\n\r\n');
    });
    this.server.listen(port, () => {
      console.cyan(printString);
      console.green(`XIOO服务已整装就绪-${port}端口已成功启动！等待命令`);
    });
  }
}

export = Server;
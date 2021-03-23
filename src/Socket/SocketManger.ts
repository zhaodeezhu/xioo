/*
 * @version:
 * @Author: dee
 * @Date: 2021-01-20 18:09:46
 * @LastEditors: dee
 * @LastEditTime: 2021-01-26 12:15:31
 */
import { Server as SocketServer, Socket } from "socket.io";
import { createAdapter } from 'socket.io-redis';
import { RedisClient } from 'redis';
import {namespaceList, controllerList} from './structrue';
import * as path from 'path';

import App from "../App";

// const io: socketio.Server | any = socketio()

class SocketManger {
  app: App;

  cots: any = {};

  constructor(app: App) {
    this.app = app;
    this.setOrigin();
    // this.start();
  }
  
  io: SocketServer;

  /** 启动 */
  start() {
    this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/socket'));
    this.registerControllers();
    // this.io.of('/admin').on('connection', (socket: Socket) => {
    //   console.log('我连接了');
    //   socket.on('disconnect', () => {
    //     console.log('我退出了');
    //   })
    //   socket.on('test', (content) => {
    //     console.log(content);
    //     socket.emit('user', '您已经成功上线了');
    //   })
    // });
    // this.io.on('connection', (socket: Socket) => {
    //   console.log('我连接了22222');
    //   socket.on('disconnect', () => {
    //     console.log('我退出了22222');
    //   })
    //   socket.on('test', (content) => {
    //     console.log(content);
    //     socket.emit('user', '您已经成功上线了22222');
    //   })
    // });
  }

  /** 注册所有控制器 */
  registerControllers() {
    // 先汇总命名空间 和控制器
    const namesapces = this.collectNamespace();
    Object.keys(namesapces).forEach(namespace => {
      const cot = this.io.of(namespace);
      this.cots[namespace] = cot;
      cot.on('connection', (socket: Socket) => {
        const allConnect = namesapces[namespace];
        console.redunderline(`有客户端连接到${namespace}`);
        socket.emit('online', {namespace, id: socket.id});
        allConnect.forEach(cont => {
          const RouterController = new cont.Constrcutor(this.app);
          const methods = cont.methods;
          methods.forEach(item => {
            socket.on(item.path, (data) => {
              RouterController[item.controllerName].call(RouterController, socket, data);
            });
          })
        });
        socket.on('disconnect', () => {
          console.log('我退出了');
        });
        socket.on('error',(e)=>{
          console.log('====>',e.stack)
        });
      });
      cot.on('error', (e) => {
        console.log('eeeeeeee', e)
      });
    })
  }

  /** 汇总命名空间 */
  collectNamespace() {
    const namesapces = {};
    namespaceList.forEach(space => {
      const {Constrcutor, namespace} = space
      if(!namesapces[namespace]) {
        namesapces[namespace] = []
      }
      let methods = [];

      methods = controllerList.filter(controller => Constrcutor.prototype === controller.target);

      namesapces[namespace].push({
        Constrcutor,
        methods
      });
    });
    return namesapces;
  }

  /** 跨域 */
  setOrigin() {
    // this.io.set('transport', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
    // this.io.set('origins', '*:*');
  }

  /** 监听 */
  listen(server) {
    console.blue('Socket启动了')
    this.io = new SocketServer();
    if(this.app.config.socketConfig.redis) {
      const pubClient = new RedisClient(this.app.config.socketConfig.redis);
      const subClient = pubClient.duplicate();
      this.io.adapter(createAdapter({ pubClient, subClient }));
    }
    this.io.listen(server);
    this.start();
  }
}


export = SocketManger;

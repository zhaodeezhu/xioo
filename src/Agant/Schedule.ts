import path from 'path';
import Agant from './AgantManager';

import { taskList } from '../Schedule/StructureManager';


export = class AgantSchduele {
  /** 代理器 */
  agant: Agant;

  /** 动态定时任务列表, 主要存名字，判断是否已经处理 */
  dynamicSchedule = {};

  constructor(agant: Agant) {
    this.agant = agant;
    // 读取路径
    this.agant.helper.getDirToFileSource(path.join(this.agant.readRoot, './server/schedule'));
  }

  /** 初始化定时任务 */
  initSchedule() {
    taskList.forEach(item => {
      if(item.status) {
        const name = item.name ? item.name : item.controllerName;
        this.start(name, item.worker);
      }
    });
  }

  /** 改变任务状态任务 */
  changeStatus(name: string, count: 'all' | 'worker', status = true) {
    if(count === 'all') {
      this.agant.workers.forEach(item => {
        item.worker.send({type: 'schedule', data: {name, status}});
      })
    } else {
      const workerIndex = Math.floor(Math.random() * this.agant.startCpuLen);
      this.agant.workers[workerIndex].worker.send({type: 'schedule', data: {name, status}});
    }
  }

  /** 启动任务 */
  start(name: string, count: 'all' | 'worker' = 'worker') {
    this.changeStatus(name, count);
  }

  stop(name: string) {
    this.changeStatus(name, 'all', false);
  }

  /** 处理动态传入定时任务 */
  makeDynamicSchedule(name, worker, status) {
    if(this.dynamicSchedule[name]) return;
    this.dynamicSchedule[name] = {worker, status};
  }

  /** 初始化动态的定时任务 */
  initDynamicSchedule() {
    Object.keys(this.dynamicSchedule).forEach(name => {
      const { status, worker } = this.dynamicSchedule[name];
      if(status) {
        this.start(name, worker);
      }
    })
  }

  /** 监听消息 */
  listen(data) {
    const { status, name, worker = 'worker', method } = data;
    if(method === 'origin') {
      this.changeStatus(name, worker, status);
    } else {
      this.makeDynamicSchedule(name, worker, status);
    }
  }
}
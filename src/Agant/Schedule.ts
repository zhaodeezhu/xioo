import path from 'path';
import Helper from '../Helper';
import Agant from './AgantManager';

import { taskList } from '../Schedule/StructureManager';


export = class AgantSchduele {
  agant: Agant;

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

  stop(name: string, count: 'all' | 'worker' = 'worker') {
    this.changeStatus(name, count, false);
  }

  /** 监听消息 */
  listen(data) {
    const { status, name, worker = 'worker' } = data;
    this.changeStatus(name, worker, status);
  }
}
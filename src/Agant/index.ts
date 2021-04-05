import App from '../App';
export = class Agant {

  /** 全局上下文 */
  app: App;
  constructor(app: App) {
    this.app = app;
    this.messageDispatcher();
  }

  /** 消息调度 */
  messageDispatcher() {
    process.on('message', (msg) => {
      this[msg.type](msg.data);
    });
  }

  /** 定时任务处理 */
  private schedule(data) {
    const { name, status } = data;
    if(status) {
      this.app.schedule.start(name);
    } else {
      this.app.schedule.stop(name);
    }
  }

  /** 向主进程发送消息 */
  postMessage(data) {
    process.send({type: 'schedule', data})
  }

  /** 控制定时任务 */
  dispatchSchedule(name, status, method: 'origin' | 'dynamic' = 'origin', worker: 'worker' | 'all' = 'worker') {
    process.send({type: 'schedule', data: { name, status, method, worker }});
  }
}
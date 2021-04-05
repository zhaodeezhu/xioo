import { Plugin } from 'xioo';

const dynamicSchedule = [
  {
    name: 'test1',
    status: false,
    worker: 'worker',
    corn: '*/5 * * * * *',
    handler: () => {console.log('我是测试定时任务1')}
  },
  {
    name: 'test2',
    status: false,
    worker: 'all',
    corn: '*/5 * * * * *',
    handler: () => {console.log('我是测试定时任务2')}
  }
]

export default class Time extends Plugin {
  excute() {
    console.log('我是要注册的动态定时任务');
    this.app.schedule.registerTask(dynamicSchedule, (item) => {
      this.app.agant.dispatchSchedule(item.name, item.status, 'dynamic', item.worker);
    });
    // this.app.plugin.plugins.
  }
}
import { Schedule } from 'xioo';

@Schedule.ScheduleComponent(true)
export default class TestBuild extends Schedule {
  @Schedule.Task({corn: '*/5 * * * * *', status: false})
  getData() {
    console.log('我是执行的定时任务');
  }
}
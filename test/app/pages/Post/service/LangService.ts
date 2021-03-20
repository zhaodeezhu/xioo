import {Service} from 'xioo';
export default class LangService extends Service {
    async getServiceData() {
        console.log('我是getServiceData');
        return {
            data: '我是测试的data'
        }
    }
}
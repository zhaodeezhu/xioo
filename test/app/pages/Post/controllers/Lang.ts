import { Post, Route, Controller, Get } from 'xioo'; 


@Route('/my/test')
export default class Lang extends Controller {
  @Get('/lang')
  async getData() {

    let res = await this.app.service.LangService.getServiceData();
    // let res = this.app.service.PromiseValue.login();
    return {
      data: res,
      status: '0',
      message: '成功'
    }
  }
}
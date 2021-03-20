/*
 * @version: 
 * @Author: dee
 * @Date: 2021-01-18 10:21:07
 * @LastEditors: dee
 * @LastEditTime: 2021-01-18 14:58:01
 */
export = (app: any, ctx: any) => {

    const a = 1111;
    console.log(app.service.User.login);
    ctx.state.data = {
      data: 222
    }
  }
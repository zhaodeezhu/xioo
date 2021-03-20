/*
 * @version: 
 * @Author: dee
 * @Date: 2021-01-18 10:21:07
 * @LastEditors: dee
 * @LastEditTime: 2021-01-18 10:21:49
 */
export = (app, ctx) => {

  const a = 1111;

  console.log(ctx.query)

  ctx.body = {
    data: 111
  }
}
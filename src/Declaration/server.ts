import Koa from 'koa';

export interface ICostomC {
  state: {
    /** 响应数据 */
    data: any;
  },
  request: {
    /** 请求体 */
    body: any;
  }
}

export interface ICostomS {
  costom: string;
}

export type CostomCtx = Koa.DefaultContext & ICostomC;
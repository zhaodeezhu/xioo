import koaBody from 'koa-body';
import cors from 'koa-cors';
import response from './response';

export default [cors, koaBody, response];
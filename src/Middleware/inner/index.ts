import koaBody from 'koa-body';
import cors from 'koa-cors';
import response from './response';

export default [
  cors(),
  koaBody({
    multipart: true,
    formidable: {
      maxFileSize: 200 * 1024 * 1024
    }
  }),
  response()
];
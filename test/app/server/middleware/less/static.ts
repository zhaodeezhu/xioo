export default () => async (ctx, next) => {
  console.log('我是中间件执行了');
  await next();
}
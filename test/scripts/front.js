const config = require('cover-webpack-package/lib/webpack.config.ssr.dev');

const WebpackDevServer = require('webpack-dev-server');

const webpack = require('webpack');

const path = require('path');

const projectRoot = process.cwd()

function start() {
  const webpackConfig = config.webpackConfig;
  // webpackConfig.entry.main = ['./app/pages/index.tsx']
  // webpackConfig.output = {
  //   path: path.resolve(projectRoot, './dist'),
  //   filename: 'js/[name].js',
  //   // publicPath: '/'
  // }

  let compiler = webpack(webpackConfig);

  compiler.run();

  // const server = new WebpackDevServer(compiler, {
  //   hot: true,
  //   // publicPath: '/',
  //   // progressColors: true,
  //   // contentBase: __dirname,
  //   hotOnly: true,
  //   // port: 4006,
  //   open: true,
  //   // proxy: {
  //   //   '/': {
  //   //     target: 'http://127.0.0.1:2001',
  //   //     secure: false,
  //   //     changeOrigin: true
  //   //   }
  //   // }
  // });

  // server.listen(2002, '127.0.0.1', () => {
  //   console.log('Starting server on http://localhost:2002');
  // });

}

start();
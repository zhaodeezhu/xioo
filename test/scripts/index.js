const nodemon = require('nodemon');
const projectRoot = process.cwd();
const path = require('path');
nodemon({
  script: path.resolve(projectRoot, './app/server/index.ts'),
  // script: path.resolve(projectRoot, './src/index.ts'),
  "restartable": "rs", 
  "watch": [path.resolve(projectRoot, './app'), "../nodemon.json"],
  "ext": "ts tsx json",
  "verbose": true,
  "execMap": {
    "": "node",
    "js": "node --harmony"
  },
  "env": {
    "NODE_ENV": "development"
  }
}).on('start', () => {
  console.log('启动了')
})
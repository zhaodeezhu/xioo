import * as childProcess from 'child_process';
import cluster from 'cluster';
import * as path from 'path';
import * as fs from 'fs';
import { Helper, Agant } from 'xioo';

import os from 'os';

// 先去生成声明文件，在去构建
// Helper.makeType('service', 'service');
// Helper.makeType('plugins', 'plugins', 'Plugin');

// if (cluster.isMaster) {
//   const cpuLen = os.cpus().length;
//   const agant = new Agant(cluster as any);
//   for (let i = 0; i < agant.startCpuLen; i++) {
//     const worker = cluster.fork();
//     agant.add({
//       pid: worker.process.pid,
//       worker: worker
//     });
//   }
// } else {
//   require(path.join(__dirname, './index'));

//   process.on("uncaughtException", (err) => {
//     console.log(err);
//     console.log('我发生异常了，将会在5s后重启');
//     process.exit(1);
//   });
// }

childProcess.fork('./app/server/index');
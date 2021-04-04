import cluster from 'cluster';
import * as path from 'path';
import { Agant } from '../index';

if (cluster.isMaster) {
  const agant = new Agant(cluster as any);
  for (let i = 0; i < agant.startCpuLen; i++) {
    const worker = cluster.fork();
    agant.add({
      pid: worker.process.pid,
      worker: worker
    });
  }
} else {

  const projectRoot = process.cwd();
  const readRoot = process.env.READ_ENV === 'prod' ? projectRoot + '/package' : projectRoot + '/app';

  require(path.join(readRoot, './server/index'));

  process.on("uncaughtException", (err) => {
    console.log(err);
    console.log('我发生异常了，将会在5s后重启');
    process.exit(1);
  });
}
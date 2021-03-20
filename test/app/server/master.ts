import * as childProcess from 'child_process';
import * as path from 'path';
import * as fs from 'fs';
import { Helper } from 'xioo';

// 先去生成声明文件，在去构建
// Helper.makeType('service', 'service');
// Helper.makeType('plugins', 'plugins', 'Plugin');

childProcess.fork('./app/server/index');
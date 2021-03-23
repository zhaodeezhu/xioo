/*
 * @Descripttion: 工具函数库，主要提供一些通用的方法
 * @version: 0.0.1
 * @Author: dee
 * @Date: 2021-01-17 15:32:39
 * @LastEditors: dee
 * @LastEditTime: 2021-01-18 17:07:09
 */
import * as path from 'path';
import * as fs from 'fs';
import colors from 'colors';

/** 声明全局console添加的方法 */
declare global {
  export interface Console {
    /** 绿色 */
    green: (value: any) => void;
    /** 红色 */
    red: (value: any) => void;
    /** 黄色 */
    yellow: (value: any) => void;
    /** 蓝色 */
    blue: (value: any) => void;
    /** 洋红 */
    magenta: (value: any) => void;
    /** 蓝绿色 */
    cyan: (value: any) => void;
    /** 灰色 */
    gray: (value: any) => void;
    /** 暗灰色 */
    grey: (value: any) => void;
    /** 背景红色 */
    bgRed: (value: any) => void;
    /** 背景绿色 */
    bgGreen: (value: any) => void;
    /** 背景黄色 */
    bgYellow: (value: any) => void;
    /** 背景蓝色 */
    bgBlue: (value: any) => void;
    /** 背景洋红 */
    bgMagenta: (value: any) => void;
    /** 背景蓝绿色 */
    bgCyan: (value: any) => void;
    /** 背景灰色 */
    bgGray: (value: any) => void;
    /** 背景暗灰色 */
    bgGrey: (value: any) => void;
    /** 绿色加下划线 */
    greenunderline: (value: any) => void;
    /** 红色加下划线 */
    redunderline: (value: any) => void;
    /** 黄色加下划线 */
    yellowunderline: (value: any) => void;
    /** 洋红加下划线 */
    magentaunderline: (value: any) => void;
    /** 蓝绿加下划线 */
    cyanunderline: (value: any) => void;
    /** 绿色翻转 */
    greeninverse: (value: any) => void;
  }
}

const colorConsole = ['green', 'red', 'yellow', 'blue', 'magenta', 'cyan', 'gray', 'grey', 'bgRed', 'bgGreen', 'bgYellow', 'bgBlue', 'bgMagenta', 'bgCyan', 'bgGray', 'bgGrey'];
const modelConsole = ['underline', 'inverse', 'bold', 'reset', 'italic', 'strikethrough'];

interface IHelper {
  /** 获取某文件夹下所有的文件路径的映射 */
  getDirToFilePath: (dirPath: string) => { [key: string]: string };
  /** 获取某文件夹下所有默认导出的文件资源 通过require获取 */
  getDirToFileSource: (dirPath: string) => { [key: string]: any };
  /**
   * 为全局console添加颜色打印方法
   */
  addGlobalConsoleColor: () => void;
}

abstract class Util {
  static getDirToFilePath(dirPath: string, exclude: string[] = []) {
    const filePathMap: { [key: string]: string } = {};
    function getData(nd: string, frontFileName: string) {
      fs.readdirSync(nd).forEach(p => {
        if (fs.statSync(path.join(nd, p)).isDirectory()) {
          getData(path.join(nd, p), p)
        } else {
          const f = p.split('.');
          const key = path.join(frontFileName, f[0]);
          filePathMap[key] = path.join(nd, p);
        }
      })
    }
    if (exclude.length > 0) {
      exclude.forEach(exdir => {
        const dir = path.join(dirPath, exdir);
        getData(dir, '');
      })
    } else {
      getData(dirPath, '');
    }
    return filePathMap;
  }

  static getDirToFileSource(dirPath: string) {
    const filePathMap = Util.getDirToFilePath(dirPath);
    const sourceMap: { [key: string]: any } = {};
    Object.keys(filePathMap).forEach(p => {
      let Ob = require(filePathMap[p]);
      if (Ob['default']) {
        Ob = Ob['default'];
      }
      sourceMap[p] = Ob
    });
    return sourceMap;
  }

  static dirTreePath(rootDir: string, exclude: string[] = [], includeFiles = [], include = [], isFirst = true) {
    // 定义所有的目录映射
    const pathMap: { [key: string]: string } = {};
    // 判断目录是否存在，不存在直接返回空对象{}
    const isExists = fs.existsSync(rootDir);
    if (!isExists) return {};

    function getData(nd: string, frontFileName: string, isFile = true) {
      fs.readdirSync(nd).forEach(p => {
        // 如果当当前遍历到目录名，剧排除掉
        if(exclude.includes(p)) return;
        if (fs.statSync(path.join(nd, p)).isDirectory()) {
          let myFile = true;
          // 适配只遍历响应的目录下的文件
          if(include.length > 0) {
            if(include.includes(p)) {
              myFile = true;
            } else {
              myFile = false;
            }
          }
          getData(path.join(nd, p), path.join(nd, p), myFile);
        } else {
          if(includeFiles.length > 0) {
            const fileName = includeFiles.find(filePath => {
              // 如果是正则校验p文件是否是满足
              if(filePath instanceof RegExp) {
                return filePath.test(p);
              } else {
                // 不是正则就要判断相等
                return filePath === p;
              }
            });
            // 不正确就直接返回了
            if(!fileName) return;
          }
          if(include.length > 0) {
            // 如果是不想遍历的目录则直接返回
            if(!isFile) {
              return;
            }
          }
          const f = p.split('.');
          const key = path.join(frontFileName, f[0]);
          pathMap[key] = path.join(nd, p);
        }
      })
    }

    getData(rootDir, '', isFirst);
    
    return pathMap;
  }

  static dirTreeSource(rootDir: string, exclude: string[] = [], includeFiles = [], include = [], isFirst = true) {
    const pathMap = Util.dirTreePath(rootDir, exclude, includeFiles, include, isFirst);
    const sourceMap: { [key: string]: any } = {};
    Object.keys(pathMap).forEach(p => {
      let Ob = require(pathMap[p]);
      if (Ob['default']) {
        Ob = Ob['default'];
      }
      sourceMap[p] = Ob
    });
    return sourceMap;
  }

  static makeType(dir: string, fileName: string, inter = 'Service') {
    const projectRoot = process.cwd();
    // 正常配置的
    let res = Helper.getDirToFileSource(path.join(projectRoot, `./app/server/${dir}`));
    // 业务模块相关的
    const modules = Helper.dirTreeSource(path.join(projectRoot, './app/pages'), [], [], [fileName], false);
    // 将两种合并
    res = {
      ...res,
      ...modules
    }

    let classCode = ``;
    let importCode = ``;

    if (res.length === 0) {
      return;
    }

    Object.keys(res).forEach(key => {
      const ServiceClass = res[key];
      const instanceService = new ServiceClass('');
      const serviceName = instanceService.constructor.name;

      // let interfaceCodeitem = ``;
      if(key.indexOf('pages') > -1) {
        const servicePath = key.split('pages')[1];
        importCode += `
          import ${serviceName} from '../app/pages${servicePath}';
        `
      } else {
        importCode += `
          import ${serviceName} from '../app/server/${fileName}/${key}';
        `
      }
      
      // interfaceCodeitem = `
      //   interface I${serviceName} {
      //     ${interfaceCodeitem};
      //   }\n
      // `

      classCode += `
        ${serviceName}: ${serviceName}
      `
    });

    const declareFileCode = `
      import 'xioo';
      ${importCode}
      declare module 'xioo' {
        
        export interface I${inter} {
          ${classCode}
        }
      }
    `

    fs.writeFileSync(path.join(projectRoot, `./typings/${fileName}.d.ts`), declareFileCode);
  }
}

/** 工具函数类 */
class Helper extends Util implements IHelper {

  constructor() {
    super();
    this.addGlobalConsoleColor();
  }

  getDirToFilePath(dirPath: string, exclude: string[] = []) {
    const filePathMap: { [key: string]: string } = {};

    const isExists = fs.existsSync(dirPath);
    if (!isExists) return {}

    function getData(nd: string, frontFileName: string) {
      fs.readdirSync(nd).forEach(p => {
        if (fs.statSync(path.join(nd, p)).isDirectory()) {
          getData(path.join(nd, p), path.join(nd, p))
        } else {
          const f = p.split('.');
          const key = path.join(frontFileName, f[0]);
          filePathMap[key] = path.join(nd, p);
        }
      })
    }

    if (exclude.length > 0) {
      exclude.forEach(exdir => {
        const dir = path.join(dirPath, exdir);
        getData(dir, '');
      })
    } else {
      getData(dirPath, '');
    }
    return filePathMap;
  }

  getDirToFileSource(dirPath: string, exclude: string[] = []) {
    const filePathMap = this.getDirToFilePath(dirPath, exclude);
    const sourceMap: { [key: string]: any } = {};
    Object.keys(filePathMap).forEach(p => {
      let Ob = require(filePathMap[p]);
      if (Ob['default']) {
        Ob = Ob['default'];
      }
      sourceMap[p] = Ob
    });
    return sourceMap;
  }

  addGlobalConsoleColor() {
    colorConsole.forEach(color => {
      console[color] = (value) => {
        console.log(colors[color](value));
      }
      modelConsole.forEach(model => {
        console[`${color}${model}`] = (value) => {
          console.log(colors[color][model](value));
        }
      });
    });
  }

  /** 
   * 获取某个目录下的所有文件路径，只要遇到exclude中的目录名，将会过滤到此目录所有一下的
   * @param { string } rootDir 要遍历的目录
   * @param { string[] } exclude 要排除的目录名
   * @param { string[] } includeFiles 指定的文件名，可以使用正则
   * @return { Object } 映射目录
   */
  dirTreePath(rootDir: string, exclude: string[] = [], includeFiles = [], include = [], isFirst = true) {
    // 定义所有的目录映射
    const pathMap: { [key: string]: string } = {};
    // 判断目录是否存在，不存在直接返回空对象{}
    const isExists = fs.existsSync(rootDir);
    if (!isExists) return {};

    function getData(nd: string, frontFileName: string, isFile = true) {
      fs.readdirSync(nd).forEach(p => {
        // 如果当当前遍历到目录名，剧排除掉
        if(exclude.includes(p)) return;
        if (fs.statSync(path.join(nd, p)).isDirectory()) {
          let myFile = true;
          // 适配只遍历响应的目录下的文件
          if(include.length > 0) {
            if(include.includes(p)) {
              myFile = true;
            } else {
              myFile = false;
            }
          }
          getData(path.join(nd, p), path.join(nd, p), myFile);
        } else {
          if(includeFiles.length > 0) {
            const fileName = includeFiles.find(filePath => {
              // 如果是正则校验p文件是否是满足
              if(filePath instanceof RegExp) {
                return filePath.test(p);
              } else {
                // 不是正则就要判断相等
                return filePath === p;
              }
            });
            // 不正确就直接返回了
            if(!fileName) return;
          }
          if(include.length > 0) {
            // 如果是不想遍历的目录则直接返回
            if(!isFile) {
              return;
            }
          }
          const f = p.split('.');
          const key = path.join(frontFileName, f[0]);
          pathMap[key] = path.join(nd, p);
        }
      })
    }

    getData(rootDir, '', isFirst);
    
    return pathMap;
  }

  /** 
   * 获取某个目录下所有文件的资源，使用require运行时获取
   * @param { string } rootDir 要遍历的目录
   * @param { string[] } exclude 要排除的目录名
   * @return { Object } 文件资源映射信息
   */
  dirTreeSource(rootDir: string, exclude: string[] = [], includeFiles = [], include = [], isFirst = true) {
    const pathMap = this.dirTreePath(rootDir, exclude, includeFiles, include, isFirst);
    const sourceMap: { [key: string]: any } = {};
    Object.keys(pathMap).forEach(p => {
      let Ob = require(pathMap[p]);
      if (Ob['default']) {
        Ob = Ob['default'];
      }
      sourceMap[p] = Ob
    });
    return sourceMap;
  }
}

export = Helper;
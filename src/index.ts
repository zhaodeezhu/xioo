import App from './App';
import Controller from './Controller';
import Middleware from './Middleware';
import Service from './Service';
import Xios from './Service/xios';
import Socket from './Socket/Socket';
import Schedule from './Schedule';
import Helper from './Helper';
import Plugin from './Plugin';
import Agant from './Agant/AgantManager';

/** 导出路由相关 */
export { Get, Patch, Post, Delete, Route } from './Router/structure';
/** 导出中间件相关 */
export { MiddleClass, Middle } from './Middleware/structure';

/** 导出控制器和中间件 */
export { Controller, Middleware, Service, Plugin };

/** 导出socket相关 */
export { Socket, Schedule };

/** 导出请求工具 */
export { Xios, Helper };

export { Agant };

/** 导出App */
export default App;

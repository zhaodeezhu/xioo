"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
/*
 * @version:
 * @Author: dee
 * @Date: 2021-01-20 18:09:46
 * @LastEditors: dee
 * @LastEditTime: 2021-01-26 12:15:31
 */
var socket_io_1 = require("socket.io");
var socket_io_redis_1 = require("socket.io-redis");
var redis_1 = require("redis");
var structrue_1 = require("./structrue");
var path = __importStar(require("path"));
// const io: socketio.Server | any = socketio()
var SocketManger = /** @class */ (function () {
    function SocketManger(app) {
        this.cots = {};
        this.app = app;
        this.setOrigin();
        // this.start();
    }
    /** 启动 */
    SocketManger.prototype.start = function () {
        this.app.helper.getDirToFileSource(path.join(this.app.readRoot, './server/socket'));
        this.registerControllers();
        // this.io.of('/admin').on('connection', (socket: Socket) => {
        //   console.log('我连接了');
        //   socket.on('disconnect', () => {
        //     console.log('我退出了');
        //   })
        //   socket.on('test', (content) => {
        //     console.log(content);
        //     socket.emit('user', '您已经成功上线了');
        //   })
        // });
        // this.io.on('connection', (socket: Socket) => {
        //   console.log('我连接了22222');
        //   socket.on('disconnect', () => {
        //     console.log('我退出了22222');
        //   })
        //   socket.on('test', (content) => {
        //     console.log(content);
        //     socket.emit('user', '您已经成功上线了22222');
        //   })
        // });
    };
    /** 注册所有控制器 */
    SocketManger.prototype.registerControllers = function () {
        var _this = this;
        // 先汇总命名空间 和控制器
        var namesapces = this.collectNamespace();
        Object.keys(namesapces).forEach(function (namespace) {
            var cot = _this.io.of(namespace);
            _this.cots[namespace] = cot;
            cot.on('connection', function (socket) {
                var allConnect = namesapces[namespace];
                console.redunderline("\u6709\u5BA2\u6237\u7AEF\u8FDE\u63A5\u5230" + namespace);
                socket.emit('online', { namespace: namespace, id: socket.id });
                allConnect.forEach(function (cont) {
                    var RouterController = new cont.Constrcutor(_this.app);
                    var methods = cont.methods;
                    methods.forEach(function (item) {
                        socket.on(item.path, function (data) {
                            RouterController[item.controllerName].call(RouterController, socket, data);
                        });
                    });
                });
                socket.on('disconnect', function () {
                    console.log('我退出了');
                });
                socket.on('error', function (e) {
                    console.log('====>', e.stack);
                });
            });
            cot.on('error', function (e) {
                console.log('eeeeeeee', e);
            });
        });
    };
    /** 汇总命名空间 */
    SocketManger.prototype.collectNamespace = function () {
        var namesapces = {};
        structrue_1.namespaceList.forEach(function (space) {
            var Constrcutor = space.Constrcutor, namespace = space.namespace;
            if (!namesapces[namespace]) {
                namesapces[namespace] = [];
            }
            var methods = [];
            methods = structrue_1.controllerList.filter(function (controller) { return Constrcutor.prototype === controller.target; });
            namesapces[namespace].push({
                Constrcutor: Constrcutor,
                methods: methods
            });
        });
        return namesapces;
    };
    /** 跨域 */
    SocketManger.prototype.setOrigin = function () {
        // this.io.set('transport', ['websocket', 'xhr-polling', 'jsonp-polling', 'htmlfile', 'flashsocket']);
        // this.io.set('origins', '*:*');
    };
    /** 监听 */
    SocketManger.prototype.listen = function (server) {
        console.blue('Socket启动了');
        this.io = new socket_io_1.Server();
        if (this.app.config.socketConfig.redis) {
            var pubClient = new redis_1.RedisClient(this.app.config.socketConfig.redis);
            var subClient = pubClient.duplicate();
            this.io.adapter(socket_io_redis_1.createAdapter({ pubClient: pubClient, subClient: subClient }));
        }
        this.io.listen(server);
        this.start();
    };
    return SocketManger;
}());
;
module.exports = SocketManger;

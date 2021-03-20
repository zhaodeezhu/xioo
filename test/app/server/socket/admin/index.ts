import { Socket, Route, Post } from 'xioo';

// const {Route, Path} = Socket;

@Socket.Route('/admin')
class Admin extends Socket {
  @Socket.Path('test')
  user(socket, data) {
    console.green(data);
    socket.emit('user', '哈哈哈哈');
  }
}

export = Admin;
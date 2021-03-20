import { Socket } from 'xioo';

// const {Route, Path} = Socket;

@Socket.Route('/admin')
class Admin extends Socket {

  @Socket.Path('/user')
  login(ctx) {
    
  }
}

export = Admin;
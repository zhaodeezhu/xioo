import App from '../App';

import { Path, Route } from './structrue';

class Socket {

  static Path = Path;
  static Route = Route;

  app: App;

  constructor(app: App) {
    this.app = app
  }
}

export = Socket;
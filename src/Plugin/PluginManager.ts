import App from '../App';
import Plugin from './index';
import * as path from 'path';
import PluginInlays from './inlay';
class PluginManager extends Plugin {
  constructor(app: App) {
    super(app);
    this.registerProjectPlugins();
    this.setInlayPlugins();
  }

  /** 插件组 */
  plugins: {[key: string]: any} = {};

  /** 注册目录中的插件 */
  private registerProjectPlugins() {
    const projectPlugins = this.app.helper.dirTreeSource(path.join(this.app.readRoot, './server/plugins'));

    const plugins = Object.values(projectPlugins);

    this.registerPlugin(plugins);
  }

  /** 注册插件 */
  registerPlugin(plugins: any) {
    if(Array.isArray(plugins)) {
      plugins.forEach(item => {
        this.writePlugin(item);
      });
    } else {
      this.writePlugin(plugins);
    }
  }

  /** 将插件写入插件列表 */
  private writePlugin(PluginTarget) {
    const pluginInstance = new PluginTarget(this.app);

    pluginInstance.excute && pluginInstance.excute();
    const pluginName = pluginInstance.constructor.name;

    this.plugins[pluginName] = pluginInstance;
  }

  /** 注册内置插件 */
  private setInlayPlugins() {
    PluginInlays.forEach(item => {
      this.writePlugin(item);
    })
  }
}


export = PluginManager;

      import 'xioo';
      
          import PromiseValue from '../app/server/service/auth/promise';
        
          import User from '../app/server/service/auth/user';
        
          import LangService from '../app/pages/Post/service/LangService';
          import Time from '../app/server/plugins/time/index';
      declare module 'xioo' {
        
        export interface IService {
          
        PromiseValue: PromiseValue
      
        User: User
      
        LangService: LangService
      
        }

        export interface IPlugin {
          
          Time: Time
        
          }

          export interface IPluginManager {
          
            Time: Time
            
          }
      }
    
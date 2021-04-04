
      import 'xioo';
      
          import Time from '../app/server/plugins/time/index';
        
      declare module 'xioo' {
        
        export interface IPlugin {
          
        Time: Time
      
        }
      }
    
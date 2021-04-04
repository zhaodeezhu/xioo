
      import 'xioo';
      
          import PromiseValue from '../app/server/service/auth/promise';
        
          import User from '../app/server/service/auth/user';
        
          import LangService from '../app/pages/Post/service/LangService';
        
      declare module 'xioo' {
        
        export interface IService {
          
        PromiseValue: PromiseValue
      
        User: User
      
        LangService: LangService
      
        }
      }
    
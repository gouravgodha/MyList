import { Injectable } from '@angular/core';
import * as crypto from 'crypto-js';
import {AES} from 'crypto-js/aes';
@Injectable()
export class EncryptionService {

  constructor() { }


  EncryptText(value:string):string
  {
    if(!value)
    {
      return;
    }
    else{
      
     var ciphertext = crypto.AES.encrypt(value, 't6w9z$C&F)J@McQf');  
     return ciphertext.toString();
    }
     
  }
  DecryptText(value:any):string
  {  if(!value)
      {
        return;
      }
      else{

      var bytes = crypto.AES.decrypt(value.toString(), 't6w9z$C&F)J@McQf');
      var data=bytes.toString(crypto.enc.Utf8);
      return data;
      }
  }
  
    
    

}

import * as fs from 'fs';  
import * as path from 'path';

export class FeatureDocument{

  constructor(){
  }

  public getPath(filePath: string,tableau : string[]):string[]  {
      try{
        var files= fs.readdirSync(filePath,"utf8") ;
        for(var i: number=0; i< files.length; i++){
          const filepath = path.join(filePath, files[i]);
          var stats= fs.statSync(filepath) ;
              const isFile = stats.isFile();
              const isDir = stats.isDirectory(); 
              if (isFile) {
                tableau.unshift(filepath);
              }
              if (isDir) {
                this.getPath(filepath,tableau); 
              }
        
          };
      }catch(e){
        console.log("error");
      }
      return tableau; 
  }
}

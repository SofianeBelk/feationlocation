// ------------
// imports
// ------------
import * as fs   from 'fs';  
import * as path from 'path';

export class FeatureDocument{

  // ------------
  // constructeur
  // ------------
  constructor(){
  }


  // ------------
  // result : permet de parcourir le contenu d'un dossier et retourn un tableau contient la liste des uris de touts les fichiers
  //          contenant ce dossier et ses sous-dossier...
  // ------------
  public getPath(filePath:string , tableau:string[]) : string[]  {
      try{
          var files = fs.readdirSync(filePath,"utf8") ;
          for(var i: number=0; i< files.length; i++){
            const filepath = path.join(filePath, files[i]);
            var stats = fs.statSync(filepath) ;
              if (stats.isFile()) {
                  tableau.unshift(filepath); 
              }
              if (stats.isDirectory()) {
                  this.getPath(filepath,tableau); 
              }
          }
      } catch(e) {
           console.log("error reading directory");
      }
      return tableau; 
    }
  }

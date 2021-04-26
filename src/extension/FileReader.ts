import { readFileSync } from "fs";
import { IFileFeature } from "../interfaces/treeview1.interface";
import { Corpus } from "tiny-tfidf-node";


export class FileReader{
    private bankFeatures : Array<IFileFeature>;
    constructor(){
       this.bankFeatures = [] ; 
    }
    public readFile(documentName : string) : Array<IFileFeature> { 
        const data = readFileSync(documentName, "utf8");
        const lines = data.split(/\r?\n/);
        let nombreDeFeatures = 0;
        let fNames : string [] = []; 
        let fDescriptions : string [] = []; 

        // -- 
        for(let i = 0; i< lines.length; i++){
            if(lines[i].indexOf("## Feature Name") >= 0 && i+2 <= lines.length) {
                nombreDeFeatures++;
                fNames.push(lines[i+2].toString());
            }
            if(lines[i].indexOf("## Feature Description") >= 0 && i+2 <= lines.length) {
                fDescriptions.push(lines[i+2].toString());
            }
        }
        for(let i = 0; i< fNames.length; i++){
            this.bankFeatures.push({
                name : fNames[i],
                description : fDescriptions[i]
             });
        } 

        
         try {
                 //appel a l'algorithme tyfy
                  console.log("hello");

                  console.log(fNames) ; 
                  console.log(fDescriptions) ; 
                  const corpus = new Corpus(fNames,fDescriptions);
                   for(let j = 0; j< fNames.length; j++){
                       var mesMots =  corpus.getTopTermsForDocument(fNames[j]);
                       for(let k =0; k<mesMots.length; k++){
                           if(mesMots[k][1] > 1){
                               console.log("not yet implemented");
                               //fDescriptions[j].replace(mesMots[k][0], "");
                           }
                       }
                   }
                   console.log("world") ; 
        } catch (error) {
            console.log("error") ; 
        }

        console.log(this.bankFeatures) ; 

        return this.bankFeatures;
    }
}
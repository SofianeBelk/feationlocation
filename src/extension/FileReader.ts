// ------------
// imports
// ------------
import { readFileSync } from "fs";
import { IFileFeature } from "../interfaces/TreeviewFile-interface";
import { Corpus } from "tiny-tfidf-node";

// ----------------
// class definition
// ----------------
export class FileReader{

    // ------------
    // declarations : 
    // ------------
    private fileFeatures : Array<IFileFeature>;
    private data  : string   ;
    private lines : string[] ; 
    private fNames : string [] = []; 
    private fDescriptions : string [] = []; 
   
    // -----------
    // constructeur
    // ------------
    constructor(){
       this.fileFeatures = [] ; 
    }
    
    // ------------
    // result : permet de lire les doonées d'un fichier
    // ------------
    public readdata(document : string):any{
        this.data = readFileSync(document, "utf8");
        return this.data;
    }

    // ----------
    // result : permet de lire tt les lignes d'un fichier
    // ----------
    public getLines():string[]{
        this.lines = this.data.split(/\r?\n/); 
        return this.lines;
    }

    // ----------
    // result : permet d'appliquer l'algorithm tiny-tfidf qui serve à supprimer les mots de domaine c-a-d les mots qui se répetent 
    //          plusieurs fois dans plusieurs description.
    // ----------
    public applytinyAlgorithm(){
        const corpus = new Corpus(this.fNames,this.fDescriptions);
        var terms = corpus.getTerms();
        for(let j = 0; j< terms.length; j++){
            var frequence= corpus.getCollectionFrequency(terms[j]);
            if(frequence>1){
                 for(let k = 0; k<this.fDescriptions.length; k++){
                     var str = terms[j].toString();
                     var regex = new RegExp(str, "g");
                     this.fDescriptions[k]=this.fDescriptions[k].replace(regex,""); 
                 } 
            }
        }
    }

    // ------------
    // result : méthode principale - permet de lire un fichier, appliquer l'algo tiny et remplir la structure IFileFeature qui
    //          qui reprsent les couples (nomfeature,description).
    // ------------
    public readFile(documentName : string) : Array<IFileFeature> { 

        this.readdata(documentName); 
        this.getLines();

        try {
            for(let i = 0; i< this.lines.length; i++) {
                if(this.lines[i].indexOf("## Feature Name") >= 0 && i+2 <= this.lines.length) {
                    this.fNames.push(this.lines[i+2].toString());
                }
                if(this.lines[i].indexOf("## Feature Description") >= 0 && i+2 <= this.lines.length) {
                    this.fDescriptions.push(this.lines[i+2].toString());
                }
            }
            this.applytinyAlgorithm();
            for(let i = 0; i< this.fNames.length; i++){
                this.fileFeatures.push({
                    name : this.fNames[i],
                    description : this.fDescriptions[i]
                });
            }    
        } catch (error) {
            console.log("error reading file") ; 
        }
        return this.fileFeatures;
    }
}
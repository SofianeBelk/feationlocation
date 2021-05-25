
// --------
// imports
// --------
import sw = require('stopword');


export class StopWord{

    // ------------
    // declarations
    // ------------
    private newDescription:string;


    // -----------
    // constructeur
    // ------------
    constructor(){
        this.newDescription = "";
    }

    // -----------
    // result : prends une description et applique l'algo stopword
    // ------------    
    public applyStopWords(description : string):any{
        return sw.removeStopwords(description.split(' ')) ; 
    }

    
    // -----------
    // result : permet de contruire une nouvelle description...
    // -----------    
    public modifyDescription(str:string){
        let length = str.length-1;
        this.newDescription = this.newDescription + str[length];
        return this.newDescription;
    }

    // -----------
    // result : permet d'appeler la méthode applyStopWords et contruire la nouvelle description.
    // -----------   
    public removestopword(description : string) : string  {
        const newString = this.applyStopWords(description);
        var newDescription="";
        for(let i=0; i<newString.length-1; i++){
            newDescription = newDescription + newString[i]+" ";
        }
        newDescription = newDescription + newString[newString.length-1];
        return newDescription;
    }
}
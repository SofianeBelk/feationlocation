import sw = require('stopword');

export class StopWord{
    constructor(){
    }
    public removestopword(description : string) : string  {
        const oldDescription = description.split(' ') ; 
        const newString = sw.removeStopwords(oldDescription) ; 
        var i ;
        var newDescription="";

        for(i=0; i<newString.length-1; i++)
        {
            newDescription = newDescription +newString[i]+" ";
        }
        newDescription = newDescription +newString[newString.length-1];
        return newDescription;
    }
}
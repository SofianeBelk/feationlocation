
// -----------
// imports
// ------------
var natural = require('natural');
import sm = require("underscore");


export class Duplicates{

    // -----------
    // constructeur
    // ------------
    constructor(){     
    
    }
  
    // -----------
    // result : permet d'appliquer l'algo duplicate
    // ------------
    public removeDuplicates(description : string): string  {
        var tokenizer = new natural.WordTokenizer();
        var tab = tokenizer.tokenize(description);
        var newtabl=sm.uniq(tab);
        var newdescription="" ;
        for(let i=0; i<newtabl.length; i++)
        {
            newdescription = newdescription+newtabl[i]+" ";
        }
        return newdescription;
    }
}

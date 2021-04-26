var natural = require('natural');
import sm = require("underscore");


export class Duplicates{

    constructor(){     
    }
    //remove Duplicates from description 
    public removeDuplicates(description : string): string  {
        var tokenizer = new natural.WordTokenizer();
        var tab = tokenizer.tokenize(description);
        var newtabl=sm.uniq(tab);
        var i;
        var newdescription="" ;
        for(i=0; i<newtabl.length; i++)
        {
            newdescription = newdescription+newtabl[i]+" ";
        }
        return newdescription;
    }
}

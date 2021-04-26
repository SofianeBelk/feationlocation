/*
import * as path from 'path';
import { IFile } from '../extension';
import { FeatureDocument } from '../extension/FeatureDocument';
import { LocalisationFealure } from '../extension/LocalisationFealure';
import { StopWord } from "../utils/StopWord";
import {activate} from "../extension"

let dirPath = path.resolve(`${__dirname}`, '../tests');

const docs =new FeatureDocument();
//const description = "projet pstl with descx";  

const description = "inarm projet with";  
let documentsT = docs.getPath(dirPath,[]);
//Feature Location
const stopWord =new StopWord() ; 
let newdescription = stopWord.removestopword(description);

console.log("\n\ndescription apres la supression des wordstop : \n",newdescription) ; 
const lf = new LocalisationFealure(newdescription, documentsT , 0.3);
console.log("checher dans le repertoire src qui contient les document suivant : \n",documentsT);
lf.intiMatrice();

const documents : string [] = documentsT;
const matrice : any[] = lf.getMtrice();
let result : IFile[] = [];
for(let i = 0 ;i<documents.length;i++){
    result.push(
        {
            uri : documents[i],
            name : documents[i],
            ranges : matrice[i]
        }
    )
}
activate(result);
*/
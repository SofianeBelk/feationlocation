import { readFileSync } from "fs";
import * as vscode from 'vscode';
import sm = require("string-similarity");
import { IWord } from "../interfaces/treeview2-interface";
//import { IWord } from "../interfaces/tree-file.interface";


export function findFeatures(furi : vscode.Uri , words : string[], document : string, similarity : number) : Array<IWord>{
       
    let wordsRanges : Array<IWord> = [];
        try{

            const data = readFileSync(document, "utf8"); 
            const lines = data.split(/\r?\n/); 
            for(let i = 0; i < words.length ; i++){ 
                for(let l = 0; l < lines.length ; l++){
                    const indices = getIndicesOf(words[i], lines[l], false, similarity); 
                    for(const indice of indices){ 
                        wordsRanges.push(
                                { 
                                    urifile : furi,
                                    word : words[i],range : new vscode.Range(new vscode.Position(l,indice-1),
                                    new vscode.Position(l, indice + words[i].length-1))
                                }) ;
                    }
                }
            }
        }catch(e){
            
        }
    return wordsRanges; 
}


  export function getIndicesOf(searchStr : string , strLine : string, caseSensitive : boolean, similarity : number) : any [] {
        var searchStrLen = searchStr.length;
        if (searchStrLen === 0) {
            return [];
        }
        var startIndex = 0;
        var index;
        var indices = [];

        if (!caseSensitive) {
            strLine = strLine.toLowerCase();
            searchStr = searchStr.toLowerCase();
        }
            for(var k : number = 0; k < strLine.split(" ").length; k++){
               if ((index = strLine.indexOf(searchStr, startIndex)) > -1 && (sm.compareTwoStrings(strLine.split(" ")[k], searchStr)  >= similarity)  )
                    {
                        indices.push(index+1);
                        startIndex = index + searchStrLen;    
                    }
                }
              
        return indices;
    } 
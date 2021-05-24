
	// ------------
	// imports
	// ------------
    import sm = require("string-similarity");
    import * as vscode      from 'vscode';
    import { readFileSync } from "fs";
    import { IWord }        from "../interfaces/treeviewFeature-interface";



    // ------------
    // declarations
    // ------------
    let data  : string   ;
    let lines : string[] ; 
    let similarity  : any ;
    let sensitivity : boolean = false;
    let wordsRanges : Array<IWord> ;


    // ------------
    // result : permet de lire un fichier
    // ------------
    export function readFile(document : string):string{
        data = readFileSync(document, "utf8");
        return data;
    }

    // ----------
    // result : permet de retourner les lignes d'un fichier
    // ----------
    export function getLines():string[]{
        lines = data.split(/\r?\n/); 
        return lines;
    }

    // ----------
    // result : permet de récuperer le params similarity : SIMPLE A FAIRE
    // ----------
    export function getSimilarity():any{
        similarity = vscode.workspace.getConfiguration('similarity');
        return similarity;
    }

    // ----------
    // result : retourne si un mot en majucule ou miniscule
    // ---------- 
    export function getSensitivity() : boolean{
        return sensitivity;
    }

    // ----------
    // result : permet de convertir un mot en miniscule.
    // ----------
    export function toLowerCaseString(str:string) : any{
        return str.toLowerCase();
    }

    // ----------
    // result : permet de tester la taille d'un mot
    // ----------
    export function checkStrLength(searchStr : string) : any[]{
        if(searchStr.length === 0){
            return [];
        }
    }

    // ----------
    // result : retourne la taille d'une ligne
    // ----------
    export function getLineLength(line : string) : any{
        return line.length;
    }


    // ----------
    // result : 
    // ----------
    export function splitLine(line : string) : any{
        return line.split(" ");
    }


    // ----------
    // result : permet de retourner l'indice d'un mot dans une ligne 
    // ----------
    export function getIndex(strLine : string, searchStr:string , startindex:number) : number{
        return strLine.indexOf(searchStr, startindex) ;
    }

    // ----------
    // result : permet de verifier la similarité entre deux mots en appliquant l'algorithme similarity
    // ----------
    export function checkSimilarity(strLine : string, searchStr:string , k:number) : boolean{
        return  (sm.compareTwoStrings(splitLine(strLine)[k], searchStr) > 0.4) ;
    }

    // ----------
    // result : permet de retourner un tableau l'indices d'un mot dans une ligne 
    // ----------
    export function getIndicesOf(searchStr : string, strLine : string) : any[] {
        var startIndex = 0, index, indices = [];
        //getSimilarity();
        checkStrLength(searchStr);
        searchStr = toLowerCaseString(searchStr);
        strLine   = toLowerCaseString(strLine);
        for(var k : number = 0; k < splitLine(strLine).length; k++){
            if ((index = getIndex(strLine, searchStr, startIndex)) > -1 && checkSimilarity(strLine,searchStr,k)  ){
                    indices.push(index+1);
                    startIndex = index + (searchStr.length);    
            }
        }
        return indices;
    } 

    
    // ----------
    // result : permet de remplir la structure Iword qui associer pour chaque fichier un tableau des mots avec ses ranges
    // ----------
    export function fillRange(furi:vscode.Uri, words:string[], i:number, l:number, indice:any){
        wordsRanges.push(
            { 
                urifile : furi,
                word : words[i],
                range : new vscode.Range(new vscode.Position(l,indice-1),
                new vscode.Position(l, indice + words[i].length-1))
            }) ;
    }

    // ----------
    // result : méthode principale - permet de lire un fichier, lire son contenu et remplir la structure IRange en appelant 
    //          la méthode fillRange (version modifié de l'algo LSI)
    // ----------
    export function findFeatures(furi : vscode.Uri, words : string[], document : string) : Array<IWord>{
      wordsRanges = [];
            try{
                readFile(document); 
                getLines();
                for(let w = 0; w < words.length ; w++){ 
                    for(let l = 0; l < lines.length ; l++){ 
                        for(const indice of getIndicesOf(words[w], lines[l])){ 
                            fillRange(furi, words,w,l,indice);
                        }
                    } 
                }
            }catch(e){
                console.log(e);
            }
        return wordsRanges; 
    }
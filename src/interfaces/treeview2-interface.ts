import * as vscode from "vscode";


/*
    featureName1 : Limit
        file1
            range1 : limit
            range2 : amount
            ...
        file2
            range1 : limit
            range2 : amount
            ...
        file3
            ...
    featureName2 : Visa
        file1
            range1 : limit
            range2 : amount
            ...
        file2
        file3
    featureName3
*/

export interface IFeature {     //feature
	name : string,                  //featureName
	files  : Array<ITreeFile>       //files
}

export interface ITreeFile{    //file
	uri : vscode.Uri,               //fileuri
    words  : Array<IWord>           //words
}

export interface IWord {       //word
	urifile : vscode.Uri,           //fileuri
	word : string,                  //wordname
	range :  vscode.Range           //wordrange
}

//-----------------
// export interface IWord {
// 	urifile : vscode.Uri,
// 	word : string, 
// 	range :  vscode.Range
// }

// export interface IFeature {
// 	name : string,
// 	words  : Array<IWord>
// }

// export interface ITreeFile{
// 	uri : vscode.Uri,
// 	features : Array<IFeature>
// }
//-----------------

export interface IFileFeature{
    name : string,
    description : string
}

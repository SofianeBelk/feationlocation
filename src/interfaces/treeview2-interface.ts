import * as vscode from "vscode";

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


export interface IFileFeature{
    name : string,
    description : string
}

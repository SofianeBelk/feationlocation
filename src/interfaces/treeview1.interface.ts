import * as vscode from "vscode";

export interface IWord {
	urifile : vscode.Uri,
	word : string, 
	range :  vscode.Range
}

export interface IFeature {
	name : string,
	words  : Array<IWord>
}

export interface ITreeFile {
	uri : vscode.Uri,
	features : Array<IFeature>
}

export interface IFileFeature {
    name : string,
    description : string
}

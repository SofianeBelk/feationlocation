
	// ------------
    // imports 
    // ------------
	import * as vscode from "vscode";


    // ------------
    // chaque mot contient un range et associé à un fichier 
    // ------------
	export interface IWord {
		urifile : vscode.Uri,
		word : string, 
		range :  vscode.Range
	}

	// ------------
    // chaque feature à un nom et un tableau de mots 
    // ------------
	export interface IFeature {
		name : string,
		words  : Array<IWord>
	}

	// ------------
    // chaque fichier source contient un uri et un tableau des features 
    // ------------
	export interface ITreeFile {
		uri : vscode.Uri,
		features : Array<IFeature>
	}

    // ------------
    // un fichier de description contient une liste des couples (nomfeature,description) 
    // ------------	
	export interface IFileFeature {
		name : string,
		description : string
	}

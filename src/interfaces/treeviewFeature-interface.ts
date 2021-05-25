	import * as vscode from "vscode";


	// ------------
    // chaque feature à un nom et un tableau de fichiers dont laquel il se 
    // ------------
	export interface IFeature {     
		name 	: string,                 
		files   : Array<ITreeFile>      
	}

	// ------------
    // chaque fichier source contient un uri et un tableau des mots 
    // ------------
	export interface ITreeFile{    
		uri 	: vscode.Uri,               
		words   : Array<IWord>           
	}


    // ------------
    // chaque mot contient un range et associé à un fichier 
    // ------------	
	export interface IWord {       
		urifile : vscode.Uri,           
		word 	: string,                  
		range 	: vscode.Range           
	}


	// ------------
	// un fichier de description contient une liste des couples (nomfeature,description) 
	// ------------	
	export interface IFileFeature{
		name 		: string,
		description : string
	}

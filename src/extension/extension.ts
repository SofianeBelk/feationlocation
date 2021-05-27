'use strict';

	// ------------
	// imports
	// ------------
	import * as vscode 				  from 'vscode';
	import { FeatureDocument } 		  from './FilesPath';
	import { findFeatures} 			  from './FeatureFinder';
	import { FileReader } 			  from './FileReader';
	import { StopWord } 			  from '../filters/StopWord';
	import { Duplicates }			  from '../filters/Duplicates';
	import { IFileFeature, ITreeFile} from '../interfaces/TreeviewFile-interface';
	import { TreeViewProviderOne } 	  from '../treeview/TreeviewFile';
	import { TreeViewProviderTwo } 	  from '../treeview/TreeviewFeature';
	import { IFeature } 			  from '../interfaces/treeviewFeature-interface';

	// ------------
	// declarations
	// ------------
	let uriFeat   	 : string;
	let uriFolder 	 : string; 
	let filefeatures : Array<IFileFeature> ;
	let fileReader : FileReader;
	let docs       : FeatureDocument;
	let duplicates : Duplicates;
	let stopWord   : StopWord;
	let treeviewbyfile 	  : Array<ITreeFile> = [];
	let treeviewbyfeature : Array<IFeature>  = [];	


	// ------------
    // return : appel l'enregistrement des commandes
    // ------------
	export function activate() {
		registerOpenFileCommand("view1");
		registerFeatureCommand();
		registerRefreshCommand();
	} 

	// ------------
    // result : permet de recuperer la valeur d'un parametres dans les 'settings' 
    // ------------
	export function getConfigParam(){
		return vscode.workspace.getConfiguration('view').get('section');
	}


	// ------------
    // result : prends une view par feature, une ressource/fichier et un range et permet d'ouvrir 
	// cette ressource en selectionnant le range associer.
    // ------------
	export function openFileViewOne(view:any, ressource:any, range:any){
		(new TreeViewProviderOne(view)).openResource(ressource,range);	
	}	

	// ------------
    // result : prends une view par fichier, une ressource/fichier et un range et permet d'ouvrir 
	// cette ressource en selectionnant le range associer.
    // ------------
	export function openFileViewTwo(view:any, ressource:any, range:any){
		(new TreeViewProviderTwo(view)).openResource(ressource,range);	
	}	

	// ------------
    // result : permet d'enregistrer et lancer la commande openFile qui gére l'ouverture d'un fichier
    // ------------
	export function registerOpenFileCommand(param:string) {
		vscode.commands.registerCommand('treeViewExplorer.openFile', (resource, range , view) =>
			{
				if(getConfigParam() === param){
					openFileViewOne(view,resource,range);	
				}else{
					openFileViewTwo(view,resource,range);
				}
			}
		);
	}

	// ------------
    // result : permet d'ouvrir un panel (pour selectionner le un dossier dont laquel on veut chercher les features) et 
	//			et créer un treeview.
    // ------------
	export function openDialogPanel(urifeature: vscode.Uri){
		vscode.window.showOpenDialog({canSelectFolders:true , canSelectMany:false}).then((urisrc: vscode.Uri[]) => {
			uriFeat = urifeature.fsPath;   
			uriFolder = urisrc[0].fsPath ; 
			let view : Array<any> = make(uriFeat);
			let treeData : vscode.TreeDataProvider<any> = makeTreeView(view);	
			vscode.window.createTreeView("treeViewExplorer",{treeDataProvider :treeData});
		}
	);
	}

	// ------------
    // result : permet d'enregistrer la commande feature.location et appeler la méthode openDialogPanel par la suite.
    // ------------
	export function registerFeatureCommand() {
		vscode.commands.registerCommand('feature.location', (urifeature: vscode.Uri) => 
			{
				openDialogPanel(urifeature);
			}
		);
	}

	// ------------
    // result : retourne un treeview qui correspond au param dans les settings.
    // ------------
	function makeTreeView(treeview : Array<any>) : vscode.TreeDataProvider<any>{		
		if(getConfigParam() === "view1"){
			return new TreeViewProviderOne(treeview);
		}else{
			return new TreeViewProviderTwo(treeview);
		}
	}

	// ------------
    // result : permet d'enregister la commande qui gere la mise à jour de la treeview...
    // ------------
	export function registerRefreshCommand() {
		vscode.commands.registerCommand('treeViewExplorer.refreshEntry', () => {
			let viewRefreshed : Array<any> = make(uriFeat);
			let treeDataRefreshed : vscode.TreeDataProvider<any> = makeTreeView(viewRefreshed);
			vscode.window.createTreeView("treeViewExplorer",{treeDataProvider :treeDataRefreshed});
		});
	}	



	// ------------
    // result : prends le fichier de description et permet de lire ce fichier et retourner son contenu.
    // ------------
	export function readFeaturesFile(featureUri : string) : IFileFeature[] {
		return fileReader.readFile(featureUri) ; 
	}	

	// ------------
    // result : retourne l'uri d'un dossier (dont laquel on veut chercher).
    // ------------
	export function getFilesPath() : string[] {
		return docs.getPath(uriFolder,[]); 
	}	

	// ------------
    // result : permet d'appliquer l'algorithme de stopword et retourne la nouvelle description.
    // ------------
	export function applyStopWordsAlgo(description:string) : string {
		return stopWord.removestopword(description);
	}	

	// ------------
    // result : permet d'appliquer l'algorithme de doublons et retourne la nouvelle description.
    // ------------
	export function applyDuplicateAlgo(description:string) : string {
		return duplicates.removeDuplicates(description); 
	}	

    // ------------
    // result : permet d'appeler et appliquer sur tout les descriptions les deux algos : stopwword et duplicate 
    // ------------
	export function removeStopWordandDuplicate(filefeatures: IFileFeature[]) : IFileFeature[]{
		for(let i = 0 ; i < filefeatures.length ; i++){
			let newdescription = applyStopWordsAlgo(filefeatures[i].description);
			filefeatures[i].description = applyDuplicateAlgo(newdescription); 
		}
		return filefeatures;
	}	



    // ------------
    // result : permet de construire un la treeview ordonnée par fichier. 
    // ------------
	export function buildTreeByFile(documents: string[]) : ITreeFile[]{
		for(let i = 0 ; i < documents.length  ; i++){
			treeviewbyfile[i] = { uri : vscode.Uri.file(documents[i]) , features : []}; 
			for(let j = 0 ; j < filefeatures.length ; j++){ 
				let words = filefeatures[j].description.split(" ");
				words = words.splice(0,words.length-1);
				const wordsRanges = findFeatures(treeviewbyfile[i].uri , words , documents[i]); 
				treeviewbyfile[i].features[j] = {name : filefeatures[j].name , words : wordsRanges};	
			}
		}

		return treeviewbyfile;
	}

    // ------------
    // result : permet de construire un la treeview ordonnée par feature. 
    // ------------
	export function buildTreeByFeature(documents: string[]) : IFeature[]{
		for(let i = 0 ; i < filefeatures.length ; i++){ 
			treeviewbyfeature[i] = {name : filefeatures[i].name , files : [] } ; 
			for(let j = 0 ; j < documents.length ; j++){ 
				let words = filefeatures[i].description.split(" "); 
				words = words.splice(0,words.length-1);  
				const wordsRanges = findFeatures(vscode.Uri.file(documents[j]) , words , documents[j]);  
				treeviewbyfeature[i].files[j] = {uri : vscode.Uri.file(documents[j]) , words : wordsRanges};	
			}
		}

		return treeviewbyfeature;
	}

	
    // ------------
    // result : permet de contruire et retourner la treeview correspondant au parametres.
    // ------------	
	export function make(featureUri : string) : Array<any>{
		duplicates = new Duplicates();
		stopWord   = new StopWord() ; 
		fileReader = new FileReader();
		docs 	   = new FeatureDocument();

		filefeatures  = readFeaturesFile(featureUri);
		filefeatures  = removeStopWordandDuplicate(filefeatures);
		let documents = getFilesPath() ; 

		if(getConfigParam() === "view1"){
			let treebyfile    = buildTreeByFile(documents);
			makeTreeView(treebyfile) ;
			return treebyfile;
		}else{
			let treebyfeature = buildTreeByFeature(documents);
			makeTreeView(treebyfeature) ;
			return treebyfeature;
		}
	}

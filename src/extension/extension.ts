'use strict';

import * as vscode from 'vscode';
import { FeatureDocument } from './FeatureDocument';
import { StopWord } from '../utils/StopWord';
import { FileReader } from './FileReader';
import { Duplicates } from '../utils/Duplicates';
import { IFileFeature, ITreeFile, IWord } from '../interfaces/treeview1.interface';
import { findFeatures} from './LocalisationFealure';
import { TreeViewProviderOne } from '../treeview/treeview1';
import { TreeViewProviderTwo } from '../treeview/treeview2';
import { IFeature } from '../interfaces/treeview2-interface';

export interface IFile {
	uri : string,
	name ?: string,
	ranges : Array<vscode.Range>
}

let uriFeat : string;
let uriFolder : string ; 

export function activate() {

	vscode.commands.registerCommand('treeViewExplorer.openFile', (resource, range , view) =>
		{
			if(getConfig() === "view1"){
				console.log("open1");
				(new TreeViewProviderOne(view)).openResource(resource,range);		
			}else{
				console.log("open2");
				(new TreeViewProviderTwo(view)).openResource(resource,range);
			}
		}
	);
		 
	vscode.commands.registerCommand('feature.location', (urifeature: vscode.Uri) => {
		vscode.window.showOpenDialog({canSelectFolders:true , canSelectMany:false}).then((urisrc: vscode.Uri[]) => {
				uriFeat = urifeature.fsPath; // uri feature
				uriFolder = urisrc[0].fsPath ; //	uri folder
				let view : Array<any> = make(uriFeat);
				let treeData : vscode.TreeDataProvider<any> = makeTreeView(view);	
				vscode.window.createTreeView("treeViewExplorer",{treeDataProvider :treeData});
			}
		);
	}
		
	);

	//refresh treeview
	vscode.commands.registerCommand('treeViewExplorer.refreshEntry', () => {
		let viewRefreshed : Array<any> = make(uriFeat);
		let treeDataRefreshed : vscode.TreeDataProvider<any> = makeTreeView(viewRefreshed);
		vscode.window.createTreeView("treeViewExplorer",{treeDataProvider :treeDataRefreshed});
	});
} 

function make(featureUri : string) : Array<any>{

//	if(uriFolder !== null){


		let dirPath = uriFolder;//uri du dossier
		const docs =new FeatureDocument();	
		const duplicates = new Duplicates();
		const stopWord =new StopWord() ; 
		const fileReader = new FileReader() ; 
		
		const bankfeatures : Array<IFileFeature> = fileReader.readFile(featureUri) ;  
		let documentsT = docs.getPath(dirPath,[]); //uri de tous les fichiers 

		for(let i = 0 ; i < bankfeatures.length ; i++){
			let newdescription = stopWord.removestopword(bankfeatures[i].description);
			bankfeatures[i].description = duplicates.removeDuplicates(newdescription); 
		}

		const treeview1 : Array<ITreeFile>  = [];	
		for(let i = 0 ; i < documentsT.length  ; i++){
			treeview1[i] = { uri : vscode.Uri.file(documentsT[i]) , features : []}; 
			
			for(let j = 0 ; j < bankfeatures.length ; j++){ 
				let words = bankfeatures[j].description.split(" ");
				words = words.splice(0,words.length-1);
				const wordsRanges = findFeatures(treeview1[i].uri , words , documentsT[i],0.6); 
				treeview1[i].features[j] = {name : bankfeatures[j].name , words : wordsRanges};	
			}
		}

		const treeview2 : Array<IFeature>  = [];	
		for(let i = 0 ; i < bankfeatures.length ; i++){ 
			treeview2[i] = {name : bankfeatures[i].name , files : [] } ; 

			for(let j = 0 ; j < documentsT.length ; j++){ 
				let words = bankfeatures[i].description.split(" ");
				words = words.splice(0,words.length-1);  
				const wordsRanges = findFeatures(vscode.Uri.file(documentsT[j]) , words , documentsT[j] , 0.6); 
			//	console.log(wordsRanges.length) ;
				treeview2[i].files[j] = {uri : vscode.Uri.file(documentsT[j]) , words : wordsRanges};	
			}
		}
		
		const workbenchConfig = vscode.workspace.getConfiguration('view');
		if(workbenchConfig.get('section') === "view1"){
			makeTreeView(treeview1) ;
			return treeview1;
		}else{
			makeTreeView(treeview2) ;
			return treeview2;
		}		
//	}		

}

function makeTreeView(treeview : Array<any>) : vscode.TreeDataProvider<any>{
	const workbenchConfig = vscode.workspace.getConfiguration('view');
	if(workbenchConfig.get('section') === "view1"){
		return new TreeViewProviderOne(treeview);
	}else{
		return new TreeViewProviderTwo(treeview);
	}
}

function getConfig(){
	return vscode.workspace.getConfiguration('view').get('section');
}
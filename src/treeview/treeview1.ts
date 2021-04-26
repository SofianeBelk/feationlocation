import * as vscode from "vscode";
import { IFeature, ITreeFile, IWord } from "../interfaces/treeview1.interface";
import * as path from 'path';

export class TreeViewProviderOne implements vscode.TreeDataProvider<ITreeFile | IFeature | IWord>{

	private editor : vscode.TextEditor;	
	private treeFiles : Array<ITreeFile> = [];
	private uri : vscode.Uri;
	private word : string;
	private iconPath = {
		file : { 
			light : path.join(__filename, '..', '..', 'resources', 'light', 'folder.svg'),
			dark  : path.join(__filename, '..', '..', 'resources', 'dark', 'folder.svg')
		},
		feature : {
			light : path.join(__filename, '..', '..', 'resources', 'light', 'range.svg'),
			dark  : path.join(__filename, '..', '..', 'resources', 'dark', 'range.svg')
	},
		word : {
			light : path.join(__filename, '..', '..', 'resources', 'light', 'map.svg'),
			dark  : path.join(__filename, '..', '..', 'resources', 'dark', 'map.svg')
		},
	};


	private _onDidChangeTreeData: vscode.EventEmitter<ITreeFile | IFeature | IWord | null | void> = 
							  new vscode.EventEmitter<ITreeFile | IFeature | IWord | null | void>();
	readonly onDidChangeTreeData: vscode.Event<ITreeFile | IFeature | IWord | null | void> = this._onDidChangeTreeData.event;


	constructor(private treeData : Array<ITreeFile>){ 
		//console.log("ref1 view1") ; 
		this.treeFiles = treeData;
		this.activeTeeViewExplorer();
		//console.log("ref2 view1");
	//	vscode.commands.registerCommand('treeViewExplorer.openFile', (resource,range) => this.openResource(resource,range));	
		//console.log("ref3 view1");	
	}

	refresh(): void {
		this._onDidChangeTreeData.fire();
		console.log("refresh view 1") ; 
	}

	activeTeeViewExplorer(toAcivate = true){
		vscode.commands.executeCommand("setContext", "treeViewExplorerEnabled", toAcivate);
	}
	 
	getTreeItem(element: ITreeFile | IFeature | IWord) : vscode.TreeItem | Thenable<vscode.TreeItem> {
		let item : vscode.TreeItem = null;
		//console.log(" => ",(<ITreeFile>element).features.length) ; 
		if((<ITreeFile>element).uri){

			let b = false;
			//console.log("file name = ",(<ITreeFile>element).uri.fsPath);
			for(let i = 0 ; i <(<ITreeFile>element).features.length ; i++){
				if((<ITreeFile>element).features[i].words.length > 0){
					b = true;
					break;
				}
			}

			if(b){
				item = new vscode.TreeItem(this.getFileName((<ITreeFile>element).uri),vscode.TreeItemCollapsibleState.Collapsed);
				item.description =  `File`;
				this.uri = (<ITreeFile>element).uri;
				this._uri = (<ITreeFile>element).uri;
				item.iconPath = this.iconPath.file;
			}else{
				item = new vscode.TreeItem(this.getFileName((<ITreeFile>element).uri));
				item.description =  `File - no match found in this file`;
				item.iconPath = this.iconPath.file;
			}
		}
		else if((<IFeature>element).words)
		{
			if( (<IFeature>element).words.length > 0){
				item = new vscode.TreeItem((<IFeature>element).name,vscode.TreeItemCollapsibleState.Collapsed);
				item.description =  `Feature`;
				item.iconPath = this.iconPath.feature;
			}
		}
		else if((<IWord>element).word){
			
			item = new vscode.TreeItem(`${(<IWord>element).word}`);
			item.command = { command: 'treeViewExplorer.openFile', title: "Open File", arguments: [ (<IWord>element).urifile , (<IWord>element).range , this.treeFiles]};
			item.description =  `${(<IWord>element).range.start.line+1}:${(<IWord>element).range.start.character+1}-${(<IWord>element).range.end.line+1}:${(<IWord>element).range.end.character+1}  Range`;
			item.contextValue = 'file';
			item.iconPath = this.iconPath.word;
		}
		
		return item;
	}

	getChildren(element?: ITreeFile | IFeature | IWord ): vscode.ProviderResult<Array<ITreeFile | IFeature | IWord>> {
		if(element){
			if((<ITreeFile>element).uri){
				return (<ITreeFile>element).features;	//fils1	- features
			}
			else if((<IFeature>element).words){
				return (<IFeature>element).words; 		//fils2 - words
			}
		}
		else{
			return this.treeFiles; 
		}
	}

	getFileName(uri : vscode.Uri) : string{
		const filename = uri.path.substring(uri.path.lastIndexOf('/')+1);
		return filename;
	}

	
	private get _uri() : vscode.Uri {
		return  this.uri;
	}
	private set _uri(uri : vscode.Uri ){
			this.uri = uri;
	}
	
	getParent?(element: ITreeFile | IFeature | IWord): vscode.ProviderResult<ITreeFile | IFeature | IWord> {
		if(element){
			console.log("in") ; 
		}else{
			console.log("out") ; 
			return null ;
		}
	}  

	public openResource(resource: vscode.Uri, range : vscode.Range): void {
	//	console.log("enteer open 1") ; 
		this.editor = vscode.window.activeTextEditor;
		const option : vscode.TextDocumentShowOptions = {
			selection  : range
		};
		vscode.window.showTextDocument(resource,option);
	}	 
	
}

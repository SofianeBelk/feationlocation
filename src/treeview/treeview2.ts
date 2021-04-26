import * as vscode from "vscode";
import * as path from 'path';
import { IFeature, ITreeFile, IWord } from "../interfaces/treeview2-interface";

export class TreeViewProviderTwo implements vscode.TreeDataProvider<ITreeFile | IFeature | IWord>{

	private editor : vscode.TextEditor;	
	private treeFeature : Array<IFeature> = [];
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
		}
	};
	constructor(private treeData : Array<IFeature>){ 
		this.treeFeature = treeData;
		vscode.window.onDidChangeActiveTextEditor(() => {});
		this.activeTeeViewExplorer();
		//vscode.commands.registerCommand('treeViewExplorer.openFile', (resource,range) => this.openResource(resource,range));
	}

	activeTeeViewExplorer(toAcivate = true){
		vscode.commands.executeCommand(
			"setContext",
			"treeViewExplorerEnabled",
			toAcivate
		);
	}
	 
	getTreeItem(element: ITreeFile | IFeature | IWord): vscode.TreeItem | Thenable<vscode.TreeItem> {
		let item : vscode.TreeItem = null;
		if((<ITreeFile>element).uri){ //file 
			if( (<ITreeFile>element).words.length > 0){
				item = new vscode.TreeItem(this.getFileName((<ITreeFile>element).uri),vscode.TreeItemCollapsibleState.Collapsed);
				item.description =  `File`;
				this.uri = (<ITreeFile>element).uri;
				this._uri = (<ITreeFile>element).uri;
				item.iconPath = this.iconPath.file;
			}
		}
		else if((<IFeature>element).files) //feature
		{
			let b = false;
			//console.log("feature name = ",(<IFeature>element).name);
			for(let i = 0 ; i <(<IFeature>element).files.length ; i++){
				if((<IFeature>element).files[i].words.length >0){
					b = true;
					break;
				}
			}
			//console.log(b) ; 
			//console.log( "\u001b[1;31m Red message" );
			if(b){
				item = new vscode.TreeItem((<IFeature>element).name,vscode.TreeItemCollapsibleState.Collapsed);
				item.description =  `Feature`;
				item.iconPath = this.iconPath.feature;
			}else{
				item = new vscode.TreeItem((<IFeature>element).name);
				item.description =  `Feature | no match found for this feature`;
				item.iconPath = this.iconPath.feature;
			}
		}
		else if((<IWord>element).word){ //range 
			item = new vscode.TreeItem(`${(<IWord>element).word}`);
			item.command = { command: 'treeViewExplorer.openFile', title: "Open File", arguments: [ (<IWord>element).urifile , (<IWord>element).range, this.treeFeature] };

			item.description =  `${(<IWord>element).range.start.line+1}:${(<IWord>element).range.start.character+1}-${(<IWord>element).range.end.line+1}:${(<IWord>element).range.end.character+1}  Range`;
			item.contextValue = 'file';
			item.iconPath = this.iconPath.word;
		}
		
		return item;
	}

	getChildren(element?: ITreeFile | IFeature | IWord ): vscode.ProviderResult<Array<ITreeFile | IFeature | IWord>> {
		if(element){
			if((<IFeature>element).files){
				return (<IFeature>element).files;		
			}
			else if((<ITreeFile>element).uri){
				return (<ITreeFile>element).words;
			}
		}
		else{
			return this.treeFeature; 
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
		this.editor = vscode.window.activeTextEditor;
		const option : vscode.TextDocumentShowOptions = {
			selection  : range
		};
		vscode.window.showTextDocument(resource,option);
	}	 


	private _onDidChangeTreeData: vscode.EventEmitter<ITreeFile | IFeature | IWord | undefined | null | void> 
				= new vscode.EventEmitter<ITreeFile | IFeature | IWord | undefined | null | void>();
	readonly onDidChangeTreeData: vscode.Event<ITreeFile | IFeature | IWord | undefined | null | void>
				= this._onDidChangeTreeData.event;
  
	refresh(): void {
		console.log("refresh view 1 cliqued") ; 
	  this._onDidChangeTreeData.fire();
	}
}

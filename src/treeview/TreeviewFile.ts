
	// ------------
	// imports
	// ------------
	import * as vscode from "vscode";
	import { IFeature, ITreeFile, IWord } from "../interfaces/TreeviewFile-interface";
	import * as path from 'path';
	
	export class TreeViewProviderOne implements vscode.TreeDataProvider<ITreeFile | IFeature | IWord>{

	// ------------
	// declarations
	// ------------
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

	// ------------
	// constructeur
	// ------------
	constructor(private treeData : Array<ITreeFile>){ 
		this.treeFiles = treeData;
		this.activeTeeViewExplorer();
	}

	// ------------
    // result
    // ------------	
	activeTeeViewExplorer(toAcivate = true){
		vscode.commands.executeCommand("setContext", "treeViewExplorerEnabled", toAcivate);
	}

	// ------------
    // result : retourne true si l'element à une liste des mots non vide, false sinon.
    // ------------
	public verify(element: ITreeFile | IFeature | IWord ):boolean{
		let b = false;
		for(let i = 0 ; i <(<ITreeFile>element).features.length ; i++){
			if((<ITreeFile>element).features[i].words.length > 0){
				b = true;
				break;
			}
		}
		return b;
	}

	// ------------
    // result : retourne un élement de type file. 
    // ------------
	public getFileItem(element: ITreeFile | IFeature | IWord , item : vscode.TreeItem) : vscode.TreeItem{
		if(this.verify(element)){
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

		return item;
	}

    // ------------ 
    // result : retourne un élement de type feature.
    // ------------
	public getFeatureItem(element: ITreeFile | IFeature | IWord , item : vscode.TreeItem) : vscode.TreeItem{
		if( (<IFeature>element).words.length > 0){
			item = new vscode.TreeItem((<IFeature>element).name,vscode.TreeItemCollapsibleState.Collapsed);
			item.description =  `Feature`;
			item.iconPath = this.iconPath.feature;
		}

		return item;
	}

    // ------------
    // result : retourne un élement de type de word
    // ------------	
	public getWordItem(element: ITreeFile | IFeature | IWord , item : vscode.TreeItem) : vscode.TreeItem{
		item = new vscode.TreeItem(`${(<IWord>element).word}`);
		item.command = { command: 'treeViewExplorer.openFile', title: "Open File", arguments: [ (<IWord>element).urifile , (<IWord>element).range , this.treeFiles]};
		item.description =  `${(<IWord>element).range.start.line+1}:${(<IWord>element).range.start.character+1}-${(<IWord>element).range.end.line+1}:${(<IWord>element).range.end.character+1}  Range`;
		item.contextValue = 'file';
		item.iconPath = this.iconPath.word;

		return item;
	}
	

	// ------------
    // result : méthode principal - retourne l'élement correspondant au type d'élement courant pour un treeview ordonnée par file
    // ------------
	getTreeItem(element: ITreeFile | IFeature | IWord) : vscode.TreeItem | Thenable<vscode.TreeItem> {
		let item : vscode.TreeItem = null;
		if((<ITreeFile>element).uri){
			item = this.getFileItem(element,item);
		}else if((<IFeature>element).words){
			item = this.getFeatureItem(element,item);
		}else if((<IWord>element).word){
			item = this.getWordItem(element,item);
		}
		
		return item;
	}

    // ------------
    // result : permet de retourner les files dd'un élement
    // ------------		
	getChildren(element?: ITreeFile | IFeature | IWord ): vscode.ProviderResult<Array<ITreeFile | IFeature | IWord>> {
		if(element){
			if((<ITreeFile>element).uri){
				return (<ITreeFile>element).features;	
			}else if((<IFeature>element).words){
				return (<IFeature>element).words; 
			}
		}else{
			return this.treeFiles; 
		}
	}

    // ------------
    // result : retourn le nom de fichier à partir de son uri.
    // ------------	
	getFileName(uri : vscode.Uri) : string{
		const filename = uri.path.substring(uri.path.lastIndexOf('/')+1);
		return filename;
	}
	
	// ------------
    // result : permet d'ouvrir un fichier en selectionnant le range correcpondant 
    // ------------	
	public openResource(resource: vscode.Uri, range : vscode.Range): void {
		this.editor = vscode.window.activeTextEditor;
		const option : vscode.TextDocumentShowOptions = {
			selection  : range
		};
		vscode.window.showTextDocument(resource,option);
	}	 

	// ------------
    // result : permet d'envoyer un signal pour faire la mise à jour...
    // ------------
	refresh(): void {
		this._onDidChangeTreeData.fire();
	}

    // ------------
    // result : retourne l'element parent d'un autre élement 
    // ------------		
	getParent?(element: ITreeFile | IFeature | IWord): vscode.ProviderResult<ITreeFile | IFeature | IWord> {
		if(element){
			//rien
		}else{
			return null ;
		}
	}  

	
	// ------------
    // result
    // ------------
	private get _uri() : vscode.Uri {
		return  this.uri;
	}


	// ------------
    // result
    // ------------
	private set _uri(uri : vscode.Uri ){
		this.uri = uri;
	}
	
}

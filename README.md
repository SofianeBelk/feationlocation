# Feature Location README

## ETAPES POUR LANCER LE PROJET : 

### 1 - cloner le projet (avec le dossier node_module inclut) dans un répértoire
### 2 - tester l'extension :
  #### 2.1 - depuis un terminal :
      2.1.1 - lancer la commande 'npm run watch'.
      2.1.2 - cliquer sur 'Run -> Start Debugging' ou simplement sur F5.
      2.1.3 - choisir le fichier de description .md et cliquer droite dessus.
      2.1.4 - cliquer sur 'Feature Location'.
      2.1.5 - un pop up s'affiche, choisir le projet ou vous voulez faire la recherche. 
  #### 2.2 - depuis l'extension .vsix
      2.2.1 - clic-droite sur le fichier featurelocation-1.0.0.vsix.
      2.2.2 - cliquer sur 'install Extension VSIX'.
      2.2.3 - aller à l'étape 2.1.3

### 3 - parametres : 
  #### après avoir réussi l'étape 1 et 2 :
      3.1 - aller sur l'icon de parametres, puis Settings -> Extensions -> Feature Location Settings.
      3.2 - choisir une option 'view1' pour voir les résultats ordonnées par fichier ou 'view2' pour voir les résultats ordonnées par feature.
      3.3 - cliquer sur le bouton refresh sur le panel 'Feature Location Result' pour recharger la nouvelle view.

### 4 - mise à jour :
      - vous pouvez à n'import quel moment rajouter des nouvelles descriptions et recharger la view/les résultats (en cliquant sur
        le bouton refresh) sans avoir besoin de charger tout l'extension. 
  
### 5 - commandes :
#### commandes à lancer (si nécessaire : dans le cas de suppression du dossier node_modules)
      1 - npm install
      2 - npm install stopword
      3 - npm install string-similarity
      4 - npm install underscore
      5 - npm install natural
      6 - npm install tiny-tfidf-node
      7 - npm install tiny-tfidf

### 5 - remarques : 
#### 
     l'extension doit etre tester sur des sous dossiers pas trop volumineuse.


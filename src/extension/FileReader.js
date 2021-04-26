"use strict";
exports.__esModule = true;
exports.FileReader = void 0;
var fs_1 = require("fs");
var tiny_tfidf_node_1 = require("tiny-tfidf-node");
var FileReader = /** @class */ (function () {
    function FileReader() {
        this.bankFeatures = [];
    }
    FileReader.prototype.readFile = function (documentName) {
        var data = fs_1.readFileSync(documentName, "utf8");
        var lines = data.split(/\r?\n/);
        var nombreDeFeatures = 0;
        var fNames = [];
        var fDescriptions = [];
        // -- 
        for (var i = 0; i < lines.length; i++) {
            if (lines[i].indexOf("## Feature Name") >= 0 && i + 2 <= lines.length) {
                nombreDeFeatures++;
                fNames.push(lines[i + 2].toString());
            }
            if (lines[i].indexOf("## Feature Description") >= 0 && i + 2 <= lines.length) {
                fDescriptions.push(lines[i + 2].toString());
            }
        }
        for (var i = 0; i < fNames.length; i++) {
            this.bankFeatures.push({
                name: fNames[i],
                description: fDescriptions[i]
            });
        }
        try {
            //appel a l'algorithme tyfy
            console.log("hola");
            var corpus = new tiny_tfidf_node_1.Corpus([fNames], [fDescriptions]);
            console.log(corpus);
            for (var j = 0; j < fNames.length; j++) {
                var mesMots = corpus.getTopTermsForDocument(fNames[j]);
                for (var k = 0; k < mesMots.length; k++) {
                    if (mesMots[k][1] > 1) {
                        // fDescriptions.replace(mesMots[k][0], "");
                    }
                }
            }
        }
        catch (error) {
            console.log("errorr");
        }
        return this.bankFeatures;
    };
    return FileReader;
}());
exports.FileReader = FileReader;

"use strict";
exports.__esModule = true;
var tiny_tfidf_node_1 = require("tiny-tfidf-node");
var corpus = new tiny_tfidf_node_1.Corpus(["document1", "document2", "document3"], [
    "This is test document number 1. It is quite a short document.",
    "This is test document 2. It is also quite short, and is a test.",
    "Test document number three is a bit different and is also a tiny bit longer."
]);
// print top terms for document 3
console.log(corpus.getTopTermsForDocument("document3"));
// // result
// [
//   [ 'bit', 1.773167206083581 ],
//   [ 'three', 1.1913467165874059 ],
//   [ 'different', 1.1913467165874059 ],
//   [ 'tiny', 1.1913467165874059 ],
//   [ 'longer', 1.1913467165874059 ],
//   [ 'number', 0.5956733582937029 ],
//   [ 'also', 0.5956733582937029 ],
//   [ 'test', 0.2472267810132493 ],
//   [ 'document', 0.2472267810132493 ]
// ]

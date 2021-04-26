import { Corpus } from "tiny-tfidf-node";
 
const corpus = new Corpus(
  ["document1", "document2", "document3"],
    [
        "This is test document number 1. It is quite a short document.",
        "This is test document 2. It is also quite short, and is a test.",
        "Test document number three is a bit different and is also a tiny bit longer."
    ]
);
 
// print top terms for document 3
console.log(corpus.getTopTermsForDocument("document3"));
 


// -------------- for 3 docs
// [
//   [ 'bit', 1.9939850399669656 ],      
//   [ 'three', 1.3113595307890855 ],    
//   [ 'different', 1.3113595307890855 ],
//   [ 'tiny', 1.3113595307890855 ],     
//   [ 'longer', 1.3113595307890855 ],
//   [ 'number', 0.6556797653945428 ],
//   [ 'also', 0.6556797653945428 ],
//   [ 'test', 0.2721316901570901 ],
//   [ 'document', 0.2721316901570901 ]
// ]

//--------------- for one doc
// [
//   [ 'bit', 1.0397207708399179 ],      
//   [ 'test', 0.6931471805599453 ],     
//   [ 'document', 0.6931471805599453 ], 
//   [ 'number', 0.6931471805599453 ],   
//   [ 'three', 0.6931471805599453 ],    
//   [ 'different', 0.6931471805599453 ],
//   [ 'also', 0.6931471805599453 ],
//   [ 'tiny', 0.6931471805599453 ],
//   [ 'longer', 0.6931471805599453 ]
// ]


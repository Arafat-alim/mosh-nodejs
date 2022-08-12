/*

//! using Reference (Normalization) --> CONSISTENCY
let author = {
  name: "Arafat",
};

let course = {
  author: "id",
};

//! using embedded document (DeNormalization) --> PERFORMANCE

let course = {
  author: {
    name: "Arafat",
  },
};

//! !Hybrid
let author = {
  name: "Arafat",
};

let course = {
  author: {
    id: "ref",
    author: "arafat",
  },
};

*/

//! When My Promise resolve-rejected
const p1 = Promise.resolve({ id: 1 });

p1.then((result) => console.log("Result - ", result));

const p2 = Promise.reject(new Error("Reason For rejection MY message"));

p2.catch((err) => console.log(err)); // provide a call stack

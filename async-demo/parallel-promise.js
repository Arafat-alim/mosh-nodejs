//! Parallel Promise
const p1 = new Promise((resolve) => {
  console.log("Async Operation 1...");
  setTimeout(() => {
    resolve(1);
  }, 4000);
});

const p2 = new Promise((resolve) => {
  console.log("Async Operation 2...");
  setTimeout(() => {
    resolve(2);
  }, 2000);
});

//Promise all
Promise.all([p1, p2])
  .then((result) => console.log(result))
  .catch((err) => console.log("Error", err.message));

Promise.race([p1, p2]).then((win) => console.log(win));

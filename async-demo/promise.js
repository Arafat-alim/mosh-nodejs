const promise = new Promise((resolve, rejected) => {
  //kick off some async work
  setTimeout(() => {
    resolve(1);
    // rejected(new Error("Your Message"));
  }, 2000);
});

promise
  .then((result) => console.log("Result: ", result))
  .catch((err) => console.log(err.message));

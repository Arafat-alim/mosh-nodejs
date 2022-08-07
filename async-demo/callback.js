//Practising exercise
console.log("before");
//asynchronus code --
getUser(1, (user) => {
  console.log(user);
  getRepo(user.name, (repo) => {
    console.log(repo);
    getCommit(user.name, (commit) => {
      console.log(commit);
    });
  });
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, name: "Arafat" });
  }, 2000);
}

function getRepo(username, callback) {
  setTimeout(() => {
    if (username) {
      callback(["Repo1", "Repo2"]);
    }
  }, 4000);
}

function getCommit(username, callback) {
  setTimeout(() => {
    callback("Your Commitment -", username);
  }, 2000);
}

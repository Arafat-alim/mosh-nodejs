//! The problemn we have to deal
/*
console.log("Before");
const user = getUser(1);
console.log(user); //undefined
console.log("After");

function getUser(id) {
  setTimeout(() => {
    console.log("Reading data from the database");
    return { id: id, gitUserName: "Arafat" };
  }, 2000);
}

*/

//! Fixing the above code using callback function -- Asyncrhonous Implementation
console.log("Before");
getUser(1, function (user) {
  console.log("User", user);
  getRepositories(user.name, (repos) => {
    console.log("Repos: ", repos);
    getCommits(repos, (commits) => {
      ///Call Back Hell
    });
  });
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading data from the database");
    callback({ id: id, name: "Mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("calling Github API...");
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
//!  Synchronous IMplementation
//we want this type of structure
console.log("Before");
const username = getUser(1);
const getRepo = getRepositories(username);
const commits = getCommits(repos[0]);
console.log("After");

console.log("Before");
getUser(1, getRepositories);

console.log("After");

function getRepositories(user) {
  console.log("User", user.name);
  getRepositories(user.name, getCommits);
}

function getCommits(repos) {
  console.log("Repos: ", repos[0]);
  getCommits(repos[0], displayCommits);
}

function displayCommits(commits) {
  console.log(commits);
}

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading data from the database");
    callback({ id: id, name: "Mosh" });
  }, 2000);
}

function getRepositories(username, callback) {
  setTimeout(() => {
    console.log("calling Github API...");
    console.log("Hello: ", username.name);
    callback(["repo1", "repo2", "repo3"]);
  }, 2000);
}
console.log("After");

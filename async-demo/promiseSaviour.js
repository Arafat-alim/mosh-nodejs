console.log("Before");
getUser(1, (user) => {
  getRepositories(user.gitHubUsername, (repos) => {
    getCommits(repos[0], (commits) => {
      console.log(commits);
    });
  });
});
console.log("After");

function getUser(id) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username, callback) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      console.log("Hello - ", username);
      resolve(["repo1", "repo2", "repo3"]);
    }, 2000);
  });
}

function getCommits(repo, callback) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      console.log(repo);
      callback(["commit"]);
    }, 2000);
  });
}

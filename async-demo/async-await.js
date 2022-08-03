console.log("Before");
// getUser(1, (user) => {
//   getRepositories(user.gitHubUsername, (repos) => {
//     getCommits(repos[0], (commits) => {
//       console.log(commits);
//     });
//   });
// });
console.log("After");

//! consuming Promise
// getUser(1)
//   .then((user) => getRepositories(user.gitHubUsername))
//   .then((repos) => getCommits(repos[0]))
//   .then((commit) => console.log("Commits -", commit))
//   .catch((err) => console.log("Error - ", err.message));

//! Async Awaits
async function getDetails() {
  try {
    const user = await getUser(1);
    const repos = await getRepositories(user.gitHubUsername);
    const commit = await getCommits(repos[0]);
    console.log(commit);
  } catch (err) {
    console.log("Error: ", err.message);
  }
}
//calling my function
getDetails();

function getUser(id) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Reading a user from a database...");
      resolve({ id: id, gitHubUsername: "mosh" });
    }, 2000);
  });
}

function getRepositories(username) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      console.log("Hello - ", username);
      // resolve(["repo1", "repo2", "repo3"]);
      rejected(new Error("cannot fetch the Repository"));
    }, 2000);
  });
}

function getCommits(repo) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Calling GitHub API...");
      console.log(repo);
      resolve(["commit"]);
    }, 2000);
  });
}

//! The problemn we have to deal

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

//! Fixing the above code using callback function
console.log("Before");
getUser(1, function (user) {
  console.log("User", user);
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    console.log("Reading data from the database");
    callback({ id: id, name: "Mosh" });
  }, 2000);
}

//Practising exercise
console.log("before");
//asynchronus code --
getUser(1, (user) => {
  console.log(user);
});

console.log("After");

function getUser(id, callback) {
  setTimeout(() => {
    callback({ id: id, name: "Arafat" });
  }, 2000);
}
//How to deal with these code

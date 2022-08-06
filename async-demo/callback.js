//Practising exercise
console.log("before");
//asynchronus code --
const user = getUser(1);
console.log(user); //undefined
console.log("After");

function getUser(id) {
  setTimeout(() => {
    return { id: id, name: "Arafat" };
  }, 2000);
}
//How to deal with these code

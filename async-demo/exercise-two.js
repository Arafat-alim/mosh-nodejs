//! Converting the callback vidly movies aysnchronous task into Promise
/*
getCustomer(1, (user) => {
  console.log(user.name);
  isGoldMember(user.isGold, (movies) => {
    console.log(movies);
    sentMail(movies, (mail) => {
      console.log("Movies: " + mail);
    });
  });
});
*/

getCustomer(1)
  .then((user) => isGoldMember(user.isGold))
  .then((movie) => sentMail(movie))
  .catch((err) => console.log("Error", err.message));

function getCustomer(id) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Get Customer is calling");
      resolve({ id: id, name: "Arafat", isGold: false });
    }, 2000); 
  });
}
function isGoldMember(user, callback) {
  console.log("IsPrimeMembership: " + user);
  setTimeout(() => {
    if (user === true) {
      callback(["Movie1", "Movie2", "Movie3"]);
    } else {
      callback(
        new Error(
          "Sorry You are not a Prime Member, please purchase Prime Member"
        )
      );
    }
  }, 2000);
}

function sentMail(movies, callback) {
  setTimeout(() => {
    callback(movies);
  }, 2000);
}

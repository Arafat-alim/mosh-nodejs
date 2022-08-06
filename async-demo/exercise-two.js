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

// getCustomer(1)
//   .then((user) => isGoldMember(user.isGold))
//   .then((movie) => sentMail(movie))
//   .then((msg) => console.log(msg))
//   .catch((err) => console.log("Error", err.message));

async function notifyCustomer() {
  const user = await getCustomer(1);
  console.log(user.name);

  const isPrime = await isGoldMember(user.isGold);
  console.log(movies);

  const sentMail = await sentMail(movies);
  console.log(msg);
}

notifyCustomer();
function getCustomer(id) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      console.log("Get Customer is calling");
      resolve({ id: id, name: "Arafat", isGold: true });
    }, 2000);
  });
}
function isGoldMember(user, callback) {
  return new Promise((resolve, rejected) => {
    console.log("IsPrimeMembership: " + user);
    setTimeout(() => {
      if (user === true) {
        resolve(["Movie1", "Movie2", "Movie3"]);
      } else {
        rejected(
          new Error(
            "Sorry You are not a Prime Member, please purchase Prime Member"
          )
        );
      }
    }, 2000);
  });
}

function sentMail(movies, callback) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(movies);
    }, 2000);
  });
}

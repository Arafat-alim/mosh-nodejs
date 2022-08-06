/*
getCustomer(1, (customer) => {
  console.log("Customer: ", customer);
  if (customer.isGold) {
    getTopMovies((movies) => {
      console.log("Top movies: ", movies);
      sendEmail(customer.email, movies, () => {
        console.log("Email sent...");
      });
    });
  }
});
*/
//async-await
async function notifyCustomer() {
  const customer = await getCustomer(1);
  console.log("Customer", customer);
  if (customer.isGold === true) {
    const movie = await getTopMovies();
    console.log("Top Movies", movie);
    const mail = await sendEmail();
    console.log("Email Sent");
  }
}

notifyCustomer();

function getCustomer(id) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "Mosh Hamedani",
        isGold: true,
        email: "email",
      });
    }, 4000);
  });
}

function getTopMovies() {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve(["movie1", "movie2"]);
    }, 4000);
  });
}

function sendEmail(email, movies) {
  return new Promise((resolve, rejected) => {
    setTimeout(() => {
      resolve();
    }, 4000);
  });
}

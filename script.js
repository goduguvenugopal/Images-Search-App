const loginBt = document.getElementById("loginbt");
const signupBt = document.getElementById("signupbt");
const loginFunc = document.getElementById("logindiv");
const signupFunc = document.getElementById("signupdiv");

loginBt.addEventListener("click", function () {
  loginFunc.style.display = "block";
  signupFunc.style.display = "none";
  loginBt.style.color = "blue";
  signupBt.style.color = "";
  mainPage.style.display = "none";
});
signupBt.addEventListener("click", () => {
  loginFunc.style.display = "none";
  signupFunc.style.display = "block";
  signupBt.style.color = "blue";
  loginBt.style.color = "";
  mainPage.style.display = "none";
});

// photo preview code
function change() {
  const fileInput = document.getElementById("file");
  const previewImgs = document.querySelectorAll(".profile-img");

  const selectedFile = fileInput.files[0];

  if (selectedFile && selectedFile.type.startsWith("image/")) {
    const reader = new FileReader();
    reader.onload = function (event) {
      previewImgs.forEach((element) => {
        element.src = event.target.result;
      });
    };
    reader.readAsDataURL(selectedFile);
    previewImgs.forEach((element) => {
      element.style.display = "block";
    });
  } else {
    previewImgs.forEach((element) => {
      element.style.display = "none";
    });
  }
}

// Signup form code
const formFunc = document.getElementById("signupform");

const userName = document.getElementById("username");
const userEmail = document.getElementById("email");
const userPass = document.getElementById("signup-pass");
const outName = document.querySelectorAll(".navbar-name");

formFunc.addEventListener("submit", function (event) {
  event.preventDefault();

  const storeName = userName.value;
  const storeEmail = userEmail.value;
  const storePass = userPass.value;

  // Save user data to localStorage
  localStorage.setItem(
    "userData",
    JSON.stringify({ name: storeName, email: storeEmail, password: storePass })
  );

  outName.forEach((element) => {
    element.textContent = `Hi, ${storeName}`;
  });

  alert("Your Account Has Been Created , Now Login The Website ");

  // Clear signup form
  userName.value = "";
  userEmail.value = "";
  userPass.value = "";
});

// Login code
const logPage = document.getElementById("log-in-page");
const formLog = document.getElementById("loginform");
const logEmail = document.getElementById("login-email");
const logPass = document.getElementById("login-pass");
const mainPage = document.getElementById("mainpage");

const logoutDiv = document.getElementById("log-pro-cont");

formLog.addEventListener("submit", function (event) {
  event.preventDefault();

  const enteredEmail = logEmail.value;
  const enteredPass = logPass.value;

  // Retrieve user data from localStorage
  const userData = JSON.parse(localStorage.getItem("userData"));

  if (
    userData &&
    userData.email === enteredEmail &&
    userData.password === enteredPass
  ) {
    // Set login state to true in localStorage
    localStorage.setItem("isLoggedIn", "true");
    openMain();
  } else {
    alert(
      "Your Email and Password are wrong. Please sign up if you don't have an account."
    );
  }
});

// Check if the user is already logged in
window.onload = function () {
  const isLoggedIn = localStorage.getItem("isLoggedIn");

  if (isLoggedIn === "true") {
    openMain();
  }
};

// Logout function
const logoutButton = document.querySelectorAll(".log-out-bt");
Array.from(logoutButton).forEach((x) => {
  x.addEventListener("click", () => {
    localStorage.removeItem("isLoggedIn");
    logPage.style.display = "block"; // Show login page again
    mainPage.style.display = "none"; // Hide main page
    logoutDiv.style.display = "none"; // Hide logout div
  });
});

function openMain() {
  logPage.style.display = "none";
  mainPage.style.display = "block";
  logoutDiv.style.display = "block";
}

// signup form code

// const formFunc = document.getElementById("signupform");

// const userName = document.getElementById("username");
// const outName = document.querySelectorAll(".navbar-name");

// formFunc.addEventListener("submit", function (x) {
//   x.preventDefault();

//   const storeName = userName.value;
//   outName.forEach((x) => {
//     x.textContent = `Hi,${storeName}`;
//   });

//   alert("Your Account Has Been Created , Now Login The Website ");
// });

// // login code

// const emailText = document.getElementById("email");
// const passWord = document.getElementById("signup-pass");
// const logPage = document.getElementById("log-in-page");
// const formLog = document.getElementById("loginform");
// const logEmail = document.getElementById("login-email");
// const logPass = document.getElementById("login-pass");
// const mainPage = document.getElementById("mainpage");
// const logoutDiv = document.getElementById("log-pro-cont");

// formLog.addEventListener("submit", function (l) {
//   l.preventDefault();

//   const storelog = logEmail.value;
//   const getEmail = emailText.value;
//   const storePass = logPass.value;
//   const getPass = passWord.value;

//   if (storelog === getEmail && storePass === getPass) {
//     setTimeout(openMain, 1000);
//   } else {
//     alert(
//       "Your Email and Password is wrong , Please SignUp If You Don't Have An Account"
//     );
//   }
// });

// function openMain() {
//   logPage.style.display = "none";
//   mainPage.style.display = "block";
//   logoutDiv.style.display = "block";
// }

// // logout function

// const logoutButton = document.querySelectorAll(".log-out-bt");
// Array.from(logoutFunc).forEach((x) => {
//   x.addEventListener("click", () => {
//     localStorage.removeItem("isLoggedIn");
//     logPage.style.display = "block"; // Show login page again
//     mainPage.style.display = "none"; // Hide main page
//     logoutDiv.style.display = "none"; // Hide logout div
//   });
// });

// function openlog() {
//   logPage.style.display = "block";
//   mainPage.style.display = "none";
//   logoutDiv.style.display = "none";
// }

// images API code

const accessKey = "k49MRcGfcPvJ3zb1pznNYw97rO_hlCGcn0GPHZ-hUkM";

const formsearch = document.getElementById("search-form");
const inputSearch = document.getElementById("search");
const searchResults = document.querySelector(".search-img-card");
const showMore = document.getElementById("show-more-bt");

let inputData = "";
let page = 1;

async function searchImages() {
  inputData = inputSearch.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  const results = data.results;

  if (page === 1) {
    searchResults.innerHTML = "";
  }

  results.map((results) => {
    const imagesDiv = document.createElement("div");
    imagesDiv.classList.add("search-img-sub-card");
    const imageTag = document.createElement("img");
    imageTag.classList.add("search-img");
    imageTag.src = results.urls.small;
    imageTag.alt = results.alt_description;
    const imageLink = document.createElement("a");
    imageLink.classList.add("img-name");
    imageLink.href = results.links.html;
    imageLink.textContent = results.alt_description;

    imagesDiv.appendChild(imageTag);
    imagesDiv.appendChild(imageLink);
    searchResults.appendChild(imagesDiv);
  });

  page++;

  if (page > 1) {
    showMore.style.display = "block";
  }
}

formsearch.addEventListener("submit", (x) => {
  x.preventDefault();
  page = 1;
  searchImages();
});

showMore.addEventListener("click", () => {
  searchImages();
});

// share API code
function shareFunc() {
  navigator.share({
    text: "Hi This is Venu Check My Images Website ",
    url: "https://goduguvenugopal.github.io/Images-Search-App/",
  });
}

// checkbox code

const checkbox = document.getElementById("flexSwitchCheckDefault");
const body = document.querySelector("body");

checkbox.addEventListener("change", function () {
  if (checkbox.checked) {
    body.style.backgroundColor = "black";
    body.style.color = "white";
  } else {
    body.style.backgroundColor = "white";
    body.style.color = "black";
  }
});

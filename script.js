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
        const image = event.target.result;
        localStorage.setItem("storedImage", image);
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

function displayStoredImage() {
  const image = localStorage.getItem("storedImage");
  if (image) {
    const previewImgs = document.querySelectorAll(".profile-img");
    previewImgs.forEach((element) => {
      element.src = image;
    });

    console.log("Image retrieved from local storage and displayed.");
  } else {
    console.log("No image found in local storage.");
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
    JSON.stringify({
      Name: storeName,
      email: storeEmail,
      password: storePass,
    })
  );
  outName.forEach((element) => {
    element.textContent = `Hi, ${storeName}`;
  });

  console.log(
    "userData stored in localStorage:",
    localStorage.getItem("userData")
  );
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
    displayStoredImage();
    const userData = JSON.parse(localStorage.getItem("userData"));
    const outNames = document.querySelectorAll(".navbar-name");

    outNames.forEach((element) => {
      element.textContent = "Hi," + userData.Name;
    });
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

// speakfunction starts here

function speakFunction() {
  document.getElementById("speaknow").style.display = "block";
  document.getElementById("listening").style.display = "none";
  document.getElementById("mic-card-hide").style.display = "block"
  speakFunc();
  tryFunc()

  var listen = new webkitSpeechRecognition();

  listen.interimResults = true;
  listen.lang = "en-US";
  listen.start();

  listen.onresult = (a) => {
    var speechText = a.results[0][0].transcript;
    document.getElementById("search").value = speechText;
    const micHead = document.getElementById("michead");
    micHead.textContent = speechText;
    setTimeout(closeDiv, 1000);
    
    
    
     
  };
}

 function tryFunc(){
  document.getElementById("backmic").style.display = "none";
  
 }
 
  

function speakFunc() {
  const micDiv = document.getElementById("micdiv");
  micDiv.style.display = "block";
  micDiv.style.display = "flex";
  setTimeout(() => {
    document.getElementById("listening").style.display = "block";
    document.getElementById("speaknow").style.display = "none";
  },  1500);
  setTimeout(() => {
    document.getElementById("backmic").style.display = "block";
    document.getElementById("mic-card-hide").style.display = "none"
  }, 6000);
}

function closeDiv() {
  document.getElementById("backmic").style.display = "none";
  const micDiv = document.getElementById("micdiv");
  micDiv.style.display = "none";

  page = 1;
  searchImages();
}

// share API code
function shareFunc() {
  navigator.share({
    text: "Hi This is Venu Check My Images Website:",
    title: "Hii This Is Venu Check My Website",
    url: "https://vkimages.netlify.app/",
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

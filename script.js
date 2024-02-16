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

// signup form code

const formFunc = document.getElementById("signupform");

const userName = document.getElementById("username");
const outName = document.getElementById("navbar-name");

formFunc.addEventListener("submit", function (x) {
  x.preventDefault();

  const storeName = userName.value;
  outName.textContent = `Hi,${storeName}`;
  alert("Your Account Has Been Created , Now Login The Website ");
});

// login code

const emailText = document.getElementById("email");
const passWord = document.getElementById("signup-pass");
const logPage = document.getElementById("log-in-page");
const formLog = document.getElementById("loginform");
const logEmail = document.getElementById("login-email");
const logPass = document.getElementById("login-pass");
const mainPage = document.getElementById("mainpage");
const logoutDiv = document.getElementById("log-pro-cont");

formLog.addEventListener("submit", function (l) {
  l.preventDefault();

  const storelog = logEmail.value;
  const getEmail = emailText.value;
  const storePass = logPass.value;
  const getPass = passWord.value;

  if (storelog === getEmail && storePass === getPass) {
    setTimeout(openMain, 1000);
  } else {
    alert(
      "Your Email and Password is wrong , Please SignUp If You Don't Have An Account"
    );
  }
});

function openMain() {
  logPage.style.display = "none";
  mainPage.style.display = "block";
  logoutDiv.style.display = "block";
}

// logout function

const logoutFunc = document
  .getElementById("log-out-bt")
  .addEventListener("click", () => {
    setTimeout(openlog, 1000);
  });
function openlog() {
  logPage.style.display = "block";
  mainPage.style.display = "block";
  logoutDiv.style.display = "none";
}

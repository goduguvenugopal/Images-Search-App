const loginBt = document.getElementById("loginbt");
const signupBt = document.getElementById("signupbt");
const loginFunc = document.getElementById("logindiv");
const signupFunc = document.getElementById("signupdiv");

loginBt.addEventListener("click", function () {
  loginFunc.style.display = "block";
  signupFunc.style.display = "none";
  loginBt.style.color = "blue";
  signupBt.style.color = "";
});
signupBt.addEventListener("click", () => {
  loginFunc.style.display = "none";
  signupFunc.style.display = "block";
  signupBt.style.color = "blue";
  loginBt.style.color = "";
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
const emailText = document.getElementById("email");
const passWord = document.getElementById("signup-pass");
const userName = document.getElementById("username");
const outName = document.getElementById("navbar-name");
const outEmail = document.getElementById("outemail");
const outPassword = document.getElementById("outpassword");

formFunc.addEventListener("submit", function (x) {
  x.preventDefault();

  const storeEmail = emailText.value;
  outEmail.textContent = storeEmail;
});

const logPage = document.getElementById("log-in-page");
const formLog = document.getElementById("loginform");
const logEmail = document.getElementById("login-email");
const logPass = document.getElementById("login-pass");
const mainPage = document.getElementById("mainpage");

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
}

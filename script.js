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

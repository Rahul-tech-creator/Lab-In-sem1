let user = document.getElementById("user");
let pass = document.getElementById("pass");
let form = document.getElementById("form");
let authContainer = document.getElementById("auth-container");
let appContainer = document.getElementById("app-container");
let formTitle = document.getElementById("form-title");
let submitBtn = document.getElementById("submit-btn");
let toggleLink = document.getElementById("toggle-link");
let toggleText = document.getElementById("toggle-text");
let logoutBtn = document.getElementById("logout-btn");

let isSignUp = false;

function showProducts() {
    authContainer.style.display = "none";
    appContainer.style.display = "block";
}

function showAuth() {
    authContainer.style.display = "flex";
    appContainer.style.display = "none";
    user.value = "";
    pass.value = "";
}

window.onload = function () {
    let activeSession = localStorage.getItem("activeSession");
    if (activeSession === "true") {
        showProducts();
    } else {
        showAuth();
    }
};

toggleLink.addEventListener("click", function (e) {
    e.preventDefault();
    isSignUp = !isSignUp;
    if (isSignUp) {
        formTitle.textContent = "Sign Up";
        submitBtn.textContent = "Register";
        toggleText.childNodes[0].textContent = "Already have an account? ";
        toggleLink.textContent = "Login";
    } else {
        formTitle.textContent = "Login";
        submitBtn.textContent = "Submit";
        toggleText.childNodes[0].textContent = "Don't have an account? ";
        toggleLink.textContent = "Sign Up";
    }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let enteredUser = user.value.trim();
    let enteredPass = pass.value.trim();

    if (!enteredUser || !enteredPass) {
        alert("Please fill in both fields");
        return;
    }

    if (isSignUp) {
        localStorage.setItem("registeredUser", enteredUser);
        localStorage.setItem("registeredPass", enteredPass);
        alert("Registration successful! Please login.");
        
        isSignUp = false;
        formTitle.textContent = "Login";
        submitBtn.textContent = "Submit";
        toggleText.childNodes[0].textContent = "Don't have an account? ";
        toggleLink.textContent = "Sign Up";
        user.value = "";
        pass.value = "";
    } else {
        let storedUser = localStorage.getItem("registeredUser") || "rahul";
        let storedPass = localStorage.getItem("registeredPass") || "1234";

        if (enteredUser === storedUser && enteredPass === storedPass) {
            localStorage.setItem("activeSession", "true");
            alert("Login success");
            showProducts();
        } else {
            user.value = "";
            pass.value = "";
            alert("Please enter valid credentials");
        }
    }
});

logoutBtn.addEventListener("click", function () {
    localStorage.removeItem("activeSession");
    alert("Logged out successfully");
    showAuth();
});
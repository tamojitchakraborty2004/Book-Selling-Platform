import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "../firebase-config.js";

// Register New User
function registerUser() {
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Registration successful! Please log in.");
            window.location.href = "login.html";
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Login User
function loginUser() {
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            alert("Login successful!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Invalid credentials");
        });
}

export { registerUser, loginUser };


import { auth, RecaptchaVerifier, signInWithPhoneNumber } from "../firebase-config.js";

// Send OTP
function sendOTP() {
    const phoneNumber = document.getElementById("phone-number").value;
    window.recaptchaVerifier = new RecaptchaVerifier(auth, "recaptcha-container", {
        size: "invisible",
    });

    signInWithPhoneNumber(auth, phoneNumber, window.recaptchaVerifier)
        .then((confirmationResult) => {
            window.confirmationResult = confirmationResult;
            alert("OTP sent to " + phoneNumber);
        })
        .catch((error) => {
            alert(error.message);
        });
}

// Verify OTP
function verifyOTP() {
    const otp = document.getElementById("otp").value;
    window.confirmationResult.confirm(otp)
        .then((result) => {
            alert("Phone verified successfully!");
            window.location.href = "index.html";
        })
        .catch((error) => {
            alert("Invalid OTP");
        });
}

export { sendOTP, verifyOTP };

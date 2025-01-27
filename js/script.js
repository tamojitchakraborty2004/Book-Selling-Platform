import { auth, signInWithEmailAndPassword, signOut, onAuthStateChanged } from "../firebase-config.js";

document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const bookSection = document.getElementById("book-section");
    const userInfo = document.getElementById("user-info");
    const logoutButton = document.getElementById("logout-button");

    // Function to log in the user
    function login() {
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                userInfo.innerHTML = `<p>Welcome, ${user.email}!</p>`;
                loginForm.classList.add("hidden");
                bookSection.classList.remove("hidden");
                alert("Login successful!");
            })
            .catch((error) => {
                alert("Invalid credentials. Please try again.");
            });
    }

    // Function to check if user is logged in (Persistent session)
    onAuthStateChanged(auth, (user) => {
        if (user) {
            userInfo.innerHTML = `<p>Welcome, ${user.email}!</p>`;
            loginForm.classList.add("hidden");
            bookSection.classList.remove("hidden");
        } else {
            loginForm.classList.remove("hidden");
            bookSection.classList.add("hidden");
        }
    });

    // Function to log out the user
    function logout() {
        signOut(auth)
            .then(() => {
                alert("Logged out successfully!");
                loginForm.classList.remove("hidden");
                bookSection.classList.add("hidden");
            })
            .catch((error) => {
                alert("Error logging out.");
            });
    }

    // Function to buy a book
    function buyBook() {
        let bookTitle = document.getElementById("buy-book-title").value;
        if (bookTitle) {
            alert(`You have bought "${bookTitle}" successfully!`);
        } else {
            alert("Enter a book title to buy");
        }
    }

    // Function to sell a book (Only logged-in users)
    function sellBook() {
        let title = document.getElementById("book-title").value;
        let author = document.getElementById("book-author").value;
        let price = document.getElementById("book-price").value;
        let user = auth.currentUser;

        if (!user) {
            alert("You must be logged in to sell a book.");
            return;
        }

        if (title && author && price) {
            let booksList = document.getElementById("books-list");
            booksList.innerHTML += `<div class="book-card">
                <h3>${title}</h3>
                <p>Author: ${author}</p>
                <p>Price: $${price}</p>
                <p>Sold by: ${user.email}</p>
            </div>`;
            alert("Book listed for sale!");
        } else {
            alert("Fill in all book details to sell");
        }
    }

    // Attach functions to global scope
    window.login = login;
    window.logout = logout;
    window.buyBook = buyBook;
    window.sellBook = sellBook;
});

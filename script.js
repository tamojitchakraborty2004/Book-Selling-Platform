document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("login-form");
    const bookSection = document.getElementById("book-section");
    const userInfo = document.getElementById("user-info");

    function login() {
        let username = document.getElementById("username").value;
        if (username) {
            localStorage.setItem("user", username);
            userInfo.innerHTML = `<p>Welcome, ${username}!</p>`;
            loginForm.classList.add("hidden");
            bookSection.classList.remove("hidden");
        } else {
            alert("Enter a valid username");
        }
    }

    function buyBook() {
        let bookTitle = document.getElementById("buy-book-title").value;
        if (bookTitle) {
            alert(`You have bought "${bookTitle}" successfully!`);
        } else {
            alert("Enter a book title to buy");
        }
    }

    function sellBook() {
        let title = document.getElementById("book-title").value;
        let author = document.getElementById("book-author").value;
        let price = document.getElementById("book-price").value;

        if (title && author && price) {
            let booksList = document.getElementById("books-list");
            booksList.innerHTML += `<div class="book-card">
                <h3>${title}</h3>
                <p>Author: ${author}</p>
                <p>Price: $${price}</p>
            </div>`;
            alert("Book listed for sale!");
        } else {
            alert("Fill in all book details to sell");
        }
    }

    window.login = login;
    window.buyBook = buyBook;
    window.sellBook = sellBook;
});

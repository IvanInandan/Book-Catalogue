const myLibrary = [];

function Book(author, title, pages, read) {
    this.author = author;
    this.title = title;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary() {

}

const dialog = document.querySelector(".book-dialog");
const showButton = document.querySelector(".show-form");
const closeButton = document.querySelector(".close-dialog");
const form = document.querySelector(".book-form");

showButton.addEventListener("click", (e) => {
    dialog.showModal();
});

closeButton.addEventListener("click", (e) => {
    e.preventDefault();
    form.reset();
    dialog.close();
});


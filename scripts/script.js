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

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = document.querySelector("[name='title']").value.trim();
    const author = document.querySelector("[name='author']").value.trim();
    const pages = document.querySelector("[name='pages']").value.trim();
    const read = document.querySelector("[name='read']").checked;

    const errors = [];

    if (title === '')
        errors.push("Title of book can't be blank");

    if (author === '')
        errors.push("Author of book can't be blank");

    if (pages <= 0 || pages >= 1000)
        errors.push("Pages of book must be between 1-999");

    if (errors.length > 0){
        for (const msg of errors){
            Toastify({
                text: msg,
                duration: 4000,
                gravity: "top",
                position: "center",
                style: {
                    background: "#DF1C24"
                }
            }).showToast();
        }
    } else {
        Toastify({
            text: "Success!",
            duration: 4000,
            gravity: "top",
            position: "center",
            style: {
                background: "#4bab4e"
            }
        }).showToast();

        form.reset();
        dialog.close();
    

        console.log({title, author, pages, read})
    }
});
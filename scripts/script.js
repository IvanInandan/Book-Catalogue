const myLibrary = [];

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = generateRandomID();
}

function generateRandomID() {
    return Math.random().toString(36).substring(2, 10);
}

function addBookToLibrary(book, library) {
    library.push(book);
}

function displayLibrary(library) {
    let content = document.querySelector(".content");

    let newContent = document.createElement('div');
    newContent.classList.add('content');

    for(const book of library) {
        newContent.appendChild(createCard(book));
    }

    content.innerHTML = newContent.innerHTML;
}

function toggleRead(bookID) {
    let foundBook = null;

    for (const books of myLibrary) {
        if (books.id === bookID) {
            foundBook = books;
            break;
        }
    }

    const index = myLibrary.indexOf(foundBook);

    if (index > -1)
        myLibrary[index].read = !myLibrary[index].read;

    return myLibrary[index].read;
}

function deleteCard(bookID) {
    let foundBook = null;

    for (const books of myLibrary) {
        if (books.id === bookID) {
            foundBook = books;
            break;
        }
    }

    const index = myLibrary.indexOf(foundBook);

    if (index > -1)
        myLibrary.splice(index, 1);


    displayLibrary(myLibrary);
}

function createCard(book) {
    const card = document.createElement('div');
    card.classList.add('book');

    const info = document.createElement('div');
    info.classList.add('info-container');

    const bookTitle = document.createElement('div');
    bookTitle.textContent = book.title;
    bookTitle.classList.add('book-title');

    const bookAuthor = document.createElement('div');
    bookAuthor.textContent = book.author;
    bookAuthor.classList.add('book-author');

    const bookPages = document.createElement('div');
    bookPages.textContent = `Pages: ${book.pages}`;
    bookPages.classList.add('book-pages');

    const bookRead = document.createElement('div');
    bookRead.classList.add('book-read');

    const toggleRead = document.createElement('button');
    toggleRead.classList.add('toggle-read');
    if (book.read === true){
        toggleRead.textContent = "Read";
        toggleRead.classList.add('read');
    } else {
        toggleRead.textContent = "Not read";
        toggleRead.classList.add('unread');
    }

    const bookRemove = document.createElement('div');
    bookRemove.classList.add('book-remove');

    const removeButton = document.createElement('button');
    removeButton.innerHTML = `<img src="../img/remove.png" alt="" class="remove-icon">`;
    removeButton.classList.add('remove-button');

    card.appendChild(info);
    info.appendChild(bookTitle);
    info.appendChild(bookAuthor);
    info.appendChild(bookPages);
    info.appendChild(bookRead);
    bookRead.appendChild(toggleRead);
    card.appendChild(bookRemove);
    bookRemove.appendChild(removeButton);

    card.id = book.id;

    return card;
}


const dialog = document.querySelector(".book-dialog");
const showButton = document.querySelector(".show-form");
const closeButton = document.querySelector(".close-dialog");
const form = document.querySelector(".book-form");
const deleteBook = document.querySelector(".remove-button");

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

        console.log({title, author, pages, read});

        const book = new Book(title, author, pages, read);

        console.log(book);

        addBookToLibrary(book, myLibrary);
        displayLibrary(myLibrary);

        form.reset();
        dialog.close();
    }
});

document.body.addEventListener('click', function(e) {
    if (e.target.closest('.remove-button')) {
        e.preventDefault();
        const bookElement = e.target.closest('.book');
        deleteCard(bookElement.id);
    } 

    if (e.target.closest('.toggle-read')) {
        e.preventDefault();
        const bookElement = e.target.closest('.book');
        let readFlag = toggleRead(bookElement.id)
        let readToggle = bookElement.querySelector('.toggle-read');

        if (readFlag === true) {
            readToggle.classList.add('read');
            readToggle.classList.remove('unread');
            readToggle.textContent = "Read"
        } else {
            readToggle.classList.add('unread');
            readToggle.classList.remove('read');
            readToggle.textContent = "Not read"
        }
    }
});



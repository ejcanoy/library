const { doc } = require("prettier");

const myLibrary = [];

function Book(title, author, pages, hasRead, index) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
  this.index = index;
}

const cardContainer = document.getElementsByClassName("card-container")[0];

function displayBooks() {
  cardContainer.innerHTML = '';

  myLibrary.forEach((book) => {
    const removeBtn = document.createElement("button");
    const pTitle = document.createElement("p");
    const pAuthor = document.createElement("p");
    const pPages = document.createElement("p");
    const pHasRead = document.createElement("button");
  
    removeBtn.innerHTML = "&times";
    removeBtn.className = "remove-btn"
    pTitle.innerHTML = `Title: ${book.title}`;
    pAuthor.innerHTML = `Author: ${book.author}`;
    pPages.innerHTML = `Pages: ${book.pages}`;
    if (book.hasRead) {
      pHasRead.innerHTML = "Read";
      pHasRead.className = "read";
    } else {
      pHasRead.innerHTML = "Not Read";
      pHasRead.className = "not-read";

    }

    const newCard = document.createElement("div");
    newCard.className = "card";
    newCard.id = book.index;
    newCard.appendChild(removeBtn);
    newCard.appendChild(pTitle);
    newCard.appendChild(pAuthor);
    newCard.appendChild(pPages);
    newCard.appendChild(pHasRead);

    cardContainer.appendChild(newCard);
  }
  );
}

function addBookToLibrary(book) {
  myLibrary.push(book);
  displayBooks();
}

function removeBook(bookId) {
  myLibrary.splice(bookId, 1);
}

const modal = document.getElementById("myModal");

const btn = document.getElementById("myBtn");

const span = document.getElementsByClassName("close")[0];

const submitbtn = document.getElementById("modal-submit");


btn.onclick = () => {
  modal.style.display = "block";
};


span.onclick = () => {
  modal.style.display = "none";
};

window.onclick = (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
  }
};

submitbtn.onclick = (event) => {
  modal.style.display = "none";
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("read").checked;
  const curBook = new Book(title, author, pages, hasRead, myLibrary.length - 1);
  addBookToLibrary(curBook);
  event.preventDefault();
};


cardContainer.addEventListener('click', (event) => {
  if (event.target.classList.contains('remove-btn')) {
    const card = event.target.parentNode;
    cardContainer.removeChild(card);
    removeBook(card.id);
  }

});

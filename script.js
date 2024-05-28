const myLibrary = [];

// Book constructor function
function Book(title, author, pages, hasRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.hasRead = hasRead;
}

// Add a method to toggle the read status
Book.prototype.toggleReadStatus = function () {
  this.hasRead = !this.hasRead;
};

// Function to add a book to the library
function addBookToLibrary(title, author, pages, hasRead) {
  const newBook = new Book(title, author, pages, hasRead);
  myLibrary.push(newBook);
  displayLibrary();
}

// Function to display the library
function displayLibrary() {
  const libraryDiv = document.getElementById("library");
  libraryDiv.innerHTML = ""; // Clear the library display

  myLibrary.forEach((book, index) => {
    const bookCard = document.createElement("div");
    bookCard.className = "book-card";
    bookCard.innerHTML = `
            <p>${book.title} by ${book.author}, ${book.pages} pages, ${
      book.hasRead ? "read" : "not read yet"
    }</p>
            <button onclick="removeBook(${index})">Remove</button>
            <button onclick="toggleReadStatus(${index})">${
      book.hasRead ? "Mark as Unread" : "Mark as Read"
    }</button>
        `;
    libraryDiv.appendChild(bookCard);
  });
}

// Function to remove a book from the library
function removeBook(index) {
  myLibrary.splice(index, 1);
  displayLibrary();
}

// Function to toggle the read status of a book
function toggleReadStatus(index) {
  myLibrary[index].toggleReadStatus();
  displayLibrary();
}

// Event listeners
document.getElementById("new-book-button").addEventListener("click", () => {
  document.getElementById("book-form-dialog").showModal();
});

document.getElementById("close-form-button").addEventListener("click", () => {
  document.getElementById("book-form-dialog").close();
});

document.getElementById("book-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const title = document.getElementById("title").value;
  const author = document.getElementById("author").value;
  const pages = document.getElementById("pages").value;
  const hasRead = document.getElementById("hasRead").checked;

  addBookToLibrary(title, author, parseInt(pages), hasRead);
  document.getElementById("book-form").reset();
  document.getElementById("book-form-dialog").close();
});

// Manually add a few books to see the display
addBookToLibrary("The Hobbit", "J.R.R. Tolkien", 295, false);
addBookToLibrary("Harry Potter", "J.K. Rowling", 500, true);
console.log(myLibrary);

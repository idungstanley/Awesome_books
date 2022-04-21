const bookContainer = document.querySelector('.book-container');
const author = document.querySelector('#author');
const form = document.getElementsByTagName('form')[0];
const title = document.querySelector('#title');
let array = [];

// Creating a book class
class Book {
  constructor(title, author, id = new Date().getTime()) {
    this.title = title;
    this.author = author;
    this.id = id;
  }

  static createBook(book) {
    const bookList = document.createElement('li');
    bookList.innerHTML = `<p class="title">"${book.title}" by ${book.author}</p>
      <button id=${book.id} class="delete" onclick= "Book.deleteBook(event)">Remove</button>`;
    bookContainer.appendChild(bookList);
  }

  static clearField() {
    title.value = '';
    author.value = '';
  }

  static setStorage() {
    localStorage.setItem('books', JSON.stringify(array));
  }

  static getStorage() {
    if (localStorage.getItem('books') === null) {
      return Book.setStorage();
    }
    array = JSON.parse(localStorage.getItem('books'));
    return array;
  }

  static renderBooks() {
    const books = Book.getStorage();
    books.forEach((book) => {
      Book.createBook(book);
    });
  }

  static deleteBook(event) {
    const books = Book.getStorage();
    books.forEach((book) => {
      if (event.target.id === book.id) {
        event.target.parentElement.remove();
        books.splice(books.indexOf(book), 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(array));
  }

  static store(event) {
    const booktitle = title.value;
    const bookauthor = author.value;
    const time = new Date().getTime();
    const id = time.toString();
    const book = new Book(booktitle, bookauthor, id);
    Book.getStorage();
    array.push(book);
    Book.setStorage();
    Book.createBook(book);
    Book.clearField();
    event.preventDefault();
  }
}

document.addEventListener('DOMContentLoaded', Book.renderBooks);
form.addEventListener('submit', Book.store);

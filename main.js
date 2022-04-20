const bookContainer = document.querySelector('.book-container');
const author = document.querySelector('#author');
const form = document.getElementsByTagName('form')[0];
const title = document.querySelector('#title');

let array = [];

function createBook(book) {
  const bookList = document.createElement('li');
  const titlep = document.createElement('p');
  const authorP = document.createElement('p');
  const button = document.createElement('button');
  button.classList.add('delete');
  button.textContent = 'Remove';
  button.setAttribute('id', book.id);
  button.addEventListener('click', () => {
    bookContainer.remove(bookList);
    array.splice(array.indexOf(book), 1);
    localStorage.setItem('books', JSON.stringify(array));
  });
  titlep.textContent = book.title;
  authorP.textContent = book.author;
  bookList.append(titlep, authorP, button);
  bookContainer.appendChild(bookList);
}

function setStorage() {
  localStorage.setItem('books', JSON.stringify(array));
}

function getStorage() {
  if (localStorage.getItem('books') === null) {
    setStorage();
  } else {
    array = JSON.parse(localStorage.getItem('books'));
  }
}

function clearField() {
  title.value = '';
  author.value = '';
}

// Store data in local storage
function store(event) {
  const booktitle = title.value;
  const bookauthor = author.value;
  const id = new Date().getTime();
  const book = { title: booktitle, author: bookauthor, id };
  getStorage();
  array.push(book);
  setStorage();
  createBook(book);
  clearField();
  event.preventDefault();
}

function renderBooks() {
  getStorage();
  array.forEach((book) => {
    createBook(book);
  });
}
renderBooks();

form.addEventListener('submit', store);

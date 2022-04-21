const bookContainer = document.querySelector('.book-container')
const author = document.querySelector('#author')
const form = document.getElementsByTagName('form')[0]
const title = document.querySelector('#title')

// Creating a book class
class Book {
  constructor(title, author, id = new Date().getTime()) {
    this.title = title;
    this.author = author;
    this.id = id;
  }
}

let array = [];

function createBook(book) {
  const bookList = document.createElement('li')
  bookList.innerHTML = `<p class="title">"${book.title}" by ${book.author}</p>
      <button id=${book.id} class="delete" onclick= "deleteBook(event)">Remove</button>`
  bookContainer.appendChild(bookList)
}

function deleteBook(event){
      event.target.parentElement.remove();
      array.splice(array.indexOf(event.target), 1)
      localStorage.setItem('books', JSON.stringify(array));
}

function setStorage() {
  localStorage.setItem('books', JSON.stringify(array))
}

function getStorage() {
  if (localStorage.getItem('books') === null) {
    setStorage()
  } else {
    array = JSON.parse(localStorage.getItem('books'))
  }
}

function clearField() {
  title.value = ''
  author.value = ''
}

// Store data in local storage
function store(event) {
  const booktitle = title.value
  const bookauthor = author.value
  const time = new Date().getTime()
  const id = time.toString()
  const book = new Book(booktitle, bookauthor, id)
  console.log(book);
  getStorage()
  array.push(book)
  console.log(array);
  setStorage()
  createBook(book)
  clearField()
  event.preventDefault()
}

function renderBooks() {
  getStorage()
  array.forEach((book) => {
    createBook(book)
  })
}
renderBooks()

form.addEventListener('submit', store)

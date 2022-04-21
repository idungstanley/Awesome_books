/* eslint-disable max-classes-per-file */
const bookContainer = document.querySelector('.book-container')
const author = document.querySelector('#author')
const form = document.getElementsByTagName('form')[0]
const title = document.querySelector('#title')

// Creating a book class
class Book {
  constructor(title, author, id = new Date().getTime()) {
    this.title = title
    this.author = author
    this.id = id
  }
}

let array = []

class bookLibrary {
  static renderBooks() {
    bookStore.getStorage()
    array.forEach((book) => {
      bookLibrary.createBook(book)
    })
  }

  static createBook(book) {
    const bookList = document.createElement('li')
    bookList.innerHTML = `<p class="title">"${book.title}" by ${book.author}</p>
      <button id=${book.id} class="delete" onclick= "bookLibrary.deleteBook(event)">Remove</button>`
    bookContainer.appendChild(bookList)
  }

  static deleteBook(event) {
    const books = bookStore.getStorage()
    books.forEach(book=>{
      if(event.target.id === book.id){
        event.target.parentElement.remove()
        books.splice(books.indexOf(book), 1)
      }
    })
    localStorage.setItem('books', JSON.stringify(array))
  }

  static clearField() {
    title.value = ''
    author.value = ''
  }
}

// Store data in local storage
class bookStore {
  static setStorage() {
    localStorage.setItem('books', JSON.stringify(array))
  }

  static getStorage() {
    if (localStorage.getItem('books') === null) {
      bookStore.setStorage()
    } else {
      return (array = JSON.parse(localStorage.getItem('books')))
    }
  }

  static store(event) {
    const booktitle = title.value
    const bookauthor = author.value
    const time = new Date().getTime()
    const id = time.toString()
    const book = new Book(booktitle, bookauthor, id)
    bookStore.getStorage()
    array.push(book)
    bookStore.setStorage()
    bookLibrary.createBook(book)
    bookLibrary.clearField()
    event.preventDefault()
  }
}

document.addEventListener('DOMContentLoaded', bookLibrary.renderBooks)
form.addEventListener('submit', bookStore.store)

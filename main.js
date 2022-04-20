const bookContainer = document.querySelector('.book-container')
const author = document.querySelector('#author')
const form = document.getElementsByTagName('form')[0]
const title = document.querySelector('#title')

let array = []

function createBook(book) {
  const bookList = document.createElement('li')
  const titlep = document.createElement('p')
  const authorP = document.createElement('p')
  const button = document.createElement('button')
  button.classList.add('delete')
  button.textContent = 'Remove'
  button.setAttribute('id', book.id)
  titlep.textContent = book.title
  authorP.textContent = book.author
  bookList.append(titlep, authorP, button)
  bookContainer.appendChild(bookList)
}

// Store data in local storage
let local
function store(event) {
  let booktitle = title.value
  let bookauthor = author.value
  const id = new Date().getTime()
  const book = { title: booktitle, author: bookauthor, id: id }
  local = window.localStorage.getItem('books')
  array = local ? JSON.parse(local) : []
  array.push(book)
  localStorage.setItem('books', JSON.stringify(array))
  createBook(book)
  console.log(book)
  clearField()
  event.preventDefault()
}
renderBook()

function removeBook(book) {
  console.log('stan')
}

function renderBook() {
  let localData = JSON.parse(localStorage.getItem('books'))
  for (let book of localData) {
    const bookList = document.createElement('li')
    const titlep = document.createElement('p')
    const authorP = document.createElement('p')
    const button = document.createElement('button')
    button.classList.add('delete')
    button.textContent = 'Remove'
    button.setAttribute('id', book.id)
    titlep.textContent = book.title
    authorP.textContent = book.author
    bookList.append(titlep, authorP, button)
    bookContainer.appendChild(bookList)
  }
}

bookContainer.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    let books = JSON.parse(localStorage.getItem('books'))
    for (let i = 0; i < books.length; i++) {
      if (books[i].id == e.target.id) {
        e.target.parentElement.remove()
        books.splice(i, 1)
      }
    }
    localStorage.setItem('books', JSON.stringify(books))
  }
})

function clearField() {
  title.value = ''
  author.value = ''
}

form.addEventListener('submit', store)

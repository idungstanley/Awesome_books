const bookContainer = document.querySelector('.book-container');
const author = document.querySelector('#author');
const form = document.getElementsByTagName('form')[0];
const title = document.querySelector('#title');

let array = [];

function createBook(event) {
  event.preventDefault();
  const bookTitle = title.value;
  const bookAuthor = author.value;
  const book = { Title: bookTitle, Author: bookAuthor };

  const local = window.localStorage.getItem('book');
  array = local ? JSON.parse(local) : [];
  array.push(book);
  localStorage.setItem('book', JSON.stringify(array));

  const bookList = document.createElement('li');
  const titlep = document.createElement('p');
  const authorP = document.createElement('p');
  const button = document.createElement('button');

  button.classList.add('delete');
  button.textContent = 'Remove';

  titlep.textContent = book.Title;
  authorP.textContent = book.Author;

  bookList.append(titlep, authorP, button);
  bookContainer.appendChild(bookList);

  const ul = bookContainer.children;

  Array.from(ul).forEach((li) => {
    const button = li.lastChild;
    const pos = Array.from(ul).indexOf(li);
    button.addEventListener('click', () => {
      li.remove(li.childNodes);
      array.splice(pos, 1);
    });
  });
}

form.addEventListener('submit', createBook);

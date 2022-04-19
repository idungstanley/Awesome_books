const bookContainer = document.querySelector(".book-container");
const author = document.querySelector("#author");
const btn = document.querySelector(".btn");
const form = document.getElementsByTagName("form")[0];
const title = document.querySelector("#title");

const array = [];
function createBook(event) {

  event.preventDefault();
  let bookTitle = title.value;
  let bookAuthor = author.value;
    let book = { Title: bookTitle, Author: bookAuthor };
    
  array.push(book);
   
  let bookList = document.createElement("li");
  let titlep = document.createElement("p");
  let authorP = document.createElement("p");
 let button = document.createElement("button");
    
  button.classList.add("delete");
  button.textContent = "Remove";
    
  titlep.textContent = book.Title;
  authorP.textContent = book.Author;
    
  bookList.append(titlep, authorP, button);
  bookContainer.appendChild(bookList);
  

    const ul = bookContainer.children;

    Array.from(ul).forEach(li => {
        const button = li.lastChild;
        button.addEventListener('click', () => {
            li.remove(li.childNodes);
        });
    });

}

form.addEventListener("submit", createBook);

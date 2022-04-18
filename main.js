const bookContainer = document.querySelector(".book-container");
const author = document.querySelector("#author");
const btn = document.querySelector(".btn")
const form = document.getElementsByTagName('form')[0]
const title = document.querySelector("#title");




function createBook(event){
event.preventDefault();
let bookTitle = title.value;
let bookAuthor = author.value;
let book = {Title: bookTitle, Author: bookAuthor}
let bookList = document.createElement("li");
let titlep = document.createElement("p");
let authorP = document.createElement("p");
let button = document.createElement("button")
button.classList.add("delete");
button.textContent = "Remove"
titlep.textContent = book.Title;
authorP.textContent = book.Author;
bookList.append(titlep, authorP,button);
bookContainer.appendChild(bookList)
console.log(book);

const deleteBtn = document.querySelectorAll(".delete");
let allBook = Array.from(bookList)
console.log(allBook);

Array.from(deleteBtn).forEach(btn=>{
 btn.addEventListener("click", (e)=>{
  e.preventDefault();
  bookContainer.removeChild(bookList);
  console.log(e.target);
 })
})
};




form.addEventListener("submit",createBook);
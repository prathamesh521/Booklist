class Book {
    constructor(title, author) {
        this.title = title;
        this.author = author;
    }
}

class UI {
    static displayBooks() {
        const storedBooks = Store.getBook();

        const books = storedBooks;

        books.forEach((book) => UI.addBookToList(book))
    }

    static addBookToList(book) {
        const list = document.getElementById("book-list");

        const row = document.createElement("tr");



        row.innerHTML = `<td>${book.title}</td>
                        <td>${book.author}</td>
                        <td><a href="#" class="btn btn-danger btn btn-delete
                        btn-sm">X</a></td>`;

        list.appendChild(row)

    }

    static deleteBook(el) {
        if (el.classList.contains("btn-delete")) {
            el.parentElement.parentElement.remove();
        }
    }
    
    static showAlert(message,className){
        const div = document.createElement("div");
        div.className = `alert alert-${className}`

        div.appendChild(document.createTextNode(message))

        const container = document.querySelector(".container")
        const form = document.querySelector("form")

        container.insertBefore(div,form)

        setTimeout(() => {
            document.querySelector(".alert").remove()
        },3000) 
    }

    static clearFields() {
        document.querySelector("#title").value = "";
        document.querySelector("#author").value = "";
    }
}

class Store {
    static getBook() {
        let books = localStorage.getItem("books")
        if(books === null){
            books = []
        }
        else{
            books = JSON.parse(books)
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBook();

        books.push(book)
        localStorage.setItem("books", JSON.stringify(books))
    }

    static removeBook(author){
        const books = Store.getBook();

        books.forEach((book,index) => {
            if(book.author === author){
                books.splice(index,1)
            }
        })
        localStorage.setItem("books", JSON.stringify(books))
    }
}

document.addEventListener("DOMContentLoaded", UI.displayBooks);

document.getElementById("button").addEventListener("click", (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;

    if (title === '' || author === '') {
        UI.showAlert("Please Fill Up All The Details","danger");
    }
    else {
        const book = new Book(title, author);

        UI.addBookToList(book);

        Store.addBook(book)
        UI.showAlert("Book is added","success")

        UI.clearFields();
    }


})

document.querySelector("#book-list").addEventListener("click", (e) => {
    UI.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert("Book is Removed","success")
})


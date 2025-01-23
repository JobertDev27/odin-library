const form = document.querySelector("#add-book");
const add = document.querySelector(".add-button");
const cancel = document.querySelector(".cancel");
const main = document.querySelector("main");
const submit = document.querySelector("#submit");

let formVisible = false;
let books = [
    {
        title : "The little prince",
        author : "Antoine de Saint-Exupéry",
        pages : 109,
        statusRead : false
    },

    {
        title : "The Bible",
        author : "Collective Saints",
        pages : 2400,
        statusRead : false
    },

    {
        title : "Lord of The RIngs",
        author : "John Ronald Reuel Tolkien",
        pages : 1137,
        statusRead : false
    }
]

class book {
    constructor(title, author, pages, statusRead){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.statusRead = statusRead;
    }
}

function addBook() {
    books.forEach((book, index) => {
        const div = document.createElement("div");
        const h2 = document.createElement("h2");
        const p = document.createElement("p");
        const p2 = document.createElement("p");
        const removeBtn = document.createElement("button");

        div.classList.add("item");
        h2.textContent = book.title;
        p.textContent = `by ${book.author}`;
        p2.textContent = `${book.pages} pages`;
        removeBtn.classList.add("remove-item");
        removeBtn.textContent = "X";

        div.append(h2, p, p2, removeBtn);
        main.append(div);

        removeBtn.addEventListener("click", () => {
            books.splice(index, 1);
            div.remove();
        });
    });

    addStatus();
}


function addStatus() {
    for (i = 0; i < main.childElementCount; i++) {
        const readStatus = document.createElement("button");
        const item = main.children[i];
        let read = false;
        
        readStatus.classList.add("read-status");
    
        if (books[i].statusRead) {
            read = true;
            readStatus.textContent = "Read"; 
            readStatus.classList.add("read");
        } else {
            readStatus.textContent = "Not Read";
        }
    
        readStatus.addEventListener("click", () => {
            read = !read;
            if (read) {
                readStatus.textContent = "Read";
                readStatus.classList.add("read");
            } else {
                readStatus.textContent = "Not Read";
                readStatus.classList.remove("read");
            }
        });
    
        item.append(readStatus);
    };
};

const toggleFormVisibility = (visible) => {
    form.classList.toggle("visible", visible);
    form.classList.toggle("hidden", !visible);
    formVisible = visible;
};

add.addEventListener("click", () => toggleFormVisibility(true));
cancel.addEventListener("click", () => toggleFormVisibility(false));

form.addEventListener("submit", (event) => {
    event.preventDefault();

    let title = document.getElementById("title");
    let author = document.getElementById("author");
    let pages = document.getElementById("pages");
    let statusRead = document.getElementById("status");

    if (!title.value || !author.value || !pages.value){
        alert("fields must not be empty");
    };

    try {
        let status = false;
        
        if (statusRead.checked) {
            status = true;
        }

        const newBook = new book(title.value, author.value, pages.value, status);
        books.push(newBook);

        while (main.childElementCount > 0) {
            main.removeChild(main.firstChild);
        };
        addBook();
    } catch(err) {
        alert(err.message);
    };
});

addBook();
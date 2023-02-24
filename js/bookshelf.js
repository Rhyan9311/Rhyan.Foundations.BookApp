/**
 * Bookshelf is an internal data structure
 * that manages Books.
 * @param {HTMLElement} htmlElement the element to render to
 * @param {Book[]} books an optional array of Books
 */
class Bookshelf {
  constructor(htmlElement, books = []) {
    // console.log(htmlElement);
    this.books = books;
    this.htmlElement = htmlElement;
    this.visibleBooks = books;
  }

  /**
   * Process an array of raw book information
   * to initialize Bookshelf properties
   * @param {{author: string[], language: string, subject: string[], title: string}[]} data an array of book data
   */
  seed(data) {
    // Load in the data
    data.forEach((bookInfo) => {
      const book = new Book(
        bookInfo.author,
        bookInfo.language,
        bookInfo.subject,
        bookInfo.title
      );
      this.addBook(book);
    });

    // Prepare and sort visible books
    this.visibleBooks = this.books;
    this.sortVisibleBooks((a, b) => a.title.localeCompare(b.title));

    this.render();
  }

  /**
   * Add a book to the Bookshelf
   * @param {Book} book
   */
  addBook(book) {
    this.books.push(book);
    const li = document.createElement("li");
    li.textContent = book.title;

    // Check if the first child of htmlElement is a ul element
    let ul = this.htmlElement.firstElementChild;
    if (!ul || ul.tagName.toLowerCase() !== 'ul') {
      ul = document.createElement('ul');
      this.htmlElement.appendChild(ul);
    }

    ul.appendChild(li);

    this.renderTitles();
    
  }

  /**
   * Add a new book to the Bookshelf
   * @param {string} title
   * @param {string[]} author
   * @param {string[]} subject
   * @param {string} language
   */

  addNewBook(title, author, subject, language) {
    console.log("title:", title);
    console.log("authors:", author);
    console.log("subjects:", subject);
    console.log("language:", language);
  
    const book = new Book(author, language, subject, title);
    this.addBook(book); // Add the newly created book to the Bookshelf instance
    this.renderTitles(); // Render the titles of all visible books
    console.log(`Added book: ${book.title}`); // Log the title of the added book
  }


  /**
   * Use internal Book array to rerender the
   * existing DOM element for this Bookshelf.
   */
  render() {
    const ul = document.createElement("ul");
    const books = this.visibleBooks.map((b) => b.render());
    ul.replaceChildren(...books);
    this.htmlElement.replaceChildren(ul);
  }

 // Render all the books, not just the titles of the visible books
  renderTitles() {
    const ul = document.createElement("ul");
    const bookTitles = this.visibleBooks.map((book) => {
      const li = document.createElement("li");
      li.textContent = book.title;
      return li;
    });
    
    // Add a new li element for the new book's title
    const newBookTitle = this.books[this.books.length - 1].title;
    const newBookLi = document.createElement("li");
    newBookLi.textContent = newBookTitle;
    bookTitles.push(newBookLi);
  
    ul.append(...bookTitles);
    this.htmlElement.innerHTML = "";
    this.htmlElement.appendChild(ul);
  }


  /**
   * @returns the number of favorite books
   */
  countFavoriteBooks() {
    return this.books.reduce(
      (count, book) => (book.isFavorite ? count + 1 : count),
      0
    );
  }

  /**
  * Filter visible books according to a given criteria function
  * @param {(book: Book) => boolean} criteria
  */
  filterVisibleBooks(criteria) {
    this.visibleBooks = this.books.filter(criteria);
    this.renderTitles();
  }


  /**
   * Sort visible books according to a given compare function
   * @param {(a: Book, b: Book) => number} compareFn
   */
  sortVisibleBooks(compareFn) {
    this.visibleBooks.sort(compareFn);
    this.render();
  }
}

/**
 * 
 * when the addBtn is clicked, then rerender.
 */
let addBtn = document.querySelector(".addBookBtn");

addBtn.addEventListener("click", () => {
  let authorInput = document.querySelector("#author");
  let languageInput = document.querySelector("#language");
  let subjectInput = document.querySelector("#subject");
  let titleInput = document.querySelector("#title");

  let author = authorInput.value;
  let language = languageInput.value;
  let subject = subjectInput.value;
  let title = titleInput.value;

  if (!author || !title || !language || !subject) {
    alert("no input");
    console.log("no input");
    return;
  }

  bookshelf.addNewBook(title, author.split(','), subject.split(','), language);
});

let form = document.querySelector('#add-book-form');
let resetBtn = document.querySelector('.resetBtn');

resetBtn.addEventListener('click', (e) => {
  e.preventDefault(); // Prevent the form from submitting
  form.reset(); // Reset the form fields
});







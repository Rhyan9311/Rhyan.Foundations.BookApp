// Each book has a "Favorite" button that will add the selected book to a maintained list of the user's favorite books. This list should be maintained by Bookshelf.
// The Book class contains a way to keep track of whether or not a Book instance is a Favorite.
// The UI contains elements that indicate whether or not a book is a Favorite.
// You use reduce to count the total number of favorite books, which is indicated by a DOM element.


// The UI contains a "Search" text input and a "Search" button. When the user clicks the button, only books with either an author, title, or topic that matches the user's query should remain visible on the page. This is done using filter.
// The UI contains a "Sort by" drop-down menu that contains the following options. There should also be a way to toggle whether the sort is ascending or descending. This is done using sort.
// Sort alphabetically (A-Z) by title or author.
// Sort by the number of topics.


// --------------------------
//#region Initialization
// --------------------------
const bookshelfElement = document.querySelector(".books");
const bookshelf = new Bookshelf(bookshelfElement);
bookshelf.seed(bookData);

//#endregion Initialization

// --------------------------
//#region Favorite Feature
// --------------------------
const favCount = document.querySelector(".favCount");
const updateBtn = document.querySelector(".favUpdateBtn");

updateBtn.addEventListener("click", () => {
  favCount.textContent = bookshelf.countFavoriteBooks();
});

//#endregion Favorite Feature

// --------------------------
//#region Searching
// --------------------------
const searchInput = document.querySelector("nav input");
const searchBtn = document.querySelector(".searchBtn");

// NOTE: This only searches through the titles of the books!
searchBtn.addEventListener("click", () => {
  const query = searchInput.value.toLowerCase();
  const searchFn = (b) => b.title.toLowerCase().includes(query);
  bookshelf.filterVisibleBooks(searchFn);
});

//#endregion Searching

// --------------------------
//#region Sorting
// --------------------------
const sortBy = document.querySelector(".sortBy");

// NOTE: This only sorts by the titles of the books!
sortBy.addEventListener("change", () => {
  const query = sortBy.value;
  let sortFn;

  if (query === "titleaz") {
    sortFn = (a, z) => a.title.localeCompare(z.title);
  } else if (query === "titleza") {
    sortFn = (a, z) => z.title.localeCompare(a.title);
  }

  bookshelf.sortVisibleBooks(sortFn);
});

//#endregion Sorting


// --------------------------
//# Registration
// --------------------------

let authenticated = false;
let registeredUsers = [];

function register() {
  const username = prompt("Enter your desired username:");
  const password = prompt("Enter your desired password:");

  // register new user
  registeredUsers.push({ username, password });
  alert("Registration successful!");
  console.log("Registration successful!");
}

function login() {
  const username = prompt("Enter your username:");
  const password = prompt("Enter your password:");

  // check if username and password are correct
  const user = registeredUsers.find(
    (user) => user.username === username && user.password === password);
  if (user) {
    authenticated = true;
    alert("Login successful!");
    console.log("Login successful!");
  } else {
    authenticated = false;
    alert("Invalid username or password.");
    console.log("Invalid username or password.");
    login();
  }
}

function getBookData() {
  if (authenticated) {
    // access book data here
    alert("Welcome to Rhyan's Bookshelf!");
    console.log("Welcome.");
  } else {
    alert("You need to login to access the bookshelf.");
    console.log("You need to login to access the book data.");
    login();
  }
}

register();
login();
getBookData();

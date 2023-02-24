/**
 * Book represents information about a book.
 * @param {string[]} authors array of the book's authors
 * @param {string} language the language the book is written in
 * @param {string[]} subject  array of book topics
 * @param {string} title title of the book
 */
class Book {
  constructor(authors, language, subject, title) {
    this.authors = authors;
    this.language = language;
    this.subject = subject;
    this.title = title;
    this.isFavorite = false;
    this.comments = [];
  }

  /**
   * Add a comment to the book's list of comments.
   * @param {string} commentText the text of the comment
   */
  addComment(commentText) {
    if (commentText.length >= 280) {
      alert("Comment must be 280 characters or less.");
      return;
    }

    const comment = new Comment(commentText);
    this.comments.push(comment);
    // Save the comments array to local storage
    this.saveToLocalStorage();
  }

  /**
   * Remove a comment from the book's list of comments.
   * @param {Comment} comment the comment to remove
   */
  removeComment(comment) {
    const index = this.comments.indexOf(comment);
    if (index !== -1) {
      this.comments.splice(index, 1);
      // Save the comments array to local storage
      this.saveToLocalStorage();
    }
  }

  /**
   * Save the book's comments to local storage.
   */
  saveToLocalStorage() {
    localStorage.setItem(`comments-${this.title}`, JSON.stringify(this.comments));
  }

  /**
   * Load the book's comments from local storage.
   */
  loadFromLocalStorage() {
    const commentsJson = localStorage.getItem(`comments-${this.title}`);
    if (commentsJson) {
      const commentsData = JSON.parse(commentsJson);
      commentsData.forEach((commentData) => {
        const comment = new Comment(commentData.text);
        this.comments.push(comment);
      });
    }
  }

  /**
   * @returns a list item representing this Book
   */
  render() {
    /* NOTE: Change render! This is currently a barebones template. */
    const li = document.createElement("li");
    li.textContent = this.title;

    // Create favorite button
    const favButton = document.createElement("button");
    favButton.textContent = this.isFavorite ? "❤️" : "♡";
    li.append(favButton);

    // Toggle favorite property on click
    favButton.addEventListener("click", () => {
      this.isFavorite = !this.isFavorite;
      favButton.textContent = this.isFavorite ? "❤️" : "♡";
    });

    // create comment button
    const commentBtn = document.createElement("button");
    commentBtn.innerText = "Comment";
    commentBtn.addEventListener("click", () => {
      
      // create text input for comment
      const textInput = document.createElement("input");
      textInput.setAttribute("type", "text");
      textInput.setAttribute("maxlength", "280");

      // create send button for comment
      const sendBtn = document.createElement("button");
      sendBtn.innerText = "Send";
      sendBtn.addEventListener("click", () => {
        
        // add comment to the book's list of comments
        this.addComment(textInput.value);
        
        // render the bookshelf with the updated book
        bookshelf.render();
      });

      // create a cancel button for the comment
      const cancelBtn = document.createElement("button");
      cancelBtn.innerText = "Cancel";
      cancelBtn.addEventListener("click", () => {
      
        // remove the comment for from the book element
        li.removeChild(commentForm);
      });

      // create comment form element
      const commentForm = document.createElement("form");
      commentForm.appendChild(textInput);
      commentForm.appendChild(sendBtn);
      commentForm.appendChild(cancelBtn);


      // append comment form to the book element
      li.appendChild(commentForm);
    });


    // append comment button to the book element
    li.appendChild(commentBtn);

    // if the book has comments, render them
    if (this.comments.length > 0) {
      // create ul for comments
      const commentsUl = document.createElement("ul");

      // render each comment as a list item w/ a delete button
      this.comments.forEach((comment) => {
        const commentLi = document.createElement("li");
        commentLi.innerText = comment.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.innerText = "Delete";
        deleteBtn.addEventListener("click", () => {
          // remove the comment from the book's list of comments
          this.removeComment(comment);
          // render the bookshelf w/ the updated book
          bookshelf.render();
        });

        // append delete button to the comment list item
        commentLi.appendChild(deleteBtn);
        // append comment list item to the comments ul
        commentsUl.appendChild(commentLi);
      });

      // append comments ul to the book element
      li.appendChild(commentsUl);
    }

    // return the book element
    return li;
  }
}

/**
 * Comment represents a comment on a book.
 * @param {string} text the text of the comment
 */
class Comment {
  constructor(text) {
    this.text = text;
  }
}

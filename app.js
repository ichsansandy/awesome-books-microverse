const booksCollection = [
  {
    id: 1,
    title: 'Moby-Dick',
    author: 'Herman Melville',
  },
  {
    id: 2,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
  },
];

function loadBooksCollection() {
  function loopingBook(book) {
    return `<div id="${book.id}" class="book-card">
                <p class="book-details">
                    ${book.title} <br />
                    ${book.author}
                </p>
                <button data-book="${book.id}">Remove</button>
                <hr />
            </div>`;
  }

  const bookContainer = document.querySelector('.books-container');
  bookContainer.innerHTML = booksCollection.map((book) => loopingBook(book)).join('');
}

// add books
const titleInput = document.querySelector('#title-input');
const authorInput = document.querySelector('#author-input');
const addButton = document.querySelector('#add-book-button');

addButton.addEventListener('click', (e) => {
  e.preventDefault();
  const newBook = {
    id: booksCollection.length + 1,
    title: titleInput.value,
    author: authorInput.value,
  };
  booksCollection.push(newBook);
  loadBooksCollection();
  titleInput.value = '';
  authorInput.value = '';
});

loadBooksCollection();

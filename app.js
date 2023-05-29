let booksCollection = [
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
  {
    id: 3,
    title: 'The Great Gatsby 1',
    author: 'F. Scott Fitzgerald',
  },
  {
    id: 4,
    title: 'The Great Gatsby 2',
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
                <button class="remove-button" data-book="${book.id}">Remove</button>
                <hr />
                </div>`;
  }

  const bookContainer = document.querySelector('.books-container');
  bookContainer.innerHTML = booksCollection.map((book) => loopingBook(book)).join('');

  // remove button

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      console.log('remove button called');
      const id = Number(button.getAttribute('data-book'));
      booksCollection = booksCollection.filter((book) => book.id !== id);
      loadBooksCollection();
    });
  });
}

loadBooksCollection();
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

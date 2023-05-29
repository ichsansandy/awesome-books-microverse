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

const bookStorage = JSON.parse(localStorage.getItem('bookCollection'));
if (bookStorage !== null) {
  booksCollection = bookStorage;
}

function loadBooksCollection() {
  function loopingBook(book) {
    return `<div id="${book.id}" class="book-card">
                <p class="book-details">
                    "${book.title}" 
                    by 
                    ${book.author}
                </p>
                <button class="remove-button" data-book="${book.id}">Remove</button>
                
                </div>`;
  }

  const bookContainer = document.querySelector('.books-container');
  bookContainer.innerHTML = booksCollection.map((book) => loopingBook(book)).join('');

  // remove button

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-book'));
      booksCollection = booksCollection.filter((book) => book.id !== id);
      loadBooksCollection();
      localStorage.setItem('bookCollection', JSON.stringify(booksCollection));
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
  let newid;
  if (booksCollection.length === 0) {
    newid = 1;
  } else {
    newid = booksCollection[booksCollection.length - 1].id + 1;
  }
  const newBook = {
    id: newid,
    title: titleInput.value,
    author: authorInput.value,
  };
  booksCollection.push(newBook);
  loadBooksCollection();
  titleInput.value = '';
  authorInput.value = '';
  localStorage.setItem('bookCollection', JSON.stringify(booksCollection));
});

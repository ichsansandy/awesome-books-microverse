class BookStore {
  constructor() {
    this.store = [
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
        title: 'Harry Potter',
        author: 'J.K Rowling',
      },
      {
        id: 4,
        title: 'Laskar Pelangi',
        author: 'Andrea Hirata',
      },
    ];
  }

  add(book) {
    this.store.push(book);
  }

  remove(id) {
    this.store = this.store.filter((item) => item.id !== id);
  }
}

const newBookStorage = new BookStore();

const bookStorage = JSON.parse(localStorage.getItem('bookCollection'));
if (bookStorage !== null) {
  newBookStorage.store = bookStorage;
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
  bookContainer.innerHTML = newBookStorage.store.map((book) => loopingBook(book)).join('');

  // remove button

  const removeButtons = document.querySelectorAll('.remove-button');
  removeButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.getAttribute('data-book'));
      newBookStorage.remove(id);
      loadBooksCollection();
      localStorage.setItem('bookCollection', JSON.stringify(newBookStorage.store));
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
  if (newBookStorage.store.length === 0) {
    newid = 1;
  } else {
    newid = newBookStorage.store[newBookStorage.store.length - 1].id + 1;
  }
  const newBook = {
    id: newid,
    title: titleInput.value,
    author: authorInput.value,
  };
  newBookStorage.add(newBook);
  loadBooksCollection();
  titleInput.value = '';
  authorInput.value = '';
  localStorage.setItem('bookCollection', JSON.stringify(newBookStorage.store));
});

const navLinks = document.querySelectorAll('.links');

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const dataLink = link.getAttribute('data-page');
    const listBookSection = document.querySelector('.list-book-section');
    const newBookSection = document.querySelector('.new-book-section');
    const contactUsSection = document.querySelector('.contact-us-section');

    switch (dataLink) {
      case 'list':
        listBookSection.setAttribute('data-visible', true);
        newBookSection.setAttribute('data-visible', false);
        contactUsSection.setAttribute('data-visible', false);
        break;
      case 'add-new':
        newBookSection.setAttribute('data-visible', true);
        listBookSection.setAttribute('data-visible', false);
        contactUsSection.setAttribute('data-visible', false);
        break;
      case 'contacts':
        contactUsSection.setAttribute('data-visible', true);
        newBookSection.setAttribute('data-visible', false);
        listBookSection.setAttribute('data-visible', false);
        break;
      default:
        break;
    }
  });
});

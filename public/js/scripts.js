// public/js/scripts.js
/*
document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 카테고리 목록을 가져와서 메뉴에 추가
    const categoriesResponse = await fetch('/api/books/categories');
    const categoriesData = await categoriesResponse.json();
    displayCategories(categoriesData.categories);
  } catch (error) {
    console.error('Error loading categories:', error);
  }
});

async function loadBooksByCategory(category) {
  try {
    // 카테고리 별 인기 책 목록을 가져와서 화면에 표시
    const response = await fetch(`/api/books/category/${category}/popular`);
    const data = await response.json();
    displayBooks(data.documents);
  } catch (error) {
    console.error(`Error loading books for category ${category}:`, error);
  }
}

async function searchBooks() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    console.error('검색어를 입력하세요.');
    return;
  }

  try {
    // 검색어를 이용해 책을 검색하고 결과를 화면에 표시
    const response = await fetch(`/api/books/search?query=${query}`);
    const data = await response.json();
    displayBooks(data.documents);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayCategories(categories) {
  const categoryMenu = document.getElementById('categoryMenu');
  categoryMenu.innerHTML = '';

  const selectLabel = document.createElement('label');
  selectLabel.textContent = '카테고리 선택: ';
  categoryMenu.appendChild(selectLabel);

  const selectElement = document.createElement('select');
  selectElement.id = 'categorySelect';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.textContent = category;
    option.value = category;
    selectElement.appendChild(option);
  });

  selectElement.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    loadBooksByCategory(selectedCategory);
  });

  categoryMenu.appendChild(selectElement);
}

function displayBooks(books) {
  const bookResults = document.getElementById('bookResults');
  bookResults.innerHTML = '';

  books.forEach(book => {
    const bookItem = document.createElement('div');
    bookItem.className = 'book-item';

    const bookTitle = document.createElement('h3');
    bookTitle.textContent = book.title;

    const bookImage = document.createElement('img');
    bookImage.src = book.thumbnail || 'default-thumbnail.png';

    const bookAuthors = document.createElement('p');
    bookAuthors.textContent = `저자: ${book.authors.join(', ')}`;

    bookItem.appendChild(bookImage);
    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthors);

    bookResults.appendChild(bookItem);
  });
}

// 홈 화면으로 이동하는 함수
function navigateHome() {
  window.location.href = '/';
}
*/

// public/js/scripts.js

document.addEventListener('DOMContentLoaded', async () => {
  try {
    // 카테고리 목록을 가져와서 메뉴에 추가
    const categoriesResponse = await fetch('/api/books/categories');
    const categoriesData = await categoriesResponse.json();
    displayCategories(categoriesData.categories);

    // 모든 카테고리의 인기 책 목록을 가져와서 화면에 표시
    await loadAllPopularBooks();
  } catch (error) {
    console.error('Error:', error);
  }
});

async function loadAllPopularBooks() {
  try {
    const categoriesResponse = await fetch('/api/books/categories');
    const categoriesData = await categoriesResponse.json();

    const promises = categoriesData.categories.map(async category => {
      const response = await fetch(`/api/books/category/${category}/popular`);
      const data = await response.json();
      return { category, books: data.documents };
    });

    const results = await Promise.all(promises);
    displayAllBooks(results);
  } catch (error) {
    console.error('Error loading all books:', error);
  }
}

async function searchBooks() {
  const query = document.getElementById('searchInput').value.trim();
  if (!query) {
    console.error('검색어를 입력하세요.');
    return;
  }

  try {
    // 검색어를 이용해 책을 검색하고 결과를 화면에 표시
    const response = await fetch(`/api/books/search?query=${query}`);
    const data = await response.json();
    displayBooks(data.documents);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayCategories(categories) {
  const categoryMenu = document.getElementById('categoryMenu');
  categoryMenu.innerHTML = '';

  const selectLabel = document.createElement('label');
  selectLabel.textContent = '카테고리 선택: ';
  categoryMenu.appendChild(selectLabel);

  const selectElement = document.createElement('select');
  selectElement.id = 'categorySelect';

  categories.forEach(category => {
    const option = document.createElement('option');
    option.textContent = category;
    option.value = category;
    selectElement.appendChild(option);
  });

  selectElement.addEventListener('change', (event) => {
    const selectedCategory = event.target.value;
    loadBooksByCategory(selectedCategory);
  });

  categoryMenu.appendChild(selectElement);
}

function displayAllBooks(categories) {
  const mainSection = document.querySelector('main');
  mainSection.innerHTML = '';

  categories.forEach(category => {
    const section = document.createElement('section');
    section.className = 'category-section';

    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category.category;
    section.appendChild(categoryTitle);

    const booksContainer = document.createElement('div');
    booksContainer.className = 'books-container';

    category.books.forEach(book => {
      const bookItem = document.createElement('div');
      bookItem.className = 'book-item';

      const bookTitle = document.createElement('h3');
      bookTitle.textContent = book.title;

      const bookImage = document.createElement('img');
      bookImage.src = book.thumbnail || 'default-thumbnail.png';

      const bookAuthors = document.createElement('p');
      bookAuthors.textContent = `저자: ${book.authors.join(', ')}`;

      bookItem.appendChild(bookImage);
      bookItem.appendChild(bookTitle);
      bookItem.appendChild(bookAuthors);

      booksContainer.appendChild(bookItem);
    });

    section.appendChild(booksContainer);
    mainSection.appendChild(section);
  });
}

// 홈 화면으로 이동하는 함수
function navigateHome() {
  window.location.href = '/';
}

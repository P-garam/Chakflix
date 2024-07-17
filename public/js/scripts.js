// public/js/scripts.js

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

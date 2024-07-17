// app.js
const express = require('express');
const path = require('path');
const dotenv = require('dotenv');

// .env 파일에 저장된 환경 변수 로드
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const booksRouter = require('./routes/books');
app.use('/api/books', booksRouter);

// Serve HTML
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

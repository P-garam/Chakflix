// routes/books.js
/*
const express = require('express');
const axios = require('axios');
const router = express.Router();

const KAKAO_API_URL = 'https://dapi.kakao.com/v3/search/book';
const API_KEY = process.env.KAKAO_API_KEY;

// 책 검색 라우트
router.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get(KAKAO_API_URL, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`
      },
      params: {
        query: query
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 카테고리 목록을 반환하는 라우트
router.get('/categories', async (req, res) => {
  try {
    // 여기서는 임의의 카테고리 목록을 제공
    const categories = ['science', 'fiction', 'history'];
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Failed to fetch categories');
  }
});

// 특정 카테고리의 인기 책 목록을 반환하는 라우트
router.get('/category/:category/popular', async (req, res) => {
  const category = req.params.category;

  try {
    const response = await axios.get(KAKAO_API_URL, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`
      },
      params: {
        query: category
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching popular books for category ${category} from Kakao API:`, error);
    res.status(500).send(`Failed to fetch popular books for category ${category}`);
  }
});

// 책 상세 정보를 가져오는 라우트
router.get('/detail/:bookId', async (req, res) => {
  const bookId = req.params.bookId;

  try {
    // 카카오 API에서 책 상세 정보를 요청
    const response = await axios.get(`${KAKAO_API_URL}/${bookId}`, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching book details for ${bookId} from Kakao API:`, error);
    res.status(500).send(`Failed to fetch book details for ${bookId}`);
  }
});


module.exports = router;
*/

const express = require('express');
const axios = require('axios');
const router = express.Router();

const KAKAO_API_URL = 'https://dapi.kakao.com/v3/search/book';
const API_KEY = process.env.KAKAO_API_KEY;

// 책 검색 라우트
router.get('/search', async (req, res) => {
  const query = req.query.query;

  try {
    const response = await axios.get(KAKAO_API_URL, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`
      },
      params: {
        query: query
      }
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

// 카테고리 목록을 반환하는 라우트
router.get('/categories', async (req, res) => {
  try {
    // 여기서는 임의의 카테고리 목록을 제공
    const categories = ['science', 'fiction', 'history'];
    res.json({ categories });
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).send('Failed to fetch categories');
  }
});

// 특정 카테고리의 인기 책 목록을 반환하는 라우트
router.get('/category/:category/popular', async (req, res) => {
  const category = req.params.category;

  try {
    const response = await axios.get(KAKAO_API_URL, {
      headers: {
        Authorization: `KakaoAK ${API_KEY}`
      },
      params: {
        query: category
      }
    });

    res.json(response.data);
  } catch (error) {
    console.error(`Error fetching popular books for category ${category} from Kakao API:`, error);
    res.status(500).send(`Failed to fetch popular books for category ${category}`);
  }
});

module.exports = router;

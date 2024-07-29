
const express = require('express')
const { getAllBooks,addBook,editBook, deleteBook } = require('../controller/booksController')


const router = express.Router()


router.get('/', getAllBooks);

router.post('/', addBook);
router.put('/:id', editBook);
router.delete('/:id', deleteBook);

module.exports = router;
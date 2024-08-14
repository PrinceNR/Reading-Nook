
const express = require('express')
const { getAllBooks,addBook,editBook, deleteBook ,getBook, addImage} = require('../controller/booksController')
const validateToken = require('../middleware/validateTokenHandler')
const upload = require('../Config/multer')

const router = express.Router()

router.get('/', getAllBooks)
router.get('/:id', getBook);

router.use(validateToken);  

router.post('/', addBook)
router.post('/image' , upload,addImage)
router.put('/:id', editBook)
router.delete('/:id', deleteBook)

module.exports = router; 
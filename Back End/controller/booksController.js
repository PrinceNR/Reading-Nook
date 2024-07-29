const booksModel = require("../model/booksModel")
const asyncHandler = require("express-async-handler")

const getAllBooks = asyncHandler( async (req, res ) =>{
    try {
        const books = await booksModel.find({})
        res.json(books)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
});

const addBook = asyncHandler( async (req, res) => { 
    const Book = req.body
    try {
        const newBook = await booksModel.create(Book)
        res.status(201).json({message:"new Book added", newBook} )
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
})

const editBook = asyncHandler( async (req, res) => {
    const Book =await booksModel.findById(req.params.id) 
    if (!Book) {
        return res.status(404).json({ message: "Book not found" })
    }

    const updatedBook = await contactModel.findByIdAndUpdate(req.params.id, req.body , { new: true })
    res.status(201).json({message: "Book updated" , Book: updatedBook})
})

const deleteBook = asyncHandler( async (req, res) => {

    const book = await booksModel.findById(req.params.id)
    if (!book) {
        return res.status(404).json({ message: "Book not found" })
    }

    const removingBook = await booksModel.findByIdAndDelete(req.params.id)
    res.json({ message: "Book removed", book: removingBook })

})

module.exports = { getAllBooks, addBook, editBook, deleteBook }  

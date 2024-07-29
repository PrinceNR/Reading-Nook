
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const mainURL = "http://localhost:4001/books/";


const initialState ={
    books: [],
    count : 0,
    status : "idle" 
}

export const getBooks = createAsyncThunk(
    "books/", 
    async () => {
        const response = await axios(`${mainURL}`)
        return response.data;
    }
)
export const addBook = createAsyncThunk(
    "book/add", 
    async (data) => {
        const response = await axios.post(`${mainURL}`, data)
        return response.data;
    })

export const deleteBook = createAsyncThunk(
    "book/delete", 
    async (id) => {
        const response = await axios.delete(`${mainURL}/${id}`,)
        return response.data;
    })
export const updateBook = createAsyncThunk(
    "book/update", 
    async (data) => {
        const response = await axios.put(`${mainURL}/${data.id}`, data)
        return response.data;
    })
    const bookSlice = createSlice({
        name: "books",
        initialState,
        extraReducers:(builder) => {
            builder
            .addCase(getBooks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = "success"
                console.log(action.payload);
                state.books = action.payload;
                state.count = action.payload.length
            })
            .addCase(getBooks.rejected, (state, action) => {
                state.status = 'error'
            })
            .addCase(addBook.fulfilled, (state, action) => {
                state.status = "success"
                state.books = [...state.books, action.payload]
                state.count = state.count + 1
            })
            .addCase(deleteBook.fulfilled, (state, action) => {
                state.status = "success"
                state.books = state.books.filter(book => book.id !== action.payload)
                state.count = state.count - 1
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.status = "success"
                state.books = state.books.map(book => book.id === action.payload.id? {...book, ...action.payload}:book )
                state.count = state.count 
            })
        }
    })
    export const {add, remove, update} = bookSlice.actions;
    export default bookSlice.reducer;   

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
const mainURL = "http://localhost:4001/books";

const initialState ={
    books: [],
    count : 0,
    admin: false,
    status : "idle" 
}
export const getBooks = createAsyncThunk(
    "books/", 

    async (data) => {
        console.log(data);
        const response = await axios(`${mainURL}?page=${data.page}&limit=${data.limit}&sort=${data.sort}&query=${data.query}`)
        return response.data;
    }
)
export const addBook = createAsyncThunk(
    "book/add", 
    async (data) => {
        const response = await axios.post(`${mainURL}`, data, {withCredentials: true})
        return response.data.Book;
    })

export const deleteBook = createAsyncThunk(
    "book/delete", 
    async (id) => {
        const response = await axios.delete(`${mainURL}/${id}`, {withCredentials: true})
        console.log(response.data);
        return response.data.book;
    })
export const updateBook = createAsyncThunk(
    "book/update", 
    async (data) => {
        console.log(" data", data);
        
        const response = await axios.put(`${mainURL}/${data.id}`, data.book, {withCredentials: true})
        
        return response.data.Book;
    })
    const bookSlice = createSlice({
        name: "books",
        initialState,
        reducers: {
            valid: (state, action) => {

                state.admin = true;
                  
            },
            removeValidate: (state, action)   => {
                state.admin = false;
            }
        },
        extraReducers:(builder) => {
            builder
            .addCase(getBooks.pending, (state, action) => {
                state.status = 'loading'
            })
            .addCase(getBooks.fulfilled, (state, action) => {
                state.status = "success"
                console.log(action.payload);
                state.books = action.payload.data;
                state.count = action.payload.totalCount[0].count
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
                state.books = state.books.filter(book => book._id !== action.payload._id);
                state.count = state.count - 1
            })
            .addCase(updateBook.fulfilled, (state, action) => {
                state.status = "success"
                state.books = state.books.map(book => book._id === action.payload._id? {...book, ...action.payload}:book )
                state.count = state.count 
            })
        }
    })
    export const {valid, removeValidate} = bookSlice.actions;
    export default bookSlice.reducer;   
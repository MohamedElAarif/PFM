import { configureStore } from "@reduxjs/toolkit";

import bookReducer from './slices/bookSlice'
import favoriteReducer from './slices/favoriteSlice'


export const store = configureStore({
    reducer:{
        books: bookReducer,
        favorite: favoriteReducer
    }
})


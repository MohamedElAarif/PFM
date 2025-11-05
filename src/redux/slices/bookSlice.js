import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  trending: [],
  classics: [],
  weLove: [],
  kids: [],
  romance: [],
  thrillers: [],
  status: 'idle',
  error: null
};

export const fetchTrendingBooks = createAsyncThunk('books/fetchTrending', async () => {
  const res = await axios.get('https://openlibrary.org/trending/daily.json');
  return res.data.works;
});

export const fetchClassicBooks = createAsyncThunk('books/fetchClassic', async () => {
  const res = await axios.get('https://openlibrary.org/subjects/classic.json?limit=10');
  return res.data.works;
});

export const fetchWeLoveBooks = createAsyncThunk('books/fetchWeLove', async () => {
  const res = await axios.get('https://openlibrary.org/subjects/love.json?limit=10');
  return res.data.works;
});

export const fetchKidsBooks = createAsyncThunk('books/fetchKids', async () => {
  const res = await axios.get('https://openlibrary.org/subjects/kids.json?limit=10');
  return res.data.works;
});

export const fetchRomanceBooks = createAsyncThunk('books/fetchRomance', async () => {
  const res = await axios.get('https://openlibrary.org/subjects/romance.json?limit=10');
  return res.data.works;
});

export const fetchThrillersBooks = createAsyncThunk('books/fetchThrillers', async () => {
  const res = await axios.get('https://openlibrary.org/subjects/thrillers.json?limit=10');
  return res.data.works;
});

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingBooks.fulfilled, (state, action) => {
        state.trending = action.payload;
      })
      .addCase(fetchClassicBooks.fulfilled, (state, action) => {
        state.classics = action.payload;
      })
      .addCase(fetchWeLoveBooks.fulfilled, (state, action) => {
        state.weLove = action.payload;
      })
      .addCase(fetchKidsBooks.fulfilled, (state, action) => {
        state.kids = action.payload;
      })
      .addCase(fetchRomanceBooks.fulfilled, (state, action) => {
        state.romance = action.payload;
      })
      .addCase(fetchThrillersBooks.fulfilled, (state, action) => {
        state.thrillers = action.payload;
      });
  }
});

export default bookSlice.reducer;

import { createSlice } from "@reduxjs/toolkit"



const initialState ={
    list: []
}


const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addToFavorite: (state, action) => {
      const exists = state.list.includes(action.payload);
      if (!exists) {
        state.list.push(action.payload);
      }
    },
    removeFromFavorite: (state, action) => {
      state.list = state.list.filter((work) => work !== action.payload);
    },
  },
})

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions
export default favoriteSlice.reducer

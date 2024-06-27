import { createSlice } from '@reduxjs/toolkit'


const initialState = {
   
    searchText : "",
    page : 0,
    limit : 30
  }

export const filterSlice = createSlice({
    name : "filterSearch",
    initialState ,
    reducers : {
        setSearchText :  (state, { payload }) => {
            state.searchText = payload.searchText;
          },
        setPage :  (state, { payload }) => {
            state.page = payload.page;
          },
        setLimit :  (state, { payload }) => {
            state.limit = payload.limit;
          },
    }
})

export const {setSearchText , setPage , setLimit} = filterSlice.actions
export default filterSlice.reducer


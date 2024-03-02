import { configureStore } from '@reduxjs/toolkit';
import createUserSlice from './slices/createUserSlice';
import createNoteSlice from './slices/createNoteSlice';
import searchTaskSlice from './slices/searchTaskSlice';


const store = configureStore({
    reducer:{
        createUser:createUserSlice,
        noteCreate:createNoteSlice,
        searchText:searchTaskSlice
    }
})

export default store;
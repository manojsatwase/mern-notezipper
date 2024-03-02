import { createSlice } from "@reduxjs/toolkit";

const createNoteSlice = createSlice({
  name: "createNoteList",
  initialState:{
    createnote:null
  },
  reducers: {
    createNote: (state, action) => {
      state.createnote = action.payload;
    }
  }
});

export const { createNote } = createNoteSlice.actions;
export default createNoteSlice.reducer;
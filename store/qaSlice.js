import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  query: "",
  answers: [], // { query, answer, images?, sources? }
  loading: false,
};

const qaSlice = createSlice({
  name: "qa",
  initialState,
  reducers: {
    setQuery(state, action) {
      state.query = action.payload;
    },
    appendAnswer(state, action) {
      state.answers.push(action.payload);
    },
    updateLastAnswer(state, action) {
      if (state.answers.length > 0) {
        state.answers[state.answers.length - 1].answer += action.payload;
      }
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    resetQA(state) {
      state.query = "";
      state.answers = [];
      state.loading = false;
    },
  },
});

export const {
  setQuery,
  appendAnswer,
  updateLastAnswer,
  setLoading,
  resetQA,
} = qaSlice.actions;

export default qaSlice.reducer;

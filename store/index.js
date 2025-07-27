import { configureStore } from "@reduxjs/toolkit";
import qaReducer from "./qaSlice";

const store = configureStore({
  reducer: {
    qa: qaReducer,
  },
});

export default store; 
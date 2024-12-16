import { configureStore } from "@reduxjs/toolkit";
import HomeMoviesSlice from "./movies_slice";


export const store = configureStore({
    reducer: {
        homeMovies: HomeMoviesSlice,
    }
})
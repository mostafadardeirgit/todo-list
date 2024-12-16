import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "./axios";

export const MoviesThunkAction = createAsyncThunk('getAllMovies', async () => {
    try {
        let res = await axiosInstance.get('movie/popular')
        return res.data.results;
    } catch (error) {
        return error;
    }
})

const HomeMoviesSlice = createSlice({
    name: 'homeMovies',
    initialState: { movies: [] },
    extraReducers: (builder) => {
        builder.addCase(MoviesThunkAction.fulfilled, (state, action) => {
            state.movies = action.payload;
        });
    },
})

export default HomeMoviesSlice.reducer;
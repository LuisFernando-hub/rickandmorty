import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Episodes } from '../types/episodes';
import { fetchEpisodesAPI } from '../api/episodesAPI';

interface EpisodesState {
    episodes: Episodes[];
    loading: boolean;
    error: string | null;
}

const INITIAL_STATE: EpisodesState = {
    episodes: [],
    loading: false,
    error: null,
};

export const fetchEpisodes = createAsyncThunk(
    'episodes/fetchEpisodes',
    async (_, { rejectWithValue }) => {
        try {
            const data = await fetchEpisodesAPI();
            return data;
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);



const episodesSlice = createSlice({
    name: 'episodes',
    initialState: INITIAL_STATE,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchEpisodes.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEpisodes.fulfilled, (state, action) => {
                state.loading = false;
                state.episodes = action.payload;
            })
            .addCase(fetchEpisodes.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { reducer: episodesReducer, actions } = episodesSlice;
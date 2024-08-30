import { configureStore } from '@reduxjs/toolkit'
import { charactersReducer } from './sliceCharacters';
import { episodesReducer } from './sliceEpisodes';


export const store = configureStore({
    reducer: {
        characters: charactersReducer,
        episodes: episodesReducer
    }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Characters } from '../types/characters';
import { fetchCharacterByIdAPI, fetchCharactersAPI } from '../api/charactersAPI';

interface CharactersState {
  characters: Characters[];
  selectedCharacter: Characters | null;
  selectedCharacterId: number | null;
  loading: boolean;
  error: string | null;
}

const INITIAL_STATE: CharactersState = {
  characters: [],
  selectedCharacter: null,
  selectedCharacterId: null,
  loading: false,
  error: null,
};

export const fetchCharacters = createAsyncThunk(
  'characters/fetchCharacters',
  async (_, { rejectWithValue }) => {
    try {
      const data = await fetchCharactersAPI();
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchCharacterById = createAsyncThunk(
  'characters/fetchCharacterById',
  async (id: number, { rejectWithValue }) => {
    try {
      const data = await fetchCharacterByIdAPI(id);
      return data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const charactersSlice = createSlice({
  name: 'characters',
  initialState: INITIAL_STATE,
  reducers: {
    setSelectedCharacterId(state, action) {
      state.selectedCharacterId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCharacters.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacters.fulfilled, (state, action) => {
        state.loading = false;
        state.characters = action.payload;
      })
      .addCase(fetchCharacters.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchCharacterById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCharacterById.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedCharacter = action.payload;
      })
      .addCase(fetchCharacterById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { reducer: charactersReducer, actions } = charactersSlice;
export const { setSelectedCharacterId } = actions;

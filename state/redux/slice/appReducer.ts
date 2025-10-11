

import getUsers from '@/state/actions/getUsers';
import { registrationSchema } from '@/state/schemas/schemas';
import { tableType } from '@/types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { z } from 'zod';

// Infer type from Zod schema


interface AppState {
  modalStatus: 'show' | 'hide';
  modalComponent: React.ElementType | null;
  users: tableType[];
  error?: string | null;
}

const initialState: AppState = {
  modalStatus: 'hide',
  modalComponent: null,
  users: [],
  error: null,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk<tableType[], void, { rejectValue: string }>(
  'app/fetchUsers',
  async (_, { rejectWithValue }) => {
    try {
      const users = await getUsers();
      return users as tableType[];
    } catch (error: any) {
      return rejectWithValue(error?.message || 'Failed to fetch users');
    }
  }
);

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    modalShow: (
      state,
      action: PayloadAction<{ component: React.ElementType | null }>
    ) => {
      state.modalStatus = 'show';
      state.modalComponent = action.payload.component;
    },
    modalHide: (state) => {
      state.modalStatus = 'hide';
      state.modalComponent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.users = [];
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.users = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default appSlice.reducer;
export const { modalHide, modalShow } = appSlice.actions;

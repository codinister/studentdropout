

import fetchApi from '@/state/query/fetchApi';
import { studentTableType, tableType } from '@/types/types';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';


// Infer type from Zod schema


interface AppState {
  modalStatus: 'show' | 'hide';
  modalComponent: React.ElementType | null;
  users: tableType[];
  students: studentTableType[];
  error?: any;
}

const initialState: AppState = {
  modalStatus: 'hide',
  modalComponent: null,
  users: [],
  students: [],
  error: null,
};

// Async thunk to fetch users
export const fetchUsers = createAsyncThunk(
  'app/fetchUsers',
  async () => {
    try {
      const users = await fetchApi({url: '/users/get-users'})

      return users.data || []
    } catch (error: any) {
      return error
    }
  }
);


export const fetchStudents = createAsyncThunk(
  'app/fetchStudents',
  async () => {
    try {
      const students = await fetchApi({url: '/students/get-students'})
      return students.data || []
    } catch (error: any) {
      return error.message
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
      })

      .addCase(fetchStudents.pending, (state) => {
        state.students = [];
        state.error = null;
      })
      .addCase(fetchStudents.fulfilled, (state, action) => {
        state.students = action.payload;
      })
      .addCase(fetchStudents.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })




  },
});

export default appSlice.reducer;
export const { modalHide, modalShow } = appSlice.actions;

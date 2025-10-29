
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchUsers,
  fetchStudents,
  fetchRole,
  fetchSubject,
  fetchDemographicinfo,
  fetchIntervention,
  fetchDropoutprediction,
  fetchSettings,
  fetchAttendancerecord,
  fetchAcademicrecord,
} from './asyncThunkFn';

import { AppState } from '@/types/types';

const initialState: AppState = {
  modalStatus: 'hide',
  modalComponent: null,
  users: [],
  students: [],
  role: [],
  subject: [],
  demographicinfo: [],
  intervention: [],
  dropoutprediction: [],
  settings: [],
  attendancerecord: [],
  academicrecord: [],
  error: null,
};

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

      .addCase(fetchAcademicrecord.pending, (state) => {
        state.academicrecord = [];
        state.error = null;
      })
      .addCase(fetchAcademicrecord.fulfilled, (state, action) => {
        state.academicrecord = action.payload;
      })
      .addCase(fetchAcademicrecord.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchAttendancerecord.pending, (state) => {
        state.attendancerecord = [];
        state.error = null;
      })
      .addCase(fetchAttendancerecord.fulfilled, (state, action) => {
        state.attendancerecord = action.payload;
      })
      .addCase(fetchAttendancerecord.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchSettings.pending, (state) => {
        state.settings = [];
        state.error = null;
      })
      .addCase(fetchSettings.fulfilled, (state, action) => {
        state.settings = action.payload;
      })
      .addCase(fetchSettings.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchDropoutprediction.pending, (state) => {
        state.dropoutprediction = [];
        state.error = null;
      })
      .addCase(fetchDropoutprediction.fulfilled, (state, action) => {
        state.dropoutprediction = action.payload;
      })
      .addCase(fetchDropoutprediction.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchIntervention.pending, (state) => {
        state.intervention = [];
        state.error = null;
      })
      .addCase(fetchIntervention.fulfilled, (state, action) => {
        state.intervention = action.payload;
      })
      .addCase(fetchIntervention.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchDemographicinfo.pending, (state) => {
        state.demographicinfo = [];
        state.error = null;
      })
      .addCase(fetchDemographicinfo.fulfilled, (state, action) => {
        state.demographicinfo = action.payload;
      })
      .addCase(fetchDemographicinfo.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchSubject.pending, (state) => {
        state.subject = [];
        state.error = null;
      })
      .addCase(fetchSubject.fulfilled, (state, action) => {
        state.subject = action.payload;
      })
      .addCase(fetchSubject.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      })

      .addCase(fetchRole.pending, (state) => {
        state.role = [];
        state.error = null;
      })
      .addCase(fetchRole.fulfilled, (state, action) => {
        state.role = action.payload;
      })
      .addCase(fetchRole.rejected, (state, action) => {
        state.error = action.payload || 'Something went wrong';
      });
  },
});

export default appSlice.reducer;
export const { modalHide, modalShow } = appSlice.actions;

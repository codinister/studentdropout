'use client';

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type initialStateType = {
  modalstatus: string;
  modalcomponent: React.ElementType | null
};

const initialState: initialStateType = {
  modalstatus: 'hide',
  modalcomponent: null
};

const appSlice = createSlice({
  name: 'appred',
  initialState,
  reducers: {
    modalShow(state, action: PayloadAction<{status: string; component: React.ElementType | null}>) {
      state.modalstatus = action.payload.status;
      state.modalcomponent = action.payload.component;
    },
    modalHide(state, action: PayloadAction<{status: string; component: React.ElementType | null}>) {
      state.modalstatus = action.payload.status;
      state.modalcomponent = action.payload.component;
    },
  },
});

export default appSlice.reducer;
export const {modalHide,modalShow} = appSlice.actions;

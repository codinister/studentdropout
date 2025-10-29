import fetchApi from "@/state/query/fetchApi";
import { createAsyncThunk } from "@reduxjs/toolkit";

const asyncThunk = (url: string, key: string) => {

   return createAsyncThunk(
  `app/${key}`,
  async () => {
    try {
      const result = await fetchApi({url})

      return result.data || []
    } catch (error: any) {
      return error
    }
  }
);


}

export default asyncThunk
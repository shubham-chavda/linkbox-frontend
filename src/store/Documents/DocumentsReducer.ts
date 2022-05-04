/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { IUser } from '../../types/User.interface';
import { Immutable, produce } from "immer"

// Define a type for the slice state
interface IGlobalState {
  documentList: any[];
  selectedDocumentInfo: any;
  showMoreDocs: boolean;
}

// Define the initial state using that type
export const initialState: Immutable<IGlobalState> = {

  documentList: [],
  showMoreDocs: false,
  selectedDocumentInfo: "",
};

export const DocumentsReducer = createSlice({
  name: 'global',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
   
    uploadDocument(state, action) { },
    getDocumentList(state, action) { },
    setDocumentList(state, action) {
      state.documentList = action.payload;
      if (action.payload.length === 10) {
        state.showMoreDocs = true;
      } else {
        state.showMoreDocs = false;
      }
    },
    setDocumentInfo(state, action) {
      // document/info
    },
   
  }
});

export const {

  uploadDocument,
  getDocumentList,
  setDocumentList,
  setDocumentInfo,
} = DocumentsReducer.actions

export default DocumentsReducer.reducer
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { Immutable } from "immer"

// Define a type for the slice state
interface IGlobalState {
  documentList: any[];
  showMoreDocs: boolean;
  selectedDocuments: any[];
}

// Define the initial state using that type
export const initialState: Immutable<IGlobalState> = {
  documentList: [],
  showMoreDocs: false,
  selectedDocuments: [],
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
    },
    setSelectedDocuments(state, action) {
      console.log("action.payload ------->", action.payload);
      state.selectedDocuments = [action.payload];
    },
  }
});

export const {
  uploadDocument,
  getDocumentList,
  setDocumentList,
  setDocumentInfo,
  setSelectedDocuments,
} = DocumentsReducer.actions;

export default DocumentsReducer.reducer
/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { Immutable } from "immer"

// Define a type for the slice state
interface IGlobalState {
  documentList: any[];
  showMoreDocs: boolean;
  selectedDocuments: any[];
  selectedDocumentInfo: any;
}

// Define the initial state using that type
export const initialState: Immutable<IGlobalState> = {
  documentList: [],
  showMoreDocs: false,
  selectedDocuments: [],
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
      state.documentList = [
        ...action.payload,
        ...state.documentList,
      ]
      if (action.payload.length === 10) {
        state.showMoreDocs = true;
      } else {
        state.showMoreDocs = false;
      }
    },
    getDocumentInfo(state, action) {
      console.log("action --------->", action);
    },
    setDocumentInfo(state, action) {
      state.selectedDocumentInfo = action.payload;
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
  getDocumentInfo,
  setSelectedDocuments,
} = DocumentsReducer.actions;

export default DocumentsReducer.reducer
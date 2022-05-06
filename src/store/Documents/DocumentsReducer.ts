/* eslint-disable @typescript-eslint/no-empty-function */
import { createSlice } from '@reduxjs/toolkit'
import { Immutable } from "immer";
import _ from "lodash";

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
  selectedDocumentInfo: null,
};

export const DocumentsReducer = createSlice({
  name: 'document',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    uploadDocument(state, action) { },
    getDocumentList(state, action) { },
    setDocumentList(state, action) {
      state.documentList = _.uniqBy([
        ...action.payload,
        ...state.documentList,
      ], 'uuid')
      state.showMoreDocs = action.payload.hasNextPage || false;
    },
    getDocumentInfo(state, action) {
    },
    setDocumentInfo(state, action) {
      state.selectedDocumentInfo = action.payload;
    },
    setSelectedDocuments(state, action) {
     state.selectedDocuments = [action.payload];
    },
    updateDocumentInfo(state, action) { }
  }
});

export const {
  uploadDocument,
  getDocumentList,
  setDocumentList,
  setDocumentInfo,
  getDocumentInfo,
  updateDocumentInfo,
  setSelectedDocuments,
} = DocumentsReducer.actions;

export default DocumentsReducer.reducer
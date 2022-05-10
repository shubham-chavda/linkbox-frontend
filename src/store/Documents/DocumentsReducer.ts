/* eslint-disable @typescript-eslint/no-empty-function */
import _ from "lodash";
import { Immutable } from "immer";
import { createSlice } from '@reduxjs/toolkit'

// Define a type for the slice state
interface IGlobalState {
  documentList: any[];
  showMoreDocs: boolean;
  showMoreSearchDocs: boolean;
  docInfoLoader: boolean;
  selectedDocuments: any[];
  selectedDocumentInfo: any;
  searchDocumentList: any[];
}

// Define the initial state using that type
export const initialState: Immutable<IGlobalState> = {
  documentList: [],
  showMoreDocs: false,
  selectedDocuments: [],
  selectedDocumentInfo: null,
  searchDocumentList: [],
  showMoreSearchDocs: false,
  docInfoLoader: false,
};

export const DocumentsReducer = createSlice({
  name: 'documents',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    uploadDocument(state, action) { },
    getDocumentList(state, action) { },
    setDocumentList(state, action) {
      const { data, meta } = action.payload;
      state.documentList = _.uniqBy([
        ...data,
        ...state.documentList,
      ], 'uuid');
      state.showMoreDocs = meta.hasNextPage || false;
    },
    setSearchDocumentList(state, action) {
      const { data, meta } = action.payload;
      state.searchDocumentList = _.uniqBy([
        ...data,
      ], 'uuid');
      state.showMoreSearchDocs = meta.hasNextPage || false;
    },
    getDocumentInfo(state, action) {
    },
    setDocumentInfo(state, action) {
      state.selectedDocumentInfo = action.payload;
    },
    setSelectedDocuments(state, action) {
      state.selectedDocuments = [action.payload];
    },
    updateDocumentInfo(state, action) { },
    toggleDocInfoLoader(state, action) {
      state.docInfoLoader = action.payload;
    },
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
  setSearchDocumentList,
  toggleDocInfoLoader,
} = DocumentsReducer.actions;

export default DocumentsReducer.reducer
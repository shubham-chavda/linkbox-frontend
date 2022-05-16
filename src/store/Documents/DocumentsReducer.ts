/* eslint-disable @typescript-eslint/no-empty-function */
import _ from 'lodash';
import { Immutable } from 'immer';
import { createSlice } from '@reduxjs/toolkit';

// Define a type for the slice state
interface IGlobalState {
	documentList: any[];
	showMoreDocs: boolean;
	showMoreSearchDocs: boolean;
	docInfoLoader: boolean;
	selectedDocuments: any[];
	selectedDocumentInfo: any;
	searchDocumentList: any[];
	tabPanes: Array<any>;
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
	tabPanes: []
};

export const DocumentsReducer = createSlice({
	name: 'documents',
	// `createSlice` will infer the state type from the `initialState` argument
	initialState,
	reducers: {
		uploadDocument(state, action) {},
		getDocumentList(state, action) {},
		setDocumentList(state, action) {
			const { data, meta } = action.payload;
			state.documentList = _.uniqBy([...data, ...state.documentList], 'uuid');
			state.showMoreDocs = meta.hasNextPage || false;
		},
		setSearchDocumentList(state, action) {
			const { data, meta } = action.payload;
			state.searchDocumentList = _.uniqBy([...data], 'uuid');
			state.showMoreSearchDocs = meta.hasNextPage || false;
		},
		getDocumentInfo(state, action) {},
		setDocumentInfo(state, action) {
			state.selectedDocumentInfo = action.payload;
		},
		setSelectedDocuments(state, action) {
			state.selectedDocuments = [action.payload];
		},
		updateDocumentInfo(state, action) {
			const data_one = [action.payload];
			const data_two = [...state.documentList];

			console.log('data_one', ...state.documentList);
			const data = [...state.documentList];
			for (const i in state.documentList) {
				if (state.documentList[i].uuid == action.payload.uuid) {
					state.documentList[i].name = action.payload.name;
					break;
				}
				console.log('data_one', JSON.stringify(state.documentList));
			}
		},
		toggleDocInfoLoader(state, action) {
			state.docInfoLoader = action.payload;
		},
		setTabPanes(state, action) {
			const isExist = state.tabPanes.find(
				item => item.key === action.payload[0].key
			);
			console.log(
				'🚀🚀🚀 ~ file: DocumentsReducer.ts ~ line 73 ~ setTabPanes ~ isExist',
				isExist
			);
			if (!isExist) {
				state.tabPanes.push(...action.payload);
				console.log(
					'🚀 ~ file: DocumentsReducer.ts ~ line 73 ~ setTabPanes ~ state.tabPanes',
					state.tabPanes,
					action.payload
				);
			}
		}
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
	setTabPanes
} = DocumentsReducer.actions;

export default DocumentsReducer.reducer;

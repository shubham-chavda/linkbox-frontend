import DocumentsReducer from './Documents/DocumentsReducer';
import { combineReducers } from '@reduxjs/toolkit';
import globalReducer from './global/globalReducer';

import { initialState as globalState } from './global/globalReducer';

export const initialState = {
	global: globalState
};

export const reducer = combineReducers({
	global: globalReducer,
	documents: DocumentsReducer,
});


import { configureStore,getDefaultMiddleware } from '@reduxjs/toolkit';

import createSagaMiddleware from 'redux-saga';

import logger from 'redux-logger';
import rootSaga from './saga';
import {reducer} from './reducer'


// const store = configureStore({
// 	reducer: {
// 		global: globalReducer
// 	}
// });
const sagaMiddleware = createSagaMiddleware();

// const reducer = combineReducers({
// 	global: globalReducer,
// });

const store = configureStore({
	reducer,
	middleware: [...getDefaultMiddleware({thunk:false,serializableCheck:false}),sagaMiddleware,logger]
})

sagaMiddleware.run(rootSaga);

export default store;

import { all, fork } from 'redux-saga/effects';
import DocumentsWatcher from './Documents/DocumentsSaga';

import globalWatcher from './global/globalSaga';

export default function* rootSaga() {
	yield all([fork(globalWatcher),fork(DocumentsWatcher)]);
}

import { all, fork } from 'redux-saga/effects';

import globalWatcher from './global/globalSaga';

export default function* rootSaga() {
	yield all([fork(globalWatcher)]);
}

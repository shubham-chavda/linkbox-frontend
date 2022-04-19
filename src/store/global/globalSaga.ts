import { notification } from 'antd';
import { takeLatest, all, call, put, StrictEffect } from 'redux-saga/effects';

import apis from '../../apis/index';
import history from '../../history';
import { getUserDetails, setUserDetails, toggleLoader,logOut, logInUser } from './globalReducer';

function* GetUser(): Generator<StrictEffect, void, any> {
	try {
		// if (!window.localStorage.refreshToken) {
		// 	// throw Error('refreshToken not Found');
		// } else
		{
			const response = yield call(apis.user.getUserData);
			const { status, data } = response;
			if (status === 200 && data) {
				yield put(setUserDetails(data));
			}
		}
	} catch (error) {
		console.error(error);
		history.navigate?.('/login', { replace: true });

		window.localStorage.clear();
	} finally {
		yield put(toggleLoader(false));
	}
}
type LoginUserType = {
	payload: { email: string; password: string };
} & SagaType;

function* LoginFunc(action: LoginUserType): Generator<StrictEffect, void, any> {
    const {payload} = action;
	try {
		
		yield put(toggleLoader(true));
		// if (payload.email !== 'root' || payload.password !== 'root') {
		// 	notification.error({
		// 		message: 'Invalid Credentials',
		// 		description: 'Please enter valid credentials'
		// 	});
		// 	throw Error('Invalid Credentials');
		// }
		// const response = yield call(apis.user.getUserData);
		// const { status, data } = response;
		// if (status === 200 && data) {
		// 	window.localStorage.setItem('token', data?.id || 'accessToken');
		// 	yield put(setUserDetails(data));
		// 	history.navigate?.('/', { replace: true });
		// }
		const response = yield call(apis.user.getUserData);
        console.log("🚀 ~ file: globalSaga.ts ~ line 53 ~ function*LoginFunc ~ response", response)
	} catch (error) {
		console.error(error);
		yield put(toggleLoader(false));
	} finally {
		yield put(toggleLoader(false));
	}
}

function LogOutUser(): void {
	window.localStorage.clear();
	window.location.reload();
}
export default function* globalWatcher(): Generator<StrictEffect, void, any> {
	yield all([
		yield takeLatest(logInUser.type, LoginFunc),
		yield takeLatest(getUserDetails.type, GetUser),
		yield takeLatest(logOut.type, LogOutUser)
	]);
}

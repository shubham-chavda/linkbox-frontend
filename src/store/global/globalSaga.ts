import { notification } from 'antd';
import { takeLatest, all, call, put, StrictEffect } from 'redux-saga/effects';
import init from '../../apis';


import history from '../../history';
import { getUserDetails, setUserDetails, toggleLoader, logOut, logInUser } from './globalReducer';

function* GetUser(): Generator<StrictEffect, void, any> {
	try {
		const apis = init();
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
	const { payload } = action;
	try {
		const apis = init();
		yield put(toggleLoader(true));
		const response = yield call(apis.user.login, payload);
		console.log("🚀 ~ file: globalSaga.ts ~ line 40 ~ function*LoginFunc ~ response", response)
		if (response?.user?.uuid) {
			window.localStorage.setItem('token', response?.token?.accessToken);
			yield put(setUserDetails(response?.user));
			history.navigate?.('/', { replace: true });
		}
	} catch (error) {
		console.log("🚀 ~ file: globalSaga.ts ~ line 48 ~ function*LoginFunc ~ error", error)
		notification.error({
			message: 'Invalid Credentials',
			description: 'Please enter valid credentials'
		});
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
		yield takeLatest(logOut.type, LogOutUser),
	]);
}

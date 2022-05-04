import { notification } from "antd";
import { all, call, put, StrictEffect, takeLatest } from "redux-saga/effects";
import init from "../../apis";
import {  toggleLoader } from "../global/globalReducer";
import { getDocumentList, setDocumentList, uploadDocument } from "./DocumentsReducer";

type GetDocumentsListType = {
	payload: { pageNo: number; sortBy: string };
} & SagaType;

function* GetDocumentsListFunc(action: GetDocumentsListType): Generator<StrictEffect, void, any> {
	const { payload } = action;
	try {
		const apis = init();
		yield put(toggleLoader(true));
		const response = yield call(apis.documents.getDocumentsList,payload);
		console.log("response ------->", response)
		if (response?.data?.data) {
			yield put(setDocumentList(response?.data?.data));
			// notification.success({
			// 	message: 'Documents list successsfully received',
			// });
		}
	} catch (error) {
		console.log("🚀 ~ file: globalSaga.ts ~ line 48 ~ function*LoginFunc ~ error", error)
		notification.error({
			message: 'Something went wrong',
			description: 'Documents list was not received'
		});
		yield put(toggleLoader(false));
	} finally {
		yield put(toggleLoader(false));
	}
}

type UploadDocumentType = {
	payload: { name: string; docfile: any };
} & SagaType;

function* UploadDocumentFunc(action: UploadDocumentType): Generator<StrictEffect, void, any> {
	const { payload } = action;
	try {
		const apis = init();
		yield put(toggleLoader(true));
		const response = yield call(apis.documents.uploadDocument, payload);
		console.log("response ------->", response)
		// if(response?.statusCode === 409) {
		// 	notification.success({
		// 		message: 'There is filename same ',
		// 	});
		// }
		if (response?.data?.docUrl) {
			// yield put(setUserDetails(response?.user));
			notification.success({
				message: 'Document Uploaded successsfully',
			});
		}
	} catch (error) {
		console.log("🚀 ~ file: globalSaga.ts ~ line 48 ~ function*LoginFunc ~ error", error)
		notification.error({
			message: 'Something went wrong',
			description: 'Please try again'
		});
		yield put(toggleLoader(false));
	} finally {
		yield put(toggleLoader(false));
	}
}
export default function* DocumentsWatcher(): Generator<StrictEffect, void, any> {
	yield all([
	
		yield takeLatest(uploadDocument.type, UploadDocumentFunc),
		yield takeLatest(getDocumentList.type, GetDocumentsListFunc),
		
	]);
}
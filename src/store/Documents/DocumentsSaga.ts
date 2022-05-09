import { notification } from "antd";
import { all, call, put, StrictEffect, takeLatest } from "redux-saga/effects";
import init from "../../apis";
import { toggleLoader } from "../global/globalReducer";
import { getDocumentInfo, getDocumentList, setDocumentInfo, setDocumentList, setSearchDocumentList, updateDocumentInfo, uploadDocument } from "./DocumentsReducer";

type GetDocumentsListType = {
	payload: { pageNo: number; sortBy: string, q?: string };
} & SagaType;

function* GetDocumentsListFunc(action: GetDocumentsListType): Generator<StrictEffect, void, any> {
	const { payload } = action;
	try {
		const apis = init();
		yield put(toggleLoader(true));
		let response: any = "";
		if (payload.q) {
			response = yield call(apis.documents.getDocumentsListBySearch, payload);
			console.log("🚀🚀🚀🚀 SEARCH ~~ response", response)
			if (response?.data?.data)
				yield put(setSearchDocumentList(response?.data));
		} else {
			response = yield call(apis.documents.getDocumentsList, payload);
			console.log("🚀🚀🚀🚀 NO SEARCH ~~ response", response)
			if (response?.data?.data)
				yield put(setDocumentList(response?.data));
		}
		console.log("response ------->", response)

		// notification.success({
		// 	message: 'Documents list successsfully received',
		// });

	} catch (error) {
		console.log("🚀 ~ file: globalSaga.ts ~ line 48 ~ function*LoginFunc ~ error", error)
		// notification.error({
		// 	message: 'Something went wrong',
		// 	description: 'Documents list was not received'
		// });
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
		if (response?.status === 200) {
			yield put(getDocumentList({ pageNo: 1, sortBy: "ASC" }));
			if (response?.data?.docUrl) {
				notification.success({
					message: 'Document Uploaded successsfully',
				});
			}
		} else {
			notification.info({
				message: response?.message,
				description: 'Please try again'
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

type GetDocumentInfoType = { payload: { uuid: string } } & SagaType;

function* GetDocumentInfoFunc(action: GetDocumentInfoType): Generator<StrictEffect, void, any> {
	const { payload } = action;
	try {
		const apis = init();
		yield put(toggleLoader(true));
		const response = yield call(apis.documents.getDocumentInfo, payload.uuid);
		console.log("response ------->", response)
		if (response?.status === 200) {
			if (response?.data?.docUrl) {
				yield put(setDocumentInfo(response?.data));
			}
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

type UpdateDocumentInfoType = {
	payload: {
		name: string,
		desc: string,
		isShareable: boolean,
		sendNotification: boolean
		uuid: string,
	},
} & SagaType;

function* UpdateDocumentInfoFunc(action: UpdateDocumentInfoType): Generator<StrictEffect, void, any> {
	const { payload } = action;
	try {
		const apis = init();
		yield put(toggleLoader(true));
		const response = yield call(apis.documents.updateDocumentInfo, payload);
		console.log("response ------->", response)
		if (response?.status === 200) {
			if (response?.data?.docUrl) {
				yield put(setDocumentInfo(response?.data));
				// notification.success({
				// 	message: 'Document updated successfully',
				// });
			}
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
		yield takeLatest(getDocumentInfo.type, GetDocumentInfoFunc),
		yield takeLatest(updateDocumentInfo.type, UpdateDocumentInfoFunc),

	]);
}
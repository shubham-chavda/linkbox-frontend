import axios from 'axios';
// axios.interceptors.request.use(
// 	(config) => {
// 		console.warn('config', config);
// 		return config;
// 	},
// 	(error) => {
// 		console.warn('error', error);
// 		return error;
// 	}
// );

const interceptorsHandler = async (
	error: any,
	_resolve: (value: unknown) => void,
	_reject: (reason?: unknown) => void
) => {
	console.log('errror from interseptor', { error });
	if (error && error?.response?.status === 401) {
		try {
			console.log("🚀🚀 401 401 401 ~ file: intercepter.ts ~ line 20 ~ error?.response", error?.response)

		} catch (err) {
			_reject(error);
			await window.localStorage.clear();
			// await document.cookie.remove();

		}
	}
};
axios.interceptors.response.use(
	(response) => response,
	async (error) =>
		new Promise((resolve, reject) => {
			interceptorsHandler(error, resolve, reject);
			console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀', error.response.data);
		})
);
export default axios;

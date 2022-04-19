// import axios from 'axios';
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

// const interceptorsHandler = async (
// 	error: Error,
// 	_resolve: (value: unknown) => void,
// 	// eslint-disable-next-line no-unused-vars
// 	_reject: (reason?: unknown) => void
// ) => {
// 	if (error) {
// 		console.log('errror from interseptor', { error });
// 	}
// };
// axios.interceptors.response.use(
// 	(response) => response,
// 	async (error) =>
// 		new Promise((resolve, reject) => {
// 			interceptorsHandler(error, resolve, reject);
// 			console.log('🚀🚀🚀🚀🚀🚀🚀🚀🚀', error.response.data);
// 		})
// );
// export default axios;

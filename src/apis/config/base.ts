import { AxiosRequestConfig } from 'axios';
import { Config } from './api.config';
import axios from './intercepter'
// axios.defaults.withCredentials = true
export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export default {
	init(opts: Config) {
		let baseUrl: URL;
		const token = window.localStorage.getItem('token');
		const accessToken = token ? 'Bearer '+ token : '';
		const cancelToken = opts.CancelTokenSrc?.token;
		// const header = ExtraHeaders || null;
		if (Object.hasOwnProperty.call(opts, 'baseUrl')) {
			({ baseUrl } = opts);
		} else {
			throw new Error('BaseURL not defined');
		}
		const defaultConfig: AxiosRequestConfig = {
			cancelToken,
			headers: {
				authorization:accessToken,
				Accept: 'application/json',
				'Content-Type': 'application/json',
				// 'Access-Control-Allow-Origin': baseUrl?.origin,
				'Access-Control-Allow-Credentials': 'true',
				// 'withCredentials':'true',
				
			}
		};

		return {
			request(
				url: string,
				method: Methods,
				queryParams: unknown,
				data: unknown,ExtraHeaders?:unknown
			) {
				if (!url) {
					throw new Error('Request - URL not defined');
				}

				if (!queryParams) {
					queryParams = {};
				}

				if (!data) {
					data = {};
				}

				url = baseUrl + url;

				switch (method) {
					case 'GET':
						return this.get(url, queryParams);

					case 'POST': {

						return this.post(url, queryParams, data,ExtraHeaders);
					}

					case 'PUT':
						return this.put(url, queryParams, data);

					case 'DELETE':
						return this.delete(url, queryParams);

					default:
						throw new Error('Request method not defined');
				}
			},
			get(url: string, queryParams: unknown) {
				url = baseUrl + url;

				const config: AxiosRequestConfig = {
					...defaultConfig,
					params: queryParams
				};

				return axios.get(url, config).catch((error) => {
					if (axios.isCancel(error)) {
						// console.log(error.message);
					} else {
						throw error;
					}
				});
			},
			post(url: string, queryParams: unknown, data: unknown,ExtraHeaders?:unknown) {
				url = baseUrl + url;

				const config: AxiosRequestConfig = {
					...defaultConfig,
					params: queryParams,
				};
				return axios.post(url, data, config).catch((error) => {
					if (axios.isCancel(error)) {
						// console.log(error.message);
					} else {
						throw error;
					}
				});
			},

			put(url: string, queryParams: unknown, data: unknown) {
				url = baseUrl + url;

				const config: AxiosRequestConfig = {
					...defaultConfig,
					params: queryParams
				};

				return axios.put(url, data, config).catch((error) => {
					if (axios.isCancel(error)) {
						// console.log(error.message);
					} else {
						throw error;
					}
				});
			},

			delete(url: string, queryParams: unknown) {
				url = baseUrl + url;

				const config: AxiosRequestConfig = {
					...defaultConfig,
					params: queryParams
				};

				return axios.delete(url, config).catch((error) => {
					if (axios.isCancel(error)) {
						// console.log(error.message);
					} else {
						throw error;
					}
				});
			},

			url() {
				return baseUrl;
			}
		};
	}
};

import axios, { AxiosRequestConfig } from 'axios';
import { Config } from './api.config';

export type Methods = 'GET' | 'POST' | 'PUT' | 'DELETE';
export default {
	init(opts: Config) {
		let baseUrl: URL;
		// const accessToken: string | null = null
		const cancelToken = opts.CancelTokenSrc?.token;

		if (Object.hasOwnProperty.call(opts, 'baseUrl')) {
			({ baseUrl } = opts);
		} else {
			throw new Error('BaseURL not defined');
		}
		const defaultConfig: AxiosRequestConfig = {
			cancelToken,
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': 'http://localhost:8080',
				'Access-Control-Allow-Credentials': 'true'
			}
		};

		return {
			request(
				url: string,
				method: Methods,
				queryParams: unknown,
				data: unknown
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
						return this.post(url, queryParams, data);
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
			post(url: string, queryParams: unknown, data: unknown) {
				url = baseUrl + url;

				const config: AxiosRequestConfig = {
					...defaultConfig,
					params: queryParams
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

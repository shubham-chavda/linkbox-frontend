/* eslint-disable no-unused-vars */
import { AxiosResponse } from 'axios';
import assign from 'lodash/assign';
import { Config } from './api.config';
import Base from './base';

export interface ISimpleInterface {
	list(
		url: string,
		filters?: string,
		page?: number,
		pageSize?: number
	): Promise<void | AxiosResponse<unknown, unknown>>;

	detail(
		url: string,
		filters?: unknown
	): Promise<void | AxiosResponse<unknown, unknown>>;

	create(
		url: string,
		data: unknown,
		queryParams?: unknown
	): Promise<void | AxiosResponse<unknown, unknown>>;

	post(
		url: string,
		data: unknown,
		queryParams?: unknown
	): Promise<void | AxiosResponse<unknown, unknown>>;

	edit(
		url: string,
		data: unknown,
		queryParams?: unknown
	): Promise<void | AxiosResponse<unknown, unknown>>;

	remove(
		url: string,
		queryParams: unknown
	): Promise<void | AxiosResponse<unknown, unknown>>;
}

export default {
	init(opts: Config): ISimpleInterface {
		const base = Base.init(opts);
		return {
			list(url, filters, page, pageSize) {
				if (!page) {
					page = 1;
				}

				if (!pageSize) {
					pageSize = 10;
				}

				const queryParams: {
					filters: null | string;
					page: number;
					pageSize: number;
				} = {
					filters: null,
					page,
					pageSize
				};
				if (filters) {
					queryParams.filters = filters;
				}
				return base.get(url, queryParams);
			},

			detail(url, filters) {
				if (!filters) {
					filters = {};
				}
				let queryParams = {};
				queryParams = assign(queryParams, filters);
				return base.get(url, queryParams);
			},

			post(url, data, queryParams) {
				return base.post(url, queryParams, data);
			},

			create(url, data, queryParams) {
				return base.post(url, queryParams, data);
			},

			edit(url, data, queryParams) {
				return base.put(url, queryParams, data);
			},

			remove(url, queryParams) {
				return base.delete(url, queryParams);
			}

			// customRequest(url, queryParams, contentType) {
			//   return base.customRequest(url, queryParams, contentType)
			// },
		};
	}
};

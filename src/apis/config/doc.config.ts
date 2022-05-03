import axios, { CancelTokenSource } from 'axios';

const { CancelToken } = axios;
const { DOC_URL } = process.env;

export const CANCEL_SOURCE: CancelTokenSource = CancelToken.source();

/**
 * The options used to configure the API.
 */
export interface Config {
  /**
   * The URL of the api.
   */
  baseUrl: URL;

  /**
   * Milliseconds before we timeout the request.
   */
  timeout?: number;
  /**
   * JWT token provided by the server.
   */
  accessToken?: string | null;
  /**
   * token to cancel any requests
   * CancelTokenSrc.cancel()
   */
  CancelTokenSrc?: CancelTokenSource;
}

/**
 * The default configuration for the app.
 */
export const DEFAULT_DOC_API_CONFIG: Config = {
  baseUrl: new URL(DOC_URL || 'http://localhost:3000'),
  timeout: 10000,
  CancelTokenSrc: CANCEL_SOURCE
};

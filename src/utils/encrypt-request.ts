import jwt from "jsonwebtoken";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";

import { encrypt } from "./encrypt-decrypt";
import { API_ENDPOINT } from "@/constants/api";
import { localStorageUtils } from "./storage";
import { isLocalDevelopment, SESSION_KEYS } from "@/constants/variable";

/**
 * HTTP method type
 */
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

/**
 * Request options type
 */
export interface RequestOptions {
    endpoint: string;
    method?: HttpMethod;
    data?: any;
    params?: Record<string, string | number | boolean> | null;
    signal?: AbortSignal | null;
    skipEncryption?: boolean;
    additionalHeaders?: Record<string, string>;
}

/**
 * Creates authorization headers with token if available
 * @returns {Record<string, string>} Headers object with authorization tokens
 */
const createAuthHeaders = (): Record<string, string> => {
    const token = localStorageUtils.get<string>(SESSION_KEYS.TOKEN);

    if (!token) {
        if (isLocalDevelopment) {
            console.warn("IKONZ CMS - createAuthHeaders - No JWT token found for API call");
        }
    }

    return {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
    };
};

/**
 * Token details interface
 */
export interface TokenDetails {
    orgId: string;
    userId: string;
    userEmail: string;
    userRole: string;
}

/**
 * Extracts user details from JWT token
 * @returns {TokenDetails} Object containing organization ID and name
 */
export const extractTokenDetails = (): TokenDetails => {
    const token = localStorageUtils.get<string>(SESSION_KEYS.ID_TOKEN);
    let userId = '';
    let userRole = '';
    let userEmail = '';
    let orgId = '';

    if (token) {
        try {
            const decoded = jwt.decode(token) as jwt.JwtPayload | null;
            if (decoded) {
                userId = decoded.sub?.toString() || '';
                orgId = decoded["custom:organization_id"]?.toString() || '';
                userEmail = decoded.email?.toString() || '';
                userRole = decoded["custom:role"]?.toString() || '';
            } else {
                if (isLocalDevelopment) {
                    console.warn("IKONZ CMS - extractTokenDetails - Unable to decode JWT token");
                }
            }
        } catch (error) {
            if (isLocalDevelopment) {
                console.error("IKONZ CMS - extractTokenDetails - Error decoding JWT token:", error);
            }
        }
    }

    return { orgId, userId, userEmail, userRole };
};

/**
 * Makes an encrypted request to the API
 * @param {RequestOptions} options - Request options
 * @returns {Promise<AxiosResponse>} API response
 * @throws {Error} If the API call fails
 */
export const makeRequest = async <T = any>({
    endpoint,
    method = 'GET',
    data = null,
    params = null,
    signal = null,
    skipEncryption = false,
    additionalHeaders = {}
}: RequestOptions): Promise<AxiosResponse<T>> => {
    try {
        const headers = {
            ...createAuthHeaders(),
            ...additionalHeaders
        };

        if (isLocalDevelopment) {
            console.log(`IKONZ CMS - makeRequest - ${method} ${endpoint}`);
            console.log("IKONZ CMS - makeRequest - Headers:", headers);
        }

        // Prepare request config
        const config: AxiosRequestConfig = {
            method: method as Method,
            url: `${API_ENDPOINT}${endpoint}`,
            headers,
            params
        };

        // Process request body for methods that support it
        if (data && ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
            if (skipEncryption) {
                config.data = data;
            } else {
                const encryptedData = encrypt(typeof data === 'string' ? data : JSON.stringify(data));

                if (isLocalDevelopment) {
                    console.log("IKONZ CMS - makeRequest - Encrypted Data:", encryptedData);
                }

                config.data = { encData: encryptedData };
            }
        }

        // Add abort signal if provided
        if (signal) {
            config.signal = signal;
        }

        // Make the request
        const response = await axios<T>(config);

        if (isLocalDevelopment) {
            console.log(`IKONZ CMS - makeRequest - ${method} ${endpoint} - Response:`, response.status);
        }

        return response;
    } catch (error) {
        if (axios.isCancel(error)) {
            console.log(`Request to ${endpoint} was cancelled`);
        } else {
            if (isLocalDevelopment) {
                console.error(`IKONZ CMS - makeRequest - Error in API call to ${endpoint}:`, error);
            }
        }
        throw error;
    }
};

/**
 * Convenience function for GET requests
 */
export const get = <T = any>(
    endpoint: string,
    params?: Record<string, string | number | boolean>,
    options: Omit<RequestOptions, 'endpoint' | 'method' | 'params'> = {}
): Promise<AxiosResponse<T>> => {
    return makeRequest<T>({
        endpoint,
        method: 'GET',
        params,
        ...options
    });
};

/**
 * Convenience function for POST requests
 */
export const post = <T = any>(
    endpoint: string,
    data: any,
    options: Omit<RequestOptions, 'endpoint' | 'method' | 'data'> = {}
): Promise<AxiosResponse<T>> => {
    return makeRequest<T>({
        endpoint,
        method: 'POST',
        data,
        ...options
    });
};

/**
 * Convenience function for PUT requests
 */
export const put = <T = any>(
    endpoint: string,
    data: any,
    options: Omit<RequestOptions, 'endpoint' | 'method' | 'data'> = {}
): Promise<AxiosResponse<T>> => {
    return makeRequest<T>({
        endpoint,
        method: 'PUT',
        data,
        ...options
    });
};

/**
 * Convenience function for DELETE requests
 */
export const del = <T = any>(
    endpoint: string,
    data?: any,
    options: Omit<RequestOptions, 'endpoint' | 'method' | 'data'> = {}
): Promise<AxiosResponse<T>> => {
    return makeRequest<T>({
        endpoint,
        method: 'DELETE',
        data,
        ...options
    });
};
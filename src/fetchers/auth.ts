import { AxiosError, AxiosResponse } from "axios";

import {
    AuthError, LoginRequest, LoginResponse,
    LogoutResponse
} from "../models/auth";
import { post } from "@/utils/encrypt-request";

/**
 * Helper function to handle API requests with standardized error handling
 * @param apiCall - Function that performs the API request
 * @param errorMessage - Default error message if no specific message is available
 */
const handleApiCall = async <T>(
    apiCall: () => Promise<AxiosResponse<T>>,
    errorMessage: string
): Promise<T> => {
    try {
        const response = await apiCall();
        return response.data;
    } catch (error) {
        if (error instanceof AxiosError) {
            throw new AuthError(
                error.response?.data?.message || errorMessage,
                error.response?.status
            );
        }
        throw new AuthError(errorMessage);
    }
};

export const authApi = {
    login: (data: LoginRequest): Promise<LoginResponse> => {
        return handleApiCall(
            () => post<LoginResponse>("/auth/login", data),
            "Login failed"
        );
    },

    logout: () => {
        return handleApiCall(
            () => post<LogoutResponse>("/auth/logout", {}),
            "Logout failed"
        );
    }
};
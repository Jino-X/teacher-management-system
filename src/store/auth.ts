import { create } from "zustand";
import { persist } from "zustand/middleware";

import { localStorageUtils } from "@/utils/storage";
import { SESSION_KEYS } from "@/constants/variable";
import { authApi } from "@/fetchers/auth";
import { AuthError, AuthState, LoginRequest } from "@/models/auth";

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            access_token: null,
            isAuthenticated: false,
            isLoading: false,
            error: null,
            message: null,

            login: async (data: LoginRequest) => {
                try {
                    set({ isLoading: true, error: null });
                    const response = await authApi.login(data);

                    // Store auth tokens in local storage
                    const { access_token } = response;
                    localStorageUtils.set(SESSION_KEYS.TOKEN, access_token);

                    // Update state with authentication data
                    set({
                        access_token,
                        isAuthenticated: true,
                        isLoading: false,
                    });
                } catch (error) {
                    const authError = error instanceof AuthError
                        ? error
                        : new AuthError("Login failed");

                    set({
                        error: authError,
                        isLoading: false,
                    });
                    throw authError;
                }
            },

            logout: async () => {
                try {
                    const response = await authApi.logout();
                    // Clear auth tokens from local storage
                    if (response) {
                        localStorageUtils.remove(SESSION_KEYS.TOKEN);
                        set({
                            access_token: null,
                            isAuthenticated: false,
                            error: null,
                            message: null,
                            isLoading: false,
                        });
                    }
                } catch (error) {
                    const authError = error instanceof AuthError
                        ? error
                        : new AuthError("Logout failed");

                    set({
                        error: authError,
                        isLoading: false,
                    });
                    throw authError;
                }
            },

            clearError: () => {
                set({ error: null });
            },
        }),
        {
            name: "auth-storage",
            partialize: (state) => ({
                access_token: state.access_token,
                isAuthenticated: state.isAuthenticated,
                isLoading: state.isLoading,
                error: state.error,
                message: state.message,
            }),
        },
    ),
);

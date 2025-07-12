export interface LoginResponse {
    message: string;
    access_token: string;
}

export interface LogoutResponse {
    message: string;
}

export interface LoginRequest {
    email: string;
    password: string;
}

export class AuthError extends Error {
    constructor(
        message: string,
        public statusCode?: number,
    ) {
        super(message);
        this.name = "AuthError";
    }
}

export interface AuthState {
    access_token: string | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: AuthError | null;
    message: string | null;
    login: (data: LoginRequest) => Promise<void>;
    logout: () => void;
    clearError: () => void;
}
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import { useAuthStore } from "@/store/auth";
import { LoginRequest } from "@/models/auth";

export const useAuth = () => {
    const router = useRouter();
    const {
        login: storeLogin,
        logout,
        error,
        clearError,
    } = useAuthStore();

    const loginMutation = useMutation({
        mutationFn: async (data: LoginRequest) => {
            await storeLogin(data);
        },
        onSuccess: () => {
            router.push("/");
            toast.success("You have successfully logged in");
        },
        onError: (error) => {
            console.error("Login failed:", error);
        },
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            await logout();
        },
        onSuccess: () => {
            router.push("/login");
            toast.success("You have successfully logged out");
        },
        onError: (error) => {
            console.error("Logout failed:", error);
        },
    });

    return {
        login: loginMutation.mutate,
        logout: logoutMutation.mutate,
        isLoading: loginMutation.isPending || logoutMutation.isPending,
        error: error || loginMutation.error || logoutMutation.error,
        clearError,
    };
};

"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion, Variants } from "framer-motion";

import { useAuth } from "@/custom-hooks/useAuth";

const Icons = {
    Email: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    ),
    Lock: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
    ),
    Eye: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
            <circle cx="12" cy="12" r="3" />
        </svg>
    ),
    EyeOff: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
            <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
            <line x1="1" y1="1" x2="23" y2="23" />
        </svg>
    ),
    School: () => (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
            <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
            <path d="M6 12v5c0 2 2 3 6 3s6-1 6-3v-5" />
        </svg>
    ),
};

const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function LoginPage() {
    const router = useRouter();
    const { login, isLoading, error } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data: LoginFormData) => {
        try {
            await login({
                email: data.email,
                password: data.password,
            });
        } catch (error) {
            console.error("Login failed:", error);
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants: Variants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15,
            },
        },
    };

    const logoVariants: Variants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: {
                type: "spring" as const,
                stiffness: 100,
                delay: 0.2
            }
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-primary-dark/30 py-12 px-4 relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Abstract shapes */}
                <div className="absolute -top-32 -left-32 w-64 h-64 bg-primary/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -right-32 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-32 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>

                {/* Grid pattern overlay */}
                <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgMzBjMCAxNi41NjktMTMuNDMxIDMwLTMwIDMwQzEzLjQzMSA2MCAwIDQ2LjU2OSAwIDMwIDAgMTMuNDMxIDEzLjQzMSAwIDMwIDBjMTYuNTY5IDAgMzAgMTMuNDMxIDMwIDMweiIgc3Ryb2tlPSIjZmZmIiBzdHJva2Utd2lkdGg9Ii4xNSIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
            </div>

            {/* Content container */}
            <div className="w-full max-w-6xl flex flex-col md:flex-row items-center">
                {/* Left side - Branding/Info */}
                <motion.div
                    className="w-full md:w-1/2 mb-8 md:mb-0 p-8 text-white"
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <motion.div
                        className="mb-6"
                        variants={logoVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <div className="flex items-center gap-3 mb-4">
                            <div className="p-3 bg-primary rounded-xl">
                                <Icons.School />
                            </div>
                            <h1 className="text-3xl font-bold">TeacherMS</h1>
                        </div>
                        <div className="h-1 w-20 bg-secondary rounded-full"></div>
                    </motion.div>

                    <motion.h2
                        className="text-4xl font-bold mb-4"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        Welcome to the <br />
                        <span className="text-primary">Teacher Management System</span>
                    </motion.h2>

                    <motion.p
                        className="text-gray-300 mb-8 max-w-md"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 }}
                    >
                        A comprehensive platform for educational institutions to manage teachers, schedules, and academic resources efficiently.
                    </motion.p>

                    <motion.div
                        className="flex flex-wrap gap-6 mb-8"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.7 }}
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                </svg>
                            </div>
                            <span>Secure Access</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                </svg>
                            </div>
                            <span>Data Management</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span>Scheduling</span>
                        </div>
                    </motion.div>
                </motion.div>

                {/* Right side - Login form */}
                <motion.div
                    className="w-full md:w-1/2 max-w-md"
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="bg-white dark:bg-neutral-800 rounded-2xl shadow-xl overflow-hidden">
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <h2 className="text-2xl font-bold text-neutral-900 dark:text-white">Sign in to your account</h2>
                                <p className="text-neutral-600 dark:text-neutral-300 text-sm mt-2">
                                    Enter your credentials to access the dashboard
                                </p>
                            </div>

                            {/* Form */}
                            <motion.form
                                className="space-y-6"
                                onSubmit={handleSubmit(onSubmit)}
                                variants={containerVariants}
                                initial="hidden"
                                animate={mounted ? "visible" : "hidden"}
                            >
                                <motion.div variants={itemVariants}>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
                                    >
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary">
                                            <Icons.Email />
                                        </div>
                                        <input
                                            {...register("email")}
                                            id="email"
                                            type="email"
                                            autoComplete="email"
                                            className="input-field pl-10"
                                            placeholder="Your email address"
                                        />
                                    </div>
                                    {errors.email && (
                                        <p className="mt-1 text-sm text-accent-red">
                                            {errors.email.message}
                                        </p>
                                    )}
                                </motion.div>

                                <motion.div variants={itemVariants}>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-neutral-700 dark:text-neutral-200 mb-2"
                                    >
                                        Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-primary">
                                            <Icons.Lock />
                                        </div>
                                        <input
                                            {...register("password")}
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            autoComplete="current-password"
                                            className="input-field pl-10 pr-10"
                                            placeholder="Your password"
                                        />
                                        <button
                                            type="button"
                                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-500 hover:text-neutral-700 dark:hover:text-neutral-300 transition-colors"
                                            onClick={() => setShowPassword(!showPassword)}
                                        >
                                            {showPassword ? <Icons.EyeOff /> : <Icons.Eye />}
                                        </button>
                                    </div>
                                    {errors.password && (
                                        <p className="mt-1 text-sm text-accent-red">
                                            {errors.password.message}
                                        </p>
                                    )}
                                </motion.div>

                                {error && (
                                    <motion.div
                                        variants={itemVariants}
                                        className="text-accent-red text-sm p-3 rounded-lg border border-accent-red-light/20 bg-accent-red-light/10"
                                    >
                                        {error instanceof Error
                                            ? error.message
                                            : "An error occurred during login"}
                                    </motion.div>
                                )}

                                <motion.button
                                    variants={itemVariants}
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full py-3 rounded-lg bg-primary hover:bg-primary-dark text-white font-medium shadow-lg shadow-primary/20 transition-all duration-300 disabled:opacity-50 transform hover:-translate-y-1 active:translate-y-0"
                                >
                                    {isLoading ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Signing in...
                                        </span>
                                    ) : (
                                        "Sign in"
                                    )}
                                </motion.button>
                            </motion.form>
                        </div>

                        {/* Footer */}
                        <div className="bg-neutral-100 dark:bg-neutral-900 px-8 py-4 text-center">
                            <p className="text-xs text-neutral-500 dark:text-neutral-400">
                                © 2025 TeacherMS. All rights reserved.
                            </p>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
"use client";

import Link from "next/link";
import { Construction, Home, ArrowLeft } from "lucide-react";
import DashboardHeader from "@/components/dashboard/header";

export default function NotFound() {
    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex items-center justify-center h-[calc(100vh-4rem)]">
                <div className="max-w-2xl w-full mx-auto text-center px-4">
                    <div className="mb-8 flex justify-center">
                        <div className="p-4 bg-primary/10 dark:bg-primary/20 rounded-full">
                            <Construction className="w-16 h-16 text-primary" />
                        </div>
                    </div>

                    <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-4">
                        Page Under Construction
                    </h1>

                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-2">
                        We're still working on this section of the Teacher Management System.
                    </p>

                    <p className="text-md text-gray-500 dark:text-gray-400 mb-8">
                        This feature will be available soon. Thank you for your patience as we continue to enhance your experience.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                        >
                            <Home size={18} />
                            Back to Dashboard
                        </Link>

                        <button
                            onClick={() => window.history.back()}
                            className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 rounded-lg transition-colors"
                        >
                            <ArrowLeft size={18} />
                            Go Back
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
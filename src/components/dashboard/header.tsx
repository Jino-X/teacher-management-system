import Link from "next/link";
import { LogOut, School } from "lucide-react";

import { useAuth } from "@/custom-hooks/useAuth";

export default function DashboardHeader() {
    const { logout } = useAuth();

    return (
        <header className="bg-white dark:bg-gray-800 shadow-sm py-4 px-6 flex items-center justify-between">
            <div className="flex items-center gap-2">
                <div className="p-2 bg-primary rounded-lg">
                    <School className="text-white" size={22} />
                </div>
                <Link href="/" className="text-xl font-bold text-gray-800 dark:text-white">
                    TeacherMS
                </Link>
            </div>

            <div className="flex items-center gap-4">
                <button
                    onClick={() => logout()}
                    className="flex items-center gap-2 text-md font-semibold text-gray-600 dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors"
                >
                    <LogOut size={18} />
                    Logout
                </button>
            </div>
        </header>
    );
}
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
    Home,
    Users,
    BookOpen,
    Calendar,
    ClipboardList,
    Clock,
    GraduationCap,
    BarChart3,
    Settings,
    Menu,
    X
} from "lucide-react";

interface NavItemProps {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    onClick?: () => void;
}

function NavItem({ href, icon, label, active, onClick }: NavItemProps) {
    return (
        <Link
            href={href}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${active
                ? "bg-primary text-white"
                : "text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                }`}
            onClick={onClick}
        >
            <span className="text-current">{icon}</span>
            <span className="text-sm font-medium">{label}</span>
        </Link>
    );
}

export default function DashboardNav() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { href: "/", icon: <Home size={18} />, label: "Dashboard" },
        { href: "/teachers", icon: <Users size={18} />, label: "Teachers" },
        { href: "/subjects", icon: <BookOpen size={18} />, label: "Subjects" },
        { href: "/classes", icon: <GraduationCap size={18} />, label: "Classes" },
        { href: "/schedule", icon: <Calendar size={18} />, label: "Schedule" },
        { href: "/attendance", icon: <Clock size={18} />, label: "Attendance" },
        { href: "/assignments", icon: <ClipboardList size={18} />, label: "Assignments" },
        { href: "/performance", icon: <BarChart3 size={18} />, label: "Performance" },
    ];

    return (
        <>
            {/* Mobile menu button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white dark:bg-gray-800 shadow-md text-gray-600 dark:text-gray-300"
                onClick={toggleMenu}
            >
                {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Sidebar navigation */}
            <nav
                className={`fixed lg:static w-64 h-[calc(100vh-4rem)] z-40 bg-white dark:bg-gray-800 shadow-sm transform transition-transform duration-200 ease-in-out ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                    }`}
            >
                <div className="p-6 flex flex-col justify-between h-full">
                    <div className="space-y-1">
                        {navItems.map((item) => (
                            <NavItem
                                key={item.href}
                                href={item.href}
                                icon={item.icon}
                                label={item.label}
                                active={pathname === item.href}
                                onClick={() => setIsOpen(false)}
                            />
                        ))}
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                        <NavItem
                            href="/settings"
                            icon={<Settings size={18} />}
                            label="Settings"
                            active={pathname === "/settings"}
                            onClick={() => setIsOpen(false)}
                        />
                    </div>
                </div>
            </nav>

            {/* Spacer for mobile layout */}
            <div className="hidden lg:block w-64 lg:w-auto flex-shrink-0"></div>
        </>
    );
}
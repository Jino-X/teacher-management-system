import Link from "next/link";
import {
    UserPlus,
    Calendar,
    Clock,
    BookOpen,
    GraduationCap,
    FileText
} from "lucide-react";

interface QuickActionProps {
    icon: React.ReactNode;
    label: string;
    href: string;
    color: string;
}

function QuickAction({ icon, label, href, color }: QuickActionProps) {
    return (
        <Link
            href={href}
            className="flex flex-col items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
        >
            <div className={`p-2 rounded-lg ${color} mb-2`}>
                {icon}
            </div>
            <span className="text-xs text-gray-600 dark:text-gray-300 text-center">
                {label}
            </span>
        </Link>
    );
}

export default function QuickActions() {
    const actions = [
        {
            icon: <UserPlus size={18} className="text-white" />,
            label: "Add Teacher",
            href: "/teachers/add",
            color: "bg-primary"
        },
        {
            icon: <Calendar size={18} className="text-white" />,
            label: "Schedule",
            href: "/schedule",
            color: "bg-secondary"
        },
        {
            icon: <Clock size={18} className="text-white" />,
            label: "Attendance",
            href: "/attendance",
            color: "bg-primary-dark"
        },
        {
            icon: <BookOpen size={18} className="text-white" />,
            label: "Subjects",
            href: "/subjects",
            color: "bg-primary-light"
        },
        {
            icon: <GraduationCap size={18} className="text-white" />,
            label: "Classes",
            href: "/classes",
            color: "bg-secondary-light"
        },
        {
            icon: <FileText size={18} className="text-white" />,
            label: "Reports",
            href: "/reports",
            color: "bg-secondary-dark"
        }
    ];

    return (
        <div className="grid grid-cols-3 gap-2">
            {actions.map((action, index) => (
                <QuickAction
                    key={index}
                    icon={action.icon}
                    label={action.label}
                    href={action.href}
                    color={action.color}
                />
            ))}
        </div>
    );
}
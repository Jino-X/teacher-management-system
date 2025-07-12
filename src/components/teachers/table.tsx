import { useState } from "react";
import { MoreHorizontal, Eye, Edit, Trash2, ArrowUp, ArrowDown } from "lucide-react";

export interface Teacher {
    id: string;
    name: string;
    email: string;
    subject: string;
    class: string;
    phone: string;
    address?: string;
    status?: 'active' | 'inactive' | 'leave';
    joinDate?: string;
    experience?: string;
}

interface TeacherTableProps {
    teachers: Teacher[];
    selectable?: boolean;
    selectedTeachers?: string[];
    onSelectTeacher?: (id: string) => void;
    onSelectAll?: () => void;
    sortField?: string;
    sortDirection?: 'asc' | 'desc';
    onSort?: (field: string) => void;
}

export default function TeacherTable({
    teachers,
    selectable = false,
    selectedTeachers = [],
    onSelectTeacher = () => { },
    onSelectAll = () => { },
    sortField = "",
    sortDirection = "asc",
    onSort = () => { }
}: TeacherTableProps) {
    const [openMenu, setOpenMenu] = useState<string | null>(null);

    const handleMenuToggle = (teacherId: string) => {
        setOpenMenu(openMenu === teacherId ? null : teacherId);
    };

    const handleActionClick = (action: string, teacherId: string) => {
        console.log(`${action} action for teacher ${teacherId}`);
        setOpenMenu(null);
    };

    // Check if all visible teachers are selected
    const allSelected = teachers.length > 0 && teachers.every(teacher =>
        selectedTeachers.includes(teacher.id)
    );

    // Render sort indicator
    const renderSortIndicator = (field: string) => {
        if (sortField !== field) return null;
        return sortDirection === 'asc'
            ? <ArrowUp className="ml-1 inline-block" size={14} />
            : <ArrowDown className="ml-1 inline-block" size={14} />;
    };

    // Status badge styling
    const getStatusBadge = (status?: string) => {
        if (!status) return null;

        const badgeStyles = {
            active: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
            inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
            leave: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
        };

        const badgeStyle = badgeStyles[status as keyof typeof badgeStyles] || badgeStyles.inactive;

        return (
            <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeStyle}`}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </span>
        );
    };

    // Generate column header
    const renderColumnHeader = (label: string, field: string) => {
        return (
            <th
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider ${!!onSort ? 'cursor-pointer select-none' : ''}`}
                onClick={() => onSort(field)}
            >
                <div className="flex items-center">
                    {label}
                    {renderSortIndicator(field)}
                </div>
            </th>
        );
    };

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                    <tr>
                        {selectable && (
                            <th className="pl-6 pr-3 py-3">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                                        checked={allSelected}
                                        onChange={onSelectAll}
                                    />
                                </div>
                            </th>
                        )}
                        {renderColumnHeader("ID", "id")}
                        {renderColumnHeader("Name", "name")}
                        {renderColumnHeader("Subject", "subject")}
                        {renderColumnHeader("Class", "class")}
                        {selectable && renderColumnHeader("Email", "email")}
                        {renderColumnHeader("Phone", "phone")}
                        {selectable && teachers[0]?.status && renderColumnHeader("Status", "status")}
                        {selectable && teachers[0]?.experience && renderColumnHeader("Experience", "experience")}
                        <th className="px-6 py-3">
                            <span className="sr-only">Actions</span>
                        </th>
                    </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                    {teachers.map((teacher) => (
                        <tr
                            key={teacher.id}
                            className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                        >
                            {selectable && (
                                <td className="pl-6 pr-3 py-4 whitespace-nowrap">
                                    <div className="flex items-center">
                                        <input
                                            type="checkbox"
                                            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 dark:border-gray-600 rounded"
                                            checked={selectedTeachers.includes(teacher.id)}
                                            onChange={() => onSelectTeacher(teacher.id)}
                                        />
                                    </div>
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 dark:text-gray-300">
                                {teacher.id}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="text-sm font-medium text-gray-900 dark:text-white">{teacher.name}</div>
                                {selectable && !teacher.status && (
                                    <div className="text-xs text-gray-500 dark:text-gray-400">{teacher.email}</div>
                                )}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {teacher.subject}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {teacher.class}
                            </td>
                            {selectable && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    <a href={`mailto:${teacher.email}`} className="text-primary hover:text-primary-dark">
                                        {teacher.email}
                                    </a>
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                {teacher.phone}
                            </td>
                            {selectable && teacher.status && (
                                <td className="px-6 py-4 whitespace-nowrap">
                                    {getStatusBadge(teacher.status)}
                                </td>
                            )}
                            {selectable && teacher.experience && (
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                                    {teacher.experience}
                                </td>
                            )}
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                <div className="relative">
                                    <button
                                        className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
                                        onClick={() => handleMenuToggle(teacher.id)}
                                    >
                                        <MoreHorizontal size={18} />
                                    </button>
                                    {openMenu === teacher.id && (
                                        <div className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white dark:bg-gray-750 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                            <div className="py-1">
                                                <button
                                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => handleActionClick('view', teacher.id)}
                                                >
                                                    <Eye className="mr-3" size={16} />
                                                    View Details
                                                </button>
                                                <button
                                                    className="flex w-full items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                                                    onClick={() => handleActionClick('edit', teacher.id)}
                                                >
                                                    <Edit className="mr-3" size={16} />
                                                    Edit
                                                </button>
                                                <button
                                                    className="flex w-full items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                                                    onClick={() => handleActionClick('delete', teacher.id)}
                                                >
                                                    <Trash2 className="mr-3" size={16} />
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {teachers.length === 0 && (
                <div className="text-center py-10">
                    <p className="text-gray-500 dark:text-gray-400">No teachers found</p>
                </div>
            )}
        </div>
    );
}
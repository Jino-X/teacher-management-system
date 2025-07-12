"use client";

import { useState } from "react";
import Link from "next/link";
import {
    GraduationCap,
    Users,
    BookOpen,
    Search,
    Filter,
    Plus,
    Edit,
    Trash2,
    MoreVertical,
    Clock
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/header";
import DashboardNav from "../../components/dashboard/nav";
import StatCard from "../../components/dashboard/stat-card";
import { getCurrentDate } from "@/utils/helper";
import { classesData, upcomingClassesData } from "@/constants/variable";

interface ClassDropdownProps {
    classId: string;
}

function ClassActionDropdown({ classId }: ClassDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="relative">
            <button
                onClick={toggleDropdown}
                className="p-1.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
                <MoreVertical size={16} className="text-gray-500 dark:text-gray-400" />
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    ></div>
                    <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20 py-1 border border-gray-200 dark:border-gray-700">
                        <Link
                            href={`/classes/${classId}/view`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Users size={14} />
                            <span>View Students</span>
                        </Link>
                        <Link
                            href={`/classes/${classId}/edit`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Edit size={14} />
                            <span>Edit Class</span>
                        </Link>
                        <Link
                            href={`/classes/${classId}/timetable`}
                            className="flex items-center gap-2 px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                            <Clock size={14} />
                            <span>Timetable</span>
                        </Link>
                        <button
                            className="flex w-full items-center gap-2 px-4 py-2 text-sm text-red-500 hover:bg-gray-100 dark:hover:bg-gray-700"
                            onClick={(e) => {
                                e.stopPropagation();
                                // Add delete confirmation logic here
                                setIsOpen(false);
                            }}
                        >
                            <Trash2 size={14} />
                            <span>Delete</span>
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

interface SubjectBadgeProps {
    subject: string;
}

function SubjectBadge({ subject }: SubjectBadgeProps) {
    // Different colors for different subjects
    const getSubjectColor = (subject: string) => {
        const colors = {
            "Mathematics": "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
            "English": "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
            "Science": "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
            "History": "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
            "Geography": "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
            "Physics": "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
            "Chemistry": "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-200",
            "Biology": "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-200",
            "Art": "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200",
            "Music": "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200",
            "Physical Education": "bg-lime-100 text-lime-800 dark:bg-lime-900 dark:text-lime-200",
        };

        return colors[subject as keyof typeof colors] || "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    };

    return (
        <span className={`text-xs px-2 py-1 rounded-full ${getSubjectColor(subject)}`}>
            {subject}
        </span>
    );
}

export default function ClassesPage() {
    const [searchQuery, setSearchQuery] = useState("");

    // Filter classes based on search query
    const filteredClasses = classesData.filter(cls =>
        cls.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.classTeacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
        cls.room.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex">
                <DashboardNav />

                <main className="w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Classes</h1>
                        <div className="flex items-center gap-2">
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                                    A
                                </div>
                                <span className="text-sm font-medium dark:text-white">Admin</span>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <StatCard
                            title="Total Classes"
                            value={classesData.length.toString()}
                            trend="+1"
                            trendLabel="from last month"
                            icon={<GraduationCap className="text-primary" />}
                        />
                        <StatCard
                            title="Total Students"
                            value={classesData.reduce((total, cls) => total + cls.students, 0).toString()}
                            trend="+12"
                            trendLabel="from last month"
                            icon={<Users className="text-secondary" />}
                        />
                        <StatCard
                            title="Subjects Taught"
                            value="12"
                            trend="+2"
                            trendLabel="from last month"
                            icon={<BookOpen className="text-success" />}
                        />
                    </div>

                    {/* Classes Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-8">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">All Classes</h2>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search classes..."
                                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm">
                                    <Filter size={16} />
                                    Filter
                                </button>
                                <Link href="/classes/add" className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors">
                                    <Plus size={16} />
                                    Add Class
                                </Link>
                            </div>
                        </div>

                        {/* Table */}
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead>
                                    <tr>
                                        <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Class Name
                                        </th>
                                        <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Students
                                        </th>
                                        <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Class Teacher
                                        </th>
                                        <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Room
                                        </th>
                                        <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Subjects
                                        </th>
                                        <th className="px-4 py-3 bg-gray-50 dark:bg-gray-800 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredClasses.map((cls) => (
                                        <tr
                                            key={cls.id}
                                            className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                        >
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {cls.id}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                                                {cls.name}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {cls.students}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {cls.classTeacher}
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                                {cls.room}
                                            </td>
                                            <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                <div className="flex flex-wrap gap-1.5 max-w-xs">
                                                    {cls.subjects.slice(0, 3).map((subject, index) => (
                                                        <SubjectBadge key={`${cls.id}-${index}`} subject={subject} />
                                                    ))}
                                                    {cls.subjects.length > 3 && (
                                                        <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300">
                                                            +{cls.subjects.length - 3} more
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400 text-right">
                                                <ClassActionDropdown classId={cls.id} />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {`Showing ${filteredClasses.length} of ${classesData.length} classes`}
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Previous
                                </button>
                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Page 1 of 1
                                </span>
                                <button
                                    className="px-3 py-1 rounded-md border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Today's Timetable */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Timetable</h2>
                            <div className="flex items-center text-gray-500 text-sm">
                                <Clock size={14} className="mr-1" />
                                <span>{getCurrentDate()}</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            {upcomingClassesData.map((session) => (
                                <div
                                    key={session.id}
                                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 flex justify-between items-center hover:shadow-md transition-shadow"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="p-3 rounded-full bg-primary/10 text-primary">
                                            <GraduationCap size={20} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-medium text-gray-800 dark:text-white">
                                                {`${session.class} - ${session.subject}`}
                                            </h3>
                                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                {`${session.teacher} • ${session.room}`}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="text-sm font-medium text-gray-500 dark:text-gray-400">
                                        {session.time}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-6 flex justify-center">
                            <Link href="/schedule" className="text-sm text-primary hover:text-primary-dark">
                                View Complete Timetable
                            </Link>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
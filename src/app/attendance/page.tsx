"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Calendar as CalendarIcon,
    Clock,
    CheckCircle2,
    XCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
    Download,
    BarChart3
} from "lucide-react";

import { getCurrentDate } from "@/utils/helper";
import DashboardHeader from "@/components/dashboard/header";
import DashboardNav from "@/components/dashboard/nav";
import StatCard from "@/components/dashboard/stat-card";
import { classData } from "@/constants/variable";

// Calendar days generation for current month
const generateCalendarDays = () => {
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);

    const days = [];

    // Add previous month days to fill the first week
    const firstDayOfWeek = firstDayOfMonth.getDay();
    for (let i = 0; i < firstDayOfWeek; i++) {
        const prevMonthDate = new Date(currentYear, currentMonth, -i);
        days.unshift({
            date: prevMonthDate.getDate(),
            month: 'prev',
            isToday: false
        });
    }

    // Add current month days
    for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
        const thisDate = new Date(currentYear, currentMonth, i);
        days.push({
            date: i,
            month: 'current',
            isToday: i === today.getDate(),
            dayOfWeek: daysOfWeek[thisDate.getDay()]
        });
    }

    return days;
};

const calendarDays = generateCalendarDays();

export default function AttendancePage() {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    // Filter classes based on search query and status
    const filteredClasses = classData.filter(cls =>
        (cls.className.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cls.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cls.teacher.toLowerCase().includes(searchQuery.toLowerCase())) &&
        (statusFilter === "all" || cls.status === statusFilter)
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex">
                <DashboardNav />

                <main className="w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Attendance</h1>
                        <div className="flex items-center gap-3">
                            <span className="text-sm text-gray-500 dark:text-gray-400">{getCurrentDate()}</span>
                            <button className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors">
                                <Download size={16} />
                                Export Report
                            </button>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Present Today"
                            value="103"
                            trend="+5"
                            trendLabel="from yesterday"
                            icon={<CheckCircle2 className="text-success" />}
                        />
                        <StatCard
                            title="Absent Today"
                            value="7"
                            trend="-2"
                            trendLabel="from yesterday"
                            icon={<XCircle className="text-error" />}
                        />
                        <StatCard
                            title="Attendance Rate"
                            value="93.6%"
                            trend="+1.2%"
                            trendLabel="from last week"
                            icon={<BarChart3 className="text-primary" />}
                        />
                        <StatCard
                            title="Pending Classes"
                            value="2"
                            trend="0"
                            trendLabel="remaining today"
                            icon={<Clock className="text-warning" />}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                        {/* Calendar */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-4">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white flex items-center gap-2">
                                    <CalendarIcon size={18} className="text-primary" />
                                    <span>July 2025</span>
                                </h2>
                                <div className="flex gap-2">
                                    <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <ChevronLeft size={18} className="text-gray-600 dark:text-gray-300" />
                                    </button>
                                    <button className="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700">
                                        <ChevronRight size={18} className="text-gray-600 dark:text-gray-300" />
                                    </button>
                                </div>
                            </div>

                            {/* Calendar grid */}
                            <div className="grid grid-cols-7 gap-1 mt-4">
                                {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day, index) => (
                                    <div key={index} className="h-8 flex items-center justify-center text-xs font-medium text-gray-500 dark:text-gray-400">
                                        {day}
                                    </div>
                                ))}

                                {calendarDays.map((day, index) => (
                                    <div
                                        key={index}
                                        className={`h-10 flex flex-col items-center justify-center rounded-lg cursor-pointer text-sm transition-colors ${day.isToday
                                            ? 'bg-primary text-white'
                                            : day.month === 'current'
                                                ? 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white'
                                                : 'text-gray-400 dark:text-gray-600'
                                            }`}
                                        onClick={() => day.month === 'current' && setSelectedDate(new Date(2025, 6, day.date))}
                                    >
                                        <span>{day.date}</span>
                                        {day.month === 'current' && (
                                            <span className={`w-1.5 h-1.5 rounded-full mt-0.5 ${day.isToday ? 'bg-white' : 'bg-primary'
                                                }`} style={{ display: [2, 5, 10, 15, 20].includes(day.date) ? 'block' : 'none' }}></span>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6">
                                <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Summary for Selected Date</h3>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Total Classes</span>
                                        <span className="font-medium text-gray-800 dark:text-white">6</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Completed</span>
                                        <span className="font-medium text-success">4</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Pending</span>
                                        <span className="font-medium text-warning">2</span>
                                    </div>
                                    <div className="flex justify-between items-center text-sm">
                                        <span className="text-gray-600 dark:text-gray-400">Attendance Rate</span>
                                        <span className="font-medium text-primary">93.6%</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Classes with attendance */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Class Attendance</h2>
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
                                    <select
                                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary text-gray-700 dark:text-white"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="completed">Completed</option>
                                        <option value="pending">Pending</option>
                                    </select>
                                </div>
                            </div>

                            {/* Classes list */}
                            <div className="space-y-4">
                                {filteredClasses.map((cls) => (
                                    <div key={cls.id} className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:border-primary dark:hover:border-primary transition-colors">
                                        <div className="flex justify-between items-start mb-3">
                                            <div>
                                                <h3 className="text-md font-medium text-gray-800 dark:text-white flex items-center gap-2">
                                                    Class {cls.className} - {cls.subject}
                                                    {cls.status === "completed" ? (
                                                        <CheckCircle2 size={16} className="text-success" />
                                                    ) : (
                                                        <Clock size={16} className="text-warning" />
                                                    )}
                                                </h3>
                                                <p className="text-sm text-gray-600 dark:text-gray-400">{cls.teacher} • {cls.time}</p>
                                            </div>
                                            {cls.status === "pending" ? (
                                                <Link
                                                    href={`/attendance/mark/${cls.id}`}
                                                    className="px-3 py-1.5 text-xs bg-primary hover:bg-primary-dark text-white rounded-lg transition-colors"
                                                >
                                                    Mark Attendance
                                                </Link>
                                            ) : (
                                                <Link
                                                    href={`/attendance/view/${cls.id}`}
                                                    className="px-3 py-1.5 text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors"
                                                >
                                                    View Details
                                                </Link>
                                            )}
                                        </div>

                                        {cls.status === "completed" && (
                                            <div className="flex items-center gap-4">
                                                <div className="flex items-center gap-1.5">
                                                    <CheckCircle2 size={14} className="text-success" />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">Present: {cls.present}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <XCircle size={14} className="text-error" />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">Absent: {cls.absent}</span>
                                                </div>
                                                <div className="flex items-center gap-1.5">
                                                    <AlertCircle size={14} className="text-primary" />
                                                    <span className="text-sm text-gray-700 dark:text-gray-300">
                                                        Rate: {Math.round((cls.present / cls.totalStudents) * 100)}%
                                                    </span>
                                                </div>
                                            </div>
                                        )}

                                        {cls.status === "pending" && (
                                            <div className="flex items-center">
                                                <Clock size={14} className="text-warning mr-1.5" />
                                                <span className="text-sm text-gray-600 dark:text-gray-400">
                                                    Attendance pending for {cls.totalStudents} students
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                ))}

                                {filteredClasses.length === 0 && (
                                    <div className="flex flex-col items-center justify-center py-10 text-center">
                                        <AlertCircle size={40} className="text-gray-400 mb-3" />
                                        <h3 className="text-lg font-medium text-gray-700 dark:text-gray-300">No Classes Found</h3>
                                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                                            Try changing your search criteria or filters
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
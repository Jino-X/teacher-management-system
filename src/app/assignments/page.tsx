"use client";

import { useState } from "react";
import Link from "next/link";
import {
    Search,
    Filter,
    Plus,
    CheckCircle,
    XCircle,
    Clock,
    FileText,
    CalendarClock,
    BookOpen,
    ClipboardList,
    Download
} from "lucide-react";

import { getCurrentDate } from "@/utils/helper";
import DashboardHeader from "@/components/dashboard/header";
import DashboardNav from "@/components/dashboard/nav";
import StatCard from "@/components/dashboard/stat-card";
import { assignmentsData } from "@/constants/variable";

// Define interface for Assignment data
export interface Assignment {
    id: string;
    title: string;
    subject: string;
    class: string;
    teacher: string;
    dueDate: string;
    assignedDate: string;
    status: "pending" | "submitted" | "graded" | "overdue";
    submissionCount: number;
    totalStudents: number;
}

// Status Badge component
function StatusBadge({ status }: { status: Assignment["status"] }) {
    const getStatusDetails = () => {
        switch (status) {
            case "pending":
                return {
                    bgColor: "bg-yellow-100 dark:bg-yellow-900/30",
                    textColor: "text-yellow-800 dark:text-yellow-300",
                    icon: <Clock size={14} className="text-yellow-500" />,
                    label: "Pending"
                };
            case "submitted":
                return {
                    bgColor: "bg-blue-100 dark:bg-blue-900/30",
                    textColor: "text-blue-800 dark:text-blue-300",
                    icon: <CheckCircle size={14} className="text-blue-500" />,
                    label: "Submitted"
                };
            case "graded":
                return {
                    bgColor: "bg-green-100 dark:bg-green-900/30",
                    textColor: "text-green-800 dark:text-green-300",
                    icon: <CheckCircle size={14} className="text-green-500" />,
                    label: "Graded"
                };
            case "overdue":
                return {
                    bgColor: "bg-red-100 dark:bg-red-900/30",
                    textColor: "text-red-800 dark:text-red-300",
                    icon: <XCircle size={14} className="text-red-500" />,
                    label: "Overdue"
                };
            default:
                return {
                    bgColor: "bg-gray-100 dark:bg-gray-800",
                    textColor: "text-gray-800 dark:text-gray-300",
                    icon: <Clock size={14} className="text-gray-500" />,
                    label: status
                };
        }
    };

    const { bgColor, textColor, icon, label } = getStatusDetails();

    return (
        <span className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${bgColor} ${textColor}`}>
            {icon}
            {label}
        </span>
    );
}

// Assignment Actions component
function AssignmentActions({ id }: { id: string }) {
    return (
        <div className="flex items-center gap-2">
            <button
                title="View Details"
                className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <FileText size={16} />
            </button>
            <button
                title="Download Submissions"
                className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <Download size={16} />
            </button>
            <Link
                href={`/assignments/grade/${id}`}
                title="Grade Assignment"
                className="p-1.5 text-gray-500 hover:text-primary transition-colors rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
            >
                <ClipboardList size={16} />
            </Link>
        </div>
    );
}

// Progress Bar component
function ProgressBar({ current, total }: { current: number; total: number }) {
    const percentage = Math.round((current / total) * 100);

    return (
        <div className="w-full">
            <div className="flex justify-between text-xs mb-1">
                <span className="text-gray-500 dark:text-gray-400">{`${current}/${total} submissions`}</span>
                <span className="font-medium">{`${percentage}%`}</span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}

export default function AssignmentsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState<Assignment["status"] | "all">("all");

    // Filter assignments based on search query and status
    const filteredAssignments = assignmentsData.filter(assignment => {
        const matchesSearch =
            assignment.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.teacher.toLowerCase().includes(searchQuery.toLowerCase()) ||
            assignment.class.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === "all" || assignment.status === statusFilter;

        return matchesSearch && matchesStatus;
    });

    // Calculate statistics
    const totalAssignments = assignmentsData.length;
    const pendingAssignments = assignmentsData.filter(a => a.status === "pending").length;
    const submittedAssignments = assignmentsData.filter(a => a.status === "submitted").length;
    const gradedAssignments = assignmentsData.filter(a => a.status === "graded").length;

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex">
                <DashboardNav />

                <main className="w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Assignments</h1>
                        <div className="flex items-center text-gray-500 text-sm">
                            <CalendarClock size={14} className="mr-1" />
                            <span>{getCurrentDate()}</span>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Total Assignments"
                            value={totalAssignments.toString()}
                            trend="+2"
                            trendLabel="from last week"
                            icon={<ClipboardList className="text-primary" />}
                        />
                        <StatCard
                            title="Pending"
                            value={pendingAssignments.toString()}
                            trend="+1"
                            trendLabel="from last week"
                            icon={<Clock className="text-yellow-500" />}
                        />
                        <StatCard
                            title="Submitted"
                            value={submittedAssignments.toString()}
                            trend="+3"
                            trendLabel="from last week"
                            icon={<CheckCircle className="text-blue-500" />}
                        />
                        <StatCard
                            title="Graded"
                            value={gradedAssignments.toString()}
                            trend="+2"
                            trendLabel="from last week"
                            icon={<FileText className="text-green-500" />}
                        />
                    </div>

                    {/* Assignment Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Assignment List</h2>
                            <div className="flex gap-2">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Search assignments..."
                                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                                <div className="relative">
                                    <select
                                        className="pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary appearance-none dark:text-white"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value as Assignment["status"] | "all")}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="pending">Pending</option>
                                        <option value="submitted">Submitted</option>
                                        <option value="graded">Graded</option>
                                        <option value="overdue">Overdue</option>
                                    </select>
                                    <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>
                                <Link
                                    href="/assignments/create"
                                    className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors"
                                >
                                    <Plus size={16} />
                                    New Assignment
                                </Link>
                            </div>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse">
                                <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50 dark:bg-gray-800/60">
                                    <tr>
                                        <th className="px-4 py-3 text-left">ID</th>
                                        <th className="px-4 py-3 text-left">Assignment</th>
                                        <th className="px-4 py-3 text-left">Class</th>
                                        <th className="px-4 py-3 text-left">Teacher</th>
                                        <th className="px-4 py-3 text-left">Due Date</th>
                                        <th className="px-4 py-3 text-left">Progress</th>
                                        <th className="px-4 py-3 text-left">Status</th>
                                        <th className="px-4 py-3 text-left">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                    {filteredAssignments.length > 0 ? (
                                        filteredAssignments.map((assignment) => (
                                            <tr
                                                key={assignment.id}
                                                className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-750"
                                            >
                                                <td className="px-4 py-4 text-sm font-medium text-gray-900 dark:text-white">
                                                    {assignment.id}
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white">
                                                            {assignment.title}
                                                        </p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                            <span className="inline-flex items-center">
                                                                <BookOpen size={12} className="mr-1" />
                                                                {assignment.subject}
                                                            </span>
                                                        </p>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    {assignment.class}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-500 dark:text-gray-400">
                                                    <div className="flex items-center gap-2">
                                                        <span className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs font-medium">
                                                            {assignment.teacher.split(' ').map(name => name[0]).join('')}
                                                        </span>
                                                        {assignment.teacher}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="text-sm text-gray-900 dark:text-white">
                                                        {assignment.dueDate}
                                                    </div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400">
                                                        Assigned: {assignment.assignedDate}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 w-48">
                                                    <ProgressBar
                                                        current={assignment.submissionCount}
                                                        total={assignment.totalStudents}
                                                    />
                                                </td>
                                                <td className="px-4 py-4">
                                                    <StatusBadge status={assignment.status} />
                                                </td>
                                                <td className="px-4 py-4">
                                                    <AssignmentActions id={assignment.id} />
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan={8} className="px-4 py-8 text-center text-gray-500 dark:text-gray-400">
                                                No assignments found matching your filters
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>

                        <div className="mt-4 flex justify-between items-center">
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {`Showing ${filteredAssignments.length} of ${assignmentsData.length} assignments`}
                            </p>
                            <div className="flex items-center gap-2">
                                <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                                    Previous
                                </button>
                                <button className="px-3 py-1 text-sm bg-primary text-white rounded-md hover:bg-primary-dark">
                                    1
                                </button>
                                <button className="px-3 py-1 text-sm border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 text-gray-600 dark:text-gray-300">
                                    Next
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
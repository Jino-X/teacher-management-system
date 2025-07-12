"use client";

import React, { useState } from "react";
import {
    Search,
    Filter,
    Plus,
    Download,
    Upload,
    RefreshCw,
    SlidersHorizontal,
    Trash2,
    MoveDown,
    ChevronDown,
    Mail
} from "lucide-react";

import DashboardHeader from "../../components/dashboard/header";
import DashboardNav from "../../components/dashboard/nav";
import TeacherTable, { Teacher } from "../../components/teachers/table";
import { teachersData } from "@/constants/variable";

export default function TeachersPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [subjectFilter, setSubjectFilter] = useState("all");
    const [selectedTeachers, setSelectedTeachers] = useState<string[]>([]);
    const [sortField, setSortField] = useState("name");
    const [sortDirection, setSortDirection] = useState("asc");
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(10);

    // Filter teachers based on search query and filters
    const filteredTeachers = teachersData
        .filter(teacher => {
            // Search filter
            const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                teacher.class.toLowerCase().includes(searchQuery.toLowerCase()) ||
                teacher.email.toLowerCase().includes(searchQuery.toLowerCase());

            // Status filter
            const matchesStatus = statusFilter === 'all' || teacher.status === statusFilter;

            // Subject filter
            const matchesSubject = subjectFilter === 'all' || teacher.subject === subjectFilter;

            return matchesSearch && matchesStatus && matchesSubject;
        })
        .sort((a, b) => {
            // Sort logic
            const fieldA = a[sortField as keyof typeof a];
            const fieldB = b[sortField as keyof typeof b];

            if (typeof fieldA === 'string' && typeof fieldB === 'string') {
                return sortDirection === 'asc'
                    ? fieldA.localeCompare(fieldB)
                    : fieldB.localeCompare(fieldA);
            }
            return 0;
        });

    // Get unique subjects for filter dropdown
    const subjects = [...new Set(teachersData.map(t => t.subject))];

    // Toggle teacher selection
    const toggleTeacherSelection = (teacherId: string) => {
        setSelectedTeachers(prev =>
            prev.includes(teacherId)
                ? prev.filter(id => id !== teacherId)
                : [...prev, teacherId]
        );
    };

    // Toggle all teachers selection
    const toggleAllSelection = () => {
        if (selectedTeachers.length === filteredTeachers.length) {
            setSelectedTeachers([]);
        } else {
            setSelectedTeachers(filteredTeachers.map(t => t.id));
        }
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredTeachers.length / limit);
    const paginatedTeachers = filteredTeachers.slice((page - 1) * limit, page * limit);

    const handleSort = (field: string) => {
        if (field === sortField) {
            setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex">
                <DashboardNav />

                <main className="w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
                    {/* Header */}
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Teachers Management</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Manage and view all teacher records</p>
                        </div>
                        <div className="flex gap-3">
                            <button className="flex items-center gap-2 px-4 py-2.5 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors">
                                <Plus size={16} />
                                Add New Teacher
                            </button>
                        </div>
                    </div>

                    {/* Filters and Actions */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-5 mb-6">
                        <div className="flex flex-col lg:flex-row justify-between gap-4 items-start lg:items-center">
                            <div className="flex flex-wrap gap-3 items-center">
                                {/* Search */}
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                                    <input
                                        type="text"
                                        placeholder="Search teachers..."
                                        className="pl-10 pr-4 py-2 w-full sm:w-64 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>

                                {/* Status Filter */}
                                <div className="relative">
                                    <select
                                        className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        value={statusFilter}
                                        onChange={(e) => setStatusFilter(e.target.value)}
                                    >
                                        <option value="all">All Status</option>
                                        <option value="active">Active</option>
                                        <option value="leave">On Leave</option>
                                        <option value="inactive">Inactive</option>
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>

                                {/* Subject Filter */}
                                <div className="relative">
                                    <select
                                        className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        value={subjectFilter}
                                        onChange={(e) => setSubjectFilter(e.target.value)}
                                    >
                                        <option value="all">All Subjects</option>
                                        {subjects.map(subject => (
                                            <option key={subject} value={subject}>{subject}</option>
                                        ))}
                                    </select>
                                    <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                </div>

                                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-650">
                                    <Filter size={16} />
                                    More Filters
                                </button>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-650">
                                    <Upload size={16} />
                                    Import
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-650">
                                    <Download size={16} />
                                    Export
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-650">
                                    <RefreshCw size={16} />
                                    Refresh
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-650">
                                    <SlidersHorizontal size={16} />
                                    Columns
                                </button>
                            </div>
                        </div>

                        {/* Batch actions - appears when items are selected */}
                        {selectedTeachers.length > 0 && (
                            <div className="mt-5 pt-4 border-t border-gray-200 dark:border-gray-700">
                                <div className="flex flex-wrap items-center justify-between gap-4">
                                    <span className="text-sm text-gray-600 dark:text-gray-300">
                                        {selectedTeachers.length} teachers selected
                                    </span>
                                    <div className="flex gap-3">
                                        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-650">
                                            <Mail size={16} />
                                            Email Selected
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-600 dark:text-gray-300 text-sm hover:bg-gray-50 dark:hover:bg-gray-650">
                                            <MoveDown size={16} />
                                            Change Status
                                        </button>
                                        <button className="flex items-center gap-2 px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg text-red-600 dark:text-red-400 text-sm hover:bg-red-50 dark:hover:bg-red-900/20">
                                            <Trash2 size={16} />
                                            Delete Selected
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Teacher Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
                        {/* Render the TeacherTable with extended data and functionality */}
                        <TeacherTable
                            teachers={paginatedTeachers as Teacher[]}
                            selectable
                            selectedTeachers={selectedTeachers}
                            onSelectTeacher={toggleTeacherSelection}
                            onSelectAll={toggleAllSelection}
                            onSort={handleSort}
                            sortField={sortField}
                            sortDirection={sortDirection as 'asc' | 'desc'}
                        />

                        {/* Pagination */}
                        <div className="px-6 py-4 border-t border-gray-200 dark:border-gray-700 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="flex items-center gap-2">
                                <span className="text-sm text-gray-500 dark:text-gray-400">Rows per page:</span>
                                <select
                                    className="bg-white dark:bg-gray-700 text-gray-800 dark:text-white text-sm rounded border border-gray-300 dark:border-gray-600 py-1 px-2"
                                    value={limit}
                                    onChange={(e) => {
                                        setLimit(parseInt(e.target.value));
                                        setPage(1);
                                    }}
                                >
                                    <option value={5}>5</option>
                                    <option value={10}>10</option>
                                    <option value={25}>25</option>
                                    <option value={50}>50</option>
                                </select>
                                <span className="text-sm text-gray-500 dark:text-gray-400 ml-4">
                                    {(page - 1) * limit + 1}-{Math.min(page * limit, filteredTeachers.length)} of {filteredTeachers.length} teachers
                                </span>
                            </div>

                            <div className="flex items-center gap-2">
                                <button
                                    className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                                    onClick={() => setPage(prev => Math.max(prev - 1, 1))}
                                    disabled={page === 1}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                    </svg>
                                </button>
                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(pageNum => pageNum === 1 || pageNum === totalPages || (pageNum >= page - 1 && pageNum <= page + 1))
                                    .map((pageNum, i, arr) => (
                                        <React.Fragment key={pageNum}>
                                            {i > 0 && arr[i - 1] !== pageNum - 1 && (
                                                <span className="text-gray-500 dark:text-gray-400">...</span>
                                            )}
                                            <button
                                                className={`w-8 h-8 flex items-center justify-center rounded-md text-sm ${pageNum === page
                                                    ? 'bg-primary text-white'
                                                    : 'border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-650'
                                                    }`}
                                                onClick={() => setPage(pageNum)}
                                            >
                                                {pageNum}
                                            </button>
                                        </React.Fragment>
                                    ))}
                                <button
                                    className="p-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 disabled:opacity-50"
                                    onClick={() => setPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={page === totalPages}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
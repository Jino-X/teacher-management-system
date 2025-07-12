"use client";

import { useState } from "react";
import Link from "next/link";
import { BookOpen, Search, Plus, Edit, Trash2, MoreHorizontal } from "lucide-react";

import DashboardHeader from "../../components/dashboard/header";
import DashboardNav from "../../components/dashboard/nav";
import { subjectsData } from "@/constants/variable";

export default function SubjectsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedDepartment, setSelectedDepartment] = useState("All");
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

    // Toggle dropdown menu
    const toggleDropdown = (id: string) => {
        setActiveDropdown(activeDropdown === id ? null : id);
    };

    // Filter subjects based on search query and department filter
    const filteredSubjects = subjectsData.filter(subject => {
        const matchesSearch =
            subject.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            subject.description.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesDepartment =
            selectedDepartment === "All" || subject.department === selectedDepartment;

        return matchesSearch && matchesDepartment;
    });

    // Get unique departments for filter dropdown
    const departments = ["All", ...Array.from(new Set(subjectsData.map(subject => subject.department)))];

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex">
                <DashboardNav />

                <main className="w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
                    <div className="mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Subjects</h1>
                        <p className="text-gray-600 dark:text-gray-300 mt-1">
                            Manage and organize all academic subjects
                        </p>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center">
                            <div className="p-3 rounded-full bg-primary-light/20 mr-4">
                                <BookOpen className="text-primary h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {subjectsData.length}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Total Subjects</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center">
                            <div className="p-3 rounded-full bg-secondary-light/20 mr-4">
                                <BookOpen className="text-secondary h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {departments.length - 1}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Departments</p>
                            </div>
                        </div>

                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 flex items-center">
                            <div className="p-3 rounded-full bg-success/20 mr-4">
                                <BookOpen className="text-success h-6 w-6" />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                                    {subjectsData.reduce((sum, subject) => sum + subject.classCount, 0)}
                                </h3>
                                <p className="text-gray-500 dark:text-gray-400 text-sm">Classes</p>
                            </div>
                        </div>
                    </div>

                    {/* Subjects Table */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">All Subjects</h2>
                                <div className="flex flex-col md:flex-row gap-3">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search subjects..."
                                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white w-full md:w-auto"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>

                                    <select
                                        className="px-3 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                        value={selectedDepartment}
                                        onChange={(e) => setSelectedDepartment(e.target.value)}
                                    >
                                        {departments.map((dept) => (
                                            <option key={dept} value={dept}>{dept}</option>
                                        ))}
                                    </select>

                                    <Link href="/subjects/add" className="flex items-center justify-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors">
                                        <Plus size={16} />
                                        Add Subject
                                    </Link>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead>
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Subject Code</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Department</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Teachers</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Classes</th>
                                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredSubjects.map((subject) => (
                                            <tr key={subject.id} className="hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-white">
                                                    {subject.code}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                                                    <div className="font-medium">{subject.name}</div>
                                                    <div className="text-xs text-gray-500 dark:text-gray-400 mt-1 max-w-xs truncate">{subject.description}</div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{subject.department}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{subject.teacherCount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">{subject.classCount}</td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                                                    <div className="relative inline-block text-left">
                                                        <button
                                                            className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300 focus:outline-none"
                                                            onClick={() => toggleDropdown(subject.id)}
                                                        >
                                                            <MoreHorizontal size={20} />
                                                        </button>

                                                        {activeDropdown === subject.id && (
                                                            <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white dark:bg-gray-700 ring-1 ring-black ring-opacity-5 z-10">
                                                                <div className="py-1">
                                                                    <button
                                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                                        onClick={() => {
                                                                            console.log(`View ${subject.name}`);
                                                                            setActiveDropdown(null);
                                                                        }}
                                                                    >
                                                                        <BookOpen size={16} className="mr-2" />
                                                                        View Details
                                                                    </button>
                                                                    <button
                                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                                        onClick={() => {
                                                                            console.log(`Edit ${subject.name}`);
                                                                            setActiveDropdown(null);
                                                                        }}
                                                                    >
                                                                        <Edit size={16} className="mr-2" />
                                                                        Edit
                                                                    </button>
                                                                    <button
                                                                        className="flex items-center w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-600"
                                                                        onClick={() => {
                                                                            console.log(`Delete ${subject.name}`);
                                                                            setActiveDropdown(null);
                                                                        }}
                                                                    >
                                                                        <Trash2 size={16} className="mr-2" />
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
                            </div>

                            {filteredSubjects.length === 0 && (
                                <div className="text-center py-10">
                                    <BookOpen className="h-12 w-12 mx-auto text-gray-400" />
                                    <h3 className="mt-2 text-sm font-medium text-gray-900 dark:text-white">No subjects found</h3>
                                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        {searchQuery || selectedDepartment !== "All"
                                            ? "Try adjusting your search or filter"
                                            : "Get started by creating a new subject."}
                                    </p>
                                    <div className="mt-6">
                                        <Link href="/subjects/add" className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary-dark focus:outline-none">
                                            <Plus className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                            New Subject
                                        </Link>
                                    </div>
                                </div>
                            )}

                            {filteredSubjects.length > 0 && (
                                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-200 dark:border-gray-700">
                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                        Showing <span className="font-medium">{filteredSubjects.length}</span> of <span className="font-medium">{subjectsData.length}</span> subjects
                                    </div>
                                    <div className="flex-1 flex justify-end">
                                        <button className="relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50">
                                            Previous
                                        </button>
                                        <button className="ml-3 relative inline-flex items-center px-4 py-2 text-sm font-medium rounded-md text-white bg-primary hover:bg-primary-dark disabled:opacity-50">
                                            Next
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
"use client";

import { useState } from "react";
import Link from "next/link";
import {
    BarChart3,
    LineChart,
    PieChart,
    Users,
    Filter,
    Download,
    Calendar,
    ChevronDown,
    ArrowUpRight,
    ArrowDownRight,
    Search
} from "lucide-react";

import DashboardHeader from "@/components/dashboard/header";
import DashboardNav from "@/components/dashboard/nav";
import StatCard from "@/components/dashboard/stat-card";
import { departmentPerformance, monthlyTrend, performanceCriteria, performanceData, recentEvaluations, teacherRankings } from "@/constants/variable";

export default function Performance() {
    const [timeframe, setTimeframe] = useState("This Month");
    const [searchQuery, setSearchQuery] = useState("");

    // Filter teachers based on search query
    const filteredTeachers = teacherRankings.filter(teacher =>
        teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        teacher.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex">
                <DashboardNav />

                <main className="w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Performance Analytics</h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive insights into teacher performance metrics</p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="relative">
                                <select
                                    className="appearance-none pl-4 pr-10 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary"
                                    value={timeframe}
                                    onChange={(e) => setTimeframe(e.target.value)}
                                >
                                    <option>This Week</option>
                                    <option>This Month</option>
                                    <option>This Quarter</option>
                                    <option>This Year</option>
                                </select>
                                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 pointer-events-none" size={16} />
                            </div>

                            <button className="flex items-center gap-2 px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 rounded-lg text-sm hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                                <Calendar size={16} />
                                <span>Date Range</span>
                            </button>

                            <button className="flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors">
                                <Download size={16} />
                                <span>Export Report</span>
                            </button>
                        </div>
                    </div>

                    {/* Performance Overview Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            title="Overall Performance"
                            value={performanceData.overallScore}
                            trend={`+${parseInt(performanceData.overallScore) - parseInt(performanceData.previousScore)}%`}
                            trendLabel="from last month"
                            icon={<BarChart3 className="text-primary" />}
                        />
                        <StatCard
                            title="Attendance Rate"
                            value={performanceData.attendance}
                            trend={`+${parseInt(performanceData.attendance) - parseInt(performanceData.previousAttendance)}%`}
                            trendLabel="from last month"
                            icon={<Users className="text-secondary" />}
                        />
                        <StatCard
                            title="Evaluations"
                            value={performanceData.evaluations}
                            trend={`+${parseInt(performanceData.evaluations) - parseInt(performanceData.previousEvaluations)}`}
                            trendLabel="from last month"
                            icon={<LineChart className="text-success" />}
                        />
                        <StatCard
                            title="Observations"
                            value={performanceData.observations}
                            trend={`+${parseInt(performanceData.observations) - parseInt(performanceData.previousObservations)}`}
                            trendLabel="from last month"
                            icon={<PieChart className="text-primary-dark" />}
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                        {/* Performance by Department Chart */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-2">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Performance by Department</h2>
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 rounded-full bg-primary"></span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400 mr-4">Current</span>
                                    <span className="inline-block w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></span>
                                    <span className="text-xs text-gray-500 dark:text-gray-400">Previous</span>
                                </div>
                            </div>

                            <div className="h-64 mt-4">
                                {departmentPerformance.map((dept, index) => (
                                    <div key={index} className="mb-4">
                                        <div className="flex justify-between mb-1">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dept.name}</span>
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{dept.score}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-1">
                                            <div
                                                className="bg-primary rounded-full h-2.5"
                                                style={{ width: `${dept.score}%` }}
                                            ></div>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 opacity-70">
                                            <div
                                                className="bg-gray-400 dark:bg-gray-500 rounded-full h-1.5"
                                                style={{ width: `${dept.previousScore}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Monthly Trend Chart */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                            <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Monthly Performance Trend</h2>
                            <div className="h-64 flex items-end justify-between">
                                {monthlyTrend.map((item, index) => (
                                    <div key={index} className="flex flex-col items-center">
                                        <div
                                            className="w-10 bg-primary rounded-t-md"
                                            style={{ height: `${item.score * 0.6}%` }}
                                        ></div>
                                        <span className="mt-2 text-xs font-medium text-gray-500 dark:text-gray-400">{item.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="mt-4 text-center">
                                <div className="inline-flex items-center text-sm">
                                    <span className="text-gray-500 dark:text-gray-400 mr-1">Average:</span>
                                    <span className="font-medium text-gray-800 dark:text-white">
                                        {(monthlyTrend.reduce((acc, curr) => acc + curr.score, 0) / monthlyTrend.length).toFixed(1)}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-8">
                        {/* Top Performing Teachers */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-7">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Teacher Performance Ranking</h2>
                                <div className="flex gap-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                        <input
                                            type="text"
                                            placeholder="Search teachers..."
                                            className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm">
                                        <Filter size={16} />
                                        Filter
                                    </button>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                    <thead className="bg-gray-50 dark:bg-gray-800">
                                        <tr>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Rank
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Teacher
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Subject
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Performance Score
                                            </th>
                                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                                Trend
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                        {filteredTeachers.map((teacher, index) => (
                                            <tr key={teacher.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="w-6 h-6 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                                                        <span className="text-xs font-medium text-gray-800 dark:text-gray-200">{index + 1}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                        {teacher.name}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="text-sm text-gray-500 dark:text-gray-400">
                                                        {teacher.subject}
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    <div className="flex items-center">
                                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                                                            <div
                                                                className={`${teacher.score >= 90 ? 'bg-success' : teacher.score >= 80 ? 'bg-primary' : teacher.score >= 70 ? 'bg-warning' : 'bg-danger'} rounded-full h-2`}
                                                                style={{ width: `${teacher.score}%` }}
                                                            ></div>
                                                        </div>
                                                        <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{teacher.score}%</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {teacher.trend === "up" ? (
                                                        <div className="flex items-center text-success">
                                                            <ArrowUpRight size={16} />
                                                            <span className="ml-1 text-sm">Up</span>
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center text-danger">
                                                            <ArrowDownRight size={16} />
                                                            <span className="ml-1 text-sm">Down</span>
                                                        </div>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Showing {filteredTeachers.length} of {teacherRankings.length} teachers
                                </p>
                                <Link href="/performance/teachers" className="text-sm text-primary hover:text-primary-dark">
                                    View All Teachers
                                </Link>
                            </div>
                        </div>

                        {/* Performance Criteria */}
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-5">
                            <h2 className="text-lg font-semibold mb-6 text-gray-800 dark:text-white">Performance Rating Criteria</h2>
                            <div className="space-y-5">
                                {performanceCriteria.map((criteria, index) => (
                                    <div key={index} className="space-y-2">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{criteria.name}</span>
                                            <div className="flex items-center space-x-2">
                                                <span className="inline-block w-2 h-2 rounded-full bg-success"></span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{criteria.excellent}%+</span>
                                                <span className="inline-block w-2 h-2 rounded-full bg-primary"></span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{criteria.good}%+</span>
                                                <span className="inline-block w-2 h-2 rounded-full bg-danger"></span>
                                                <span className="text-xs text-gray-500 dark:text-gray-400">{criteria.needsImprovement}%+</span>
                                            </div>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 relative">
                                            <div className="absolute left-0 top-0 h-2 bg-danger rounded-l-full" style={{ width: `${criteria.needsImprovement}%` }}></div>
                                            <div className="absolute left-0 top-0 h-2 bg-primary rounded-l-full" style={{ width: `${criteria.good}%` }}></div>
                                            <div className="absolute left-0 top-0 h-2 bg-success rounded-l-full" style={{ width: `${criteria.excellent}%` }}></div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Recent Evaluations */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Evaluations</h2>
                            <Link href="/performance/evaluations" className="text-sm text-primary hover:text-primary-dark">
                                View All Evaluations
                            </Link>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            ID
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Teacher
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Date
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Evaluator
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Score
                                        </th>
                                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                            Action
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                                    {recentEvaluations.map((evaluation) => (
                                        <tr key={evaluation.id} className="hover:bg-gray-50 dark:hover:bg-gray-750">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-mono text-gray-800 dark:text-gray-200">
                                                    {evaluation.id}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm font-medium text-gray-900 dark:text-white">
                                                    {evaluation.teacher}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {new Date(evaluation.date).toLocaleDateString("en-US", {
                                                        year: "numeric",
                                                        month: "short",
                                                        day: "numeric"
                                                    })}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                                    {evaluation.evaluator}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${evaluation.score >= 90 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
                                                    evaluation.score >= 80 ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
                                                        evaluation.score >= 70 ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
                                                            'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                                    }`}>
                                                    {evaluation.score}%
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <Link
                                                    href={`/performance/evaluations/${evaluation.id}`}
                                                    className="text-primary hover:text-primary-dark text-sm font-medium"
                                                >
                                                    View Details
                                                </Link>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
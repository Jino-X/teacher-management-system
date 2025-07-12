"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Users,
  BookOpen,
  Bell,
  Clock,
  Plus,
  Search,
  Filter
} from "lucide-react";

import DashboardHeader from "../components/dashboard/header";
import DashboardNav from "../components/dashboard/nav";
import StatCard from "../components/dashboard/stat-card";
import QuickActions from "../components/dashboard/quick-actions";
import ActivityLog, { Activity } from "../components/dashboard/activity-log";
import PerformanceChart from "../components/teachers/performace-chart";
import TeacherTable from "../components/teachers/table";
import UpcomingSchedule from "../components/dashboard/upcoming-schedule";
import { getCurrentDate } from "@/utils/helper";

// Temporary mock data
const teachersData = [
  { id: 'T102938', name: 'Emma Baker', email: 'emma@example.com', subject: 'Mathematics', class: '5A', phone: '737-234-563', address: '23 Elm St, Springfield' },
  { id: 'T293547', name: 'Olivia Davis', email: 'olivia@example.com', subject: 'English', class: '1B', phone: '644-224-667', address: '456 Oak Ave, Maplewood' },
  { id: 'T817364', name: 'Ethan Evans', email: 'ethan@example.com', subject: 'History', class: '2A', phone: '433-567-333', address: '789 Pine Rd, Lakeside' },
  { id: 'T456789', name: 'Sophia Foster', email: 'sophia@example.com', subject: 'Geography', class: '3A', phone: '255-745-245', address: '321 Birch Blvd, Riverside' },
  { id: 'T738291', name: 'Mason Green', email: 'mason@example.com', subject: 'Physics', class: '4A', phone: '213-456-775', address: '654 Cedar Ct, Brookhaven' }
];

const recentActivities = [
  { id: 1, activity: 'New teacher Emma Parker added', time: '10 mins ago', type: 'add' },
  { id: 2, activity: 'Schedule updated for Class 3B', time: '45 mins ago', type: 'update' },
  { id: 3, activity: 'Teacher evaluation completed for Mason Green', time: '2 hours ago', type: 'complete' },
  { id: 4, activity: 'Attendance marked for all classes', time: '3 hours ago', type: 'mark' }
];

const scheduleData = [
  { id: 1, class: '4A - Physics', time: '9:00 AM - 9:45 AM', teacher: 'Mason Green', room: 'Lab 2' },
  { id: 2, class: '1A - Chemistry', time: '10:00 AM - 10:45 AM', teacher: 'Noah Johnson', room: 'Lab 1' },
  { id: 3, class: '6A - Chemistry', time: '11:30 AM - 12:15 PM', teacher: 'Emma Parker', room: 'Room 101' },
  { id: 4, class: '3B - Physics', time: '2:00 PM - 2:45 PM', teacher: 'Sophia Foster', room: 'Lab 3' }
];

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");
  const [currentFilter, setCurrentFilter] = useState("all");

  // Filter teachers based on search query
  const filteredTeachers = teachersData.filter(teacher =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
    teacher.class.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <DashboardHeader />

      <div className="flex">
        <DashboardNav />

        <main className="max-w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Dashboard</h1>
            <div className="flex items-center gap-4">
              <button className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                <Bell size={20} />
              </button>
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-medium">
                  A
                </div>
                <span className="text-sm font-medium dark:text-white">Admin</span>
              </div>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
              title="Total Teachers"
              value="42"
              trend="+3"
              trendLabel="from last month"
              icon={<Users className="text-primary" />}
            />
            <StatCard
              title="Active Classes"
              value="24"
              trend="+2"
              trendLabel="from last month"
              icon={<BookOpen className="text-secondary" />}
            />
            <StatCard
              title="Subjects"
              value="16"
              trend="0"
              trendLabel="from last month"
              icon={<BookOpen className="text-success" />}
            />
            <StatCard
              title="Attendance Rate"
              value="98%"
              trend="+2%"
              trendLabel="from last month"
              icon={<BarChart3 className="text-primary-dark" />}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Quick Actions */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Quick Actions</h2>
              <QuickActions />
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Recent Activity</h2>
              <ActivityLog activities={recentActivities as Activity[]} />
            </div>

            {/* Performance Chart */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Teacher Performance</h2>
              <PerformanceChart />
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Teacher Table */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Teachers</h2>
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
                  <Link href="/teachers/add" className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors">
                    <Plus size={16} />
                    Add Teacher
                  </Link>
                </div>
              </div>
              <TeacherTable teachers={filteredTeachers} />
              <div className="mt-4 flex justify-between items-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">{`Showing ${filteredTeachers.length} of ${teachersData.length} teachers`}</p>
                <Link href="/teachers" className="text-sm text-primary hover:text-primary-dark">View All Teachers</Link>
              </div>
            </div>

            {/* Schedule */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 lg:col-span-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Today's Schedule</h2>
                <div className="flex items-center text-gray-500 text-sm">
                  <Clock size={14} className="mr-1" />
                  <span>{getCurrentDate()}</span>
                </div>
              </div>
              <UpcomingSchedule schedules={scheduleData} />
              <div className="mt-4 flex justify-center">
                <Link href="/schedule" className="text-sm text-primary hover:text-primary-dark">View Full Schedule</Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
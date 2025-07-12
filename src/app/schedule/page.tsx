"use client";

import { useState } from "react";
import Link from "next/link";
import {
    ChevronLeft,
    ChevronRight,
    Plus,
    Filter,
    Calendar,
    Download,
    Search,
    Clock,
    MapPin,
    User
} from "lucide-react";

import { getCurrentDate } from "@/utils/helper";
import DashboardHeader from "@/components/dashboard/header";
import DashboardNav from "@/components/dashboard/nav";
import { scheduleData, timeSlots, weekDays } from "@/constants/variable";


interface ScheduleItemProps {
    item: typeof scheduleData[0];
    onClick: () => void;
}

const ScheduleItem = ({ item, onClick }: ScheduleItemProps) => {
    // Calculate position and height based on time
    const startHour = parseInt(item.startTime.split(":")[0]);
    const startMinute = parseInt(item.startTime.split(":")[1]);
    const endHour = parseInt(item.endTime.split(":")[0]);
    const endMinute = parseInt(item.endTime.split(":")[1]);

    // Simplified positioning for this example
    const duration = (endHour * 60 + endMinute) - (startHour * 60 + startMinute);
    const height = (duration / 45) * 100; // Rough height calculation based on 45-minute slots

    return (
        <div
            className={`absolute w-full ${item.color} text-white p-2 rounded-md shadow-sm cursor-pointer hover:opacity-90 transition-opacity`}
            style={{
                top: `${(((startHour - 9) * 60 + startMinute) / (9 * 60)) * 100}%`,
                height: `${height}%`,
                maxHeight: "calc(100% - 4px)"
            }}
            onClick={onClick}
        >
            <div className="text-sm font-medium">{item.subject}</div>
            <div className="text-xs opacity-90">{item.class}</div>
            <div className="text-xs mt-1 opacity-80">{item.teacher}</div>
        </div>
    );
};

export default function SchedulePage() {
    const [currentWeek, setCurrentWeek] = useState("July 10 - July 16, 2025");
    const [selectedSchedule, setSelectedSchedule] = useState<typeof scheduleData[0] | null>(null);
    const [filterTeacher, setFilterTeacher] = useState("");
    const [filterClass, setFilterClass] = useState("");

    // Filter schedule data
    const filteredSchedule = scheduleData.filter(item => {
        return (
            item.teacher.toLowerCase().includes(filterTeacher.toLowerCase()) &&
            item.class.toLowerCase().includes(filterClass.toLowerCase())
        );
    });

    // Navigate to previous week
    const previousWeek = () => {
        setCurrentWeek("July 3 - July 9, 2025");
    };

    // Navigate to next week
    const nextWeek = () => {
        setCurrentWeek("July 17 - July 23, 2025");
    };

    return (
        <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
            <DashboardHeader />

            <div className="flex">
                <DashboardNav />

                <main className="w-full h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar p-6">
                    <div className="flex justify-between items-center mb-8">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-white">Schedule</h1>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center text-gray-500 text-sm">
                                <Clock size={14} className="mr-1" />
                                <span>{getCurrentDate()}</span>
                            </div>
                        </div>
                    </div>

                    {/* Schedule Controls */}
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                            <div className="flex items-center gap-4">
                                <button
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                    onClick={previousWeek}
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <div className="text-lg font-semibold text-gray-800 dark:text-white">{currentWeek}</div>
                                <button
                                    className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                                    onClick={nextWeek}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </div>

                            <div className="flex gap-2 w-full sm:w-auto">
                                <div className="relative flex-grow sm:flex-grow-0">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Filter by teacher..."
                                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white w-full"
                                        value={filterTeacher}
                                        onChange={(e) => setFilterTeacher(e.target.value)}
                                    />
                                </div>
                                <div className="relative flex-grow sm:flex-grow-0">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                                    <input
                                        type="text"
                                        placeholder="Filter by class..."
                                        className="pl-10 pr-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-sm focus:outline-none focus:ring-2 focus:ring-primary dark:text-white w-full"
                                        value={filterClass}
                                        onChange={(e) => setFilterClass(e.target.value)}
                                    />
                                </div>
                                <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap">
                                    <Filter size={16} />
                                    More Filters
                                </button>
                                <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg text-gray-600 dark:text-gray-300 text-sm whitespace-nowrap">
                                    <Download size={16} />
                                    Export
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end mb-4">
                            <Link href="/schedule/add" className="flex items-center gap-2 px-3 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm transition-colors">
                                <Plus size={16} />
                                Add Schedule
                            </Link>
                        </div>

                        {/* Weekly Schedule Timetable */}
                        <div className="overflow-x-auto">
                            <div className="min-w-[900px]">
                                <div className="grid grid-cols-6 gap-2">
                                    {/* Time column */}
                                    <div className="col-span-1">
                                        <div className="h-12 flex items-end justify-start pl-2 pb-2">
                                            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">Time</span>
                                        </div>
                                        <div className="space-y-4">
                                            {timeSlots.map((timeSlot, index) => (
                                                <div key={index} className="h-24 flex items-start justify-start p-2 border-t border-gray-200 dark:border-gray-700">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">{timeSlot}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Days columns */}
                                    {weekDays.map((day, dayIndex) => (
                                        <div key={dayIndex} className="col-span-1">
                                            <div className="h-12 flex items-center justify-center">
                                                <span className="text-sm font-medium text-gray-800 dark:text-white">{day}</span>
                                            </div>
                                            <div className="h-[768px] relative border-t border-gray-200 dark:border-gray-700">
                                                {filteredSchedule
                                                    .filter(item => item.day === day)
                                                    .map(item => (
                                                        <ScheduleItem
                                                            key={item.id}
                                                            item={item}
                                                            onClick={() => setSelectedSchedule(item)}
                                                        />
                                                    ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Selected Schedule Details */}
                    {selectedSchedule && (
                        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
                            <div className="flex justify-between mb-4">
                                <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Schedule Details</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                    onClick={() => setSelectedSchedule(null)}
                                >
                                    ✕
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <div className="mb-4">
                                        <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-1">
                                            {selectedSchedule.subject}
                                        </h3>
                                        <span className={`inline-block px-2 py-1 rounded-full text-xs text-white ${selectedSchedule.color}`}>
                                            {selectedSchedule.class}
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-center gap-2">
                                            <User className="text-gray-500 dark:text-gray-400" size={16} />
                                            <span className="text-sm text-gray-800 dark:text-white">{selectedSchedule.teacher}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Calendar className="text-gray-500 dark:text-gray-400" size={16} />
                                            <span className="text-sm text-gray-800 dark:text-white">{selectedSchedule.day}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Clock className="text-gray-500 dark:text-gray-400" size={16} />
                                            <span className="text-sm text-gray-800 dark:text-white">{selectedSchedule.startTime} - {selectedSchedule.endTime}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="text-gray-500 dark:text-gray-400" size={16} />
                                            <span className="text-sm text-gray-800 dark:text-white">{selectedSchedule.room}</span>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
                                        <h4 className="font-medium text-gray-800 dark:text-white mb-2">Quick Actions</h4>
                                        <div className="space-y-2">
                                            <Link href={`/schedule/edit/${selectedSchedule.id}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                Edit this schedule
                                            </Link>
                                            <Link href={`/teachers/profile/${selectedSchedule.teacher.replace(' ', '-').toLowerCase()}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                View teacher profile
                                            </Link>
                                            <Link href={`/classes/details/${selectedSchedule.class}`} className="flex items-center gap-2 text-sm text-primary hover:underline">
                                                View class details
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}
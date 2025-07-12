import { Clock } from "lucide-react";

interface Schedule {
    id: number;
    class: string;
    time: string;
    teacher: string;
    room: string;
}

interface UpcomingScheduleProps {
    schedules: Schedule[];
}

export default function UpcomingSchedule({ schedules }: UpcomingScheduleProps) {
    return (
        <div className="space-y-4">
            {schedules.length === 0 ? (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    No classes scheduled
                </p>
            ) : (
                schedules.map((schedule) => (
                    <div
                        key={schedule.id}
                        className="p-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                        <div className="flex justify-between items-center mb-2">
                            <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                                {schedule.class}
                            </h4>
                            <span className="inline-flex items-center text-xs text-gray-500 dark:text-gray-400">
                                <Clock size={12} className="mr-1" />
                                {schedule.time}
                            </span>
                        </div>
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-600 dark:text-gray-300">
                                    {schedule.teacher}
                                </p>
                            </div>
                            <div>
                                <span className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
                                    {schedule.room}
                                </span>
                            </div>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
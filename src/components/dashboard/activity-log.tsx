import {
    UserPlus,
    RefreshCw,
    CheckCircle,
    FileCheck
} from "lucide-react";

export interface Activity {
    id: number;
    activity: string;
    time: string;
    type: 'add' | 'update' | 'complete' | 'mark' | 'delete';
}

interface ActivityLogProps {
    activities: Activity[];
}

export default function ActivityLog({ activities }: ActivityLogProps) {
    // Get appropriate icon for activity type
    const getActivityIcon = (type: Activity['type']) => {
        switch (type) {
            case 'add':
                return <UserPlus size={16} className="text-success" />;
            case 'update':
                return <RefreshCw size={16} className="text-primary" />;
            case 'complete':
                return <CheckCircle size={16} className="text-secondary" />;
            case 'mark':
                return <FileCheck size={16} className="text-primary-dark" />;
            case 'delete':
                return <FileCheck size={16} className="text-error" />;
            default:
                return <RefreshCw size={16} className="text-primary" />;
        }
    };

    return (
        <div className="space-y-4">
            {activities.length === 0 ? (
                <p className="text-center text-sm text-gray-500 dark:text-gray-400 py-4">
                    No recent activities
                </p>
            ) : (
                activities.map((activity) => (
                    <div
                        key={activity.id}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-750 transition-colors"
                    >
                        <div className="p-2 rounded-full bg-gray-100 dark:bg-gray-700">
                            {getActivityIcon(activity.type)}
                        </div>
                        <div className="flex-1">
                            <p className="text-sm text-gray-800 dark:text-gray-200">
                                {activity.activity}
                            </p>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                {activity.time}
                            </p>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
}
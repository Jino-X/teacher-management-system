import { ReactNode } from "react";
import { ArrowUp, ArrowDown } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string;
    trend: string;
    trendLabel: string;
    icon: ReactNode;
}

export default function StatCard({ title, value, trend, trendLabel, icon }: StatCardProps) {
    // Determine trend direction
    const isTrendUp = trend.startsWith("+");
    const isTrendNeutral = trend === "0" || trend === "0%";

    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
                        {title}
                    </p>
                    <h3 className="text-2xl font-bold mt-1 text-gray-900 dark:text-white">
                        {value}
                    </h3>
                </div>
                <div className="p-2 rounded-lg bg-primary/10 text-primary">
                    {icon}
                </div>
            </div>

            <div className="mt-3 flex items-center">
                <div
                    className={`flex items-center ${isTrendNeutral
                            ? "text-gray-500 dark:text-gray-400"
                            : isTrendUp
                                ? "text-success"
                                : "text-error"
                        }`}
                >
                    {!isTrendNeutral && (
                        isTrendUp ? <ArrowUp size={16} /> : <ArrowDown size={16} />
                    )}
                    <span className="text-sm font-medium ml-1">{trend}</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 ml-2">
                    {trendLabel}
                </span>
            </div>
        </div>
    );
}
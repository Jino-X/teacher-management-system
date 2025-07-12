"use client";

import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

// Mock data for teacher performance
const initialData = [
    { name: "Jan", evaluationScore: 78, attendanceRate: 95 },
    { name: "Feb", evaluationScore: 80, attendanceRate: 97 },
    { name: "Mar", evaluationScore: 85, attendanceRate: 96 },
    { name: "Apr", evaluationScore: 82, attendanceRate: 98 },
    { name: "May", evaluationScore: 84, attendanceRate: 97 },
    { name: "Jun", evaluationScore: 87, attendanceRate: 99 },
];

export default function PerformanceChart() {
    // For client-side rendering with SSR compatibility
    const [chartData, setChartData] = useState<typeof initialData>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        setChartData(initialData);
    }, []);

    if (!mounted) {
        return (
            <div className="h-64 flex items-center justify-center">
                <p className="text-sm text-gray-500 dark:text-gray-400">Loading chart...</p>
            </div>
        );
    }

    const CustomTooltip = ({ active, payload, label }: any) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-white dark:bg-gray-800 p-3 shadow-md border border-gray-200 dark:border-gray-700 rounded-md">
                    <p className="text-xs font-medium text-gray-800 dark:text-gray-200">{`${label}`}</p>
                    <p className="text-xs text-primary">
                        <span className="font-medium">Evaluation Score:</span> {`${payload[0].value}%`}
                    </p>
                    <p className="text-xs text-secondary">
                        <span className="font-medium">Attendance Rate:</span> {`${payload[1].value}%`}
                    </p>
                </div>
            );
        }
        return null;
    };

    return (
        <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
                <BarChart
                    data={chartData}
                    margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
                >
                    <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                    <XAxis
                        dataKey="name"
                        fontSize={12}
                        tick={{ fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        tickLine={false}
                    />
                    <YAxis
                        fontSize={12}
                        tick={{ fill: "#6B7280" }}
                        axisLine={{ stroke: "#E5E7EB" }}
                        tickLine={false}
                        domain={[0, 100]}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend
                        wrapperStyle={{ fontSize: "12px", marginTop: "10px" }}
                        formatter={(value) => <span className="text-xs font-medium">{value}</span>}
                    />
                    <Bar
                        dataKey="evaluationScore"
                        name="Evaluation Score"
                        fill="var(--primary)"
                        radius={[4, 4, 0, 0]}
                        barSize={8}
                    />
                    <Bar
                        dataKey="attendanceRate"
                        name="Attendance Rate"
                        fill="var(--secondary)"
                        radius={[4, 4, 0, 0]}
                        barSize={8}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
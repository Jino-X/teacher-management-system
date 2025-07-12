import { Assignment } from "@/app/assignments/page";
import { Teacher } from "@/components/teachers/table";
import { SessionKeys } from "@/models/constants.model";

export const SESSION_KEYS: SessionKeys = {
    AUTHORIZATION: 'authorization',
    TOKEN: 'token',
    ID_TOKEN: 'id_token',
    REFRESH_TOKEN: 'refresh_token',
    USER_ID: 'userId',
    ORGANIZATION_ID: 'organizationId',
    REDIRECT_URL: 'redirectUrl',
    LAST_VISITED_PAGE: 'page',
    LAST_VISIBILITY_TIME: 'lastVisibilityTime',
    EMAIL_ID: 'emailId',
};

export const ERROR_MESSAGE: string = "Something went wrong. Please try again later";

export const isLocalDevelopment = process.env.NODE_ENV === 'development' ||
    (typeof window !== 'undefined' && window?.location?.hostname?.includes('stage')) ||
    (typeof window !== 'undefined' && window?.location?.hostname?.includes('dev'));


export const teachersData: Teacher[] = [
    { id: 'T102938', name: 'Emma Baker', email: 'emma@example.com', subject: 'Mathematics', class: '5A', phone: '737-234-563', address: '23 Elm St, Springfield', status: 'active', joinDate: '2022-09-10', experience: '5 years' },
    { id: 'T293547', name: 'Olivia Davis', email: 'olivia@example.com', subject: 'English', class: '1B', phone: '644-224-667', address: '456 Oak Ave, Maplewood', status: 'active', joinDate: '2023-03-15', experience: '3 years' },
    { id: 'T817364', name: 'Ethan Evans', email: 'ethan@example.com', subject: 'History', class: '2A', phone: '433-567-333', address: '789 Pine Rd, Lakeside', status: 'leave', joinDate: '2021-08-05', experience: '7 years' },
    { id: 'T456789', name: 'Sophia Foster', email: 'sophia@example.com', subject: 'Geography', class: '3A', phone: '255-745-245', address: '321 Birch Blvd, Riverside', status: 'active', joinDate: '2022-01-20', experience: '4 years' },
    { id: 'T738291', name: 'Mason Green', email: 'mason@example.com', subject: 'Physics', class: '4A', phone: '213-456-775', address: '654 Cedar Ct, Brookhaven', status: 'active', joinDate: '2020-11-15', experience: '8 years' },
    { id: 'T629184', name: 'Ava Johnson', email: 'ava@example.com', subject: 'Chemistry', class: '6B', phone: '765-432-109', address: '987 Maple St, Oakdale', status: 'active', joinDate: '2023-01-08', experience: '2 years' },
    { id: 'T547382', name: 'Noah Williams', email: 'noah@example.com', subject: 'Biology', class: '4B', phone: '321-987-654', address: '456 Pine Ln, Maplewood', status: 'inactive', joinDate: '2021-04-12', experience: '6 years' },
    { id: 'T918273', name: 'Isabella Brown', email: 'isabella@example.com', subject: 'Art', class: '3B', phone: '123-456-789', address: '789 Birch Dr, Lakeside', status: 'active', joinDate: '2022-07-30', experience: '4 years' },
    { id: 'T283746', name: 'Liam Smith', email: 'liam@example.com', subject: 'Music', class: '2B', phone: '987-654-321', address: '123 Elm Ave, Riverdale', status: 'active', joinDate: '2023-06-15', experience: '3 years' },
    { id: 'T837465', name: 'Charlotte Taylor', email: 'charlotte@example.com', subject: 'Physical Education', class: '1A', phone: '456-789-123', address: '321 Oak Rd, Springfield', status: 'leave', joinDate: '2020-08-22', experience: '9 years' }
];

export const subjectsData = [
    { id: "SUB001", name: "Mathematics", code: "MATH", description: "Number theory, algebra, geometry, and analysis", department: "Science", teacherCount: 6, classCount: 8 },
    { id: "SUB002", name: "English Literature", code: "ENG", description: "Study of literature, language, and composition", department: "Humanities", teacherCount: 4, classCount: 6 },
    { id: "SUB003", name: "Physics", code: "PHY", description: "Study of matter, energy, and the interaction between them", department: "Science", teacherCount: 3, classCount: 5 },
    { id: "SUB004", name: "History", code: "HIST", description: "Study of past events and human affairs", department: "Humanities", teacherCount: 3, classCount: 4 },
    { id: "SUB005", name: "Computer Science", code: "CS", description: "Study of computers and computational systems", department: "Science", teacherCount: 2, classCount: 3 },
    { id: "SUB006", name: "Geography", code: "GEO", description: "Study of places and the relationships between people and their environments", department: "Humanities", teacherCount: 2, classCount: 4 },
    { id: "SUB007", name: "Chemistry", code: "CHEM", description: "Study of the composition, structure, properties, and change of matter", department: "Science", teacherCount: 3, classCount: 4 },
    { id: "SUB008", name: "Art", code: "ART", description: "Expression or application of human creative skill and imagination", department: "Arts", teacherCount: 1, classCount: 2 },
];

export const classesData = [
    {
        id: "C1001",
        name: "5A",
        grade: "5",
        section: "A",
        students: 28,
        classTeacher: "Emma Baker",
        room: "Room 101",
        subjects: ["Mathematics", "Science", "English", "History", "Geography"]
    },
    {
        id: "C1002",
        name: "1B",
        grade: "1",
        section: "B",
        students: 24,
        classTeacher: "Olivia Davis",
        room: "Room 102",
        subjects: ["English", "Mathematics", "Art", "Science"]
    },
    {
        id: "C1003",
        name: "2A",
        grade: "2",
        section: "A",
        students: 26,
        classTeacher: "Ethan Evans",
        room: "Room 201",
        subjects: ["History", "Geography", "Mathematics", "English"]
    },
    {
        id: "C1004",
        name: "3A",
        grade: "3",
        section: "A",
        students: 30,
        classTeacher: "Sophia Foster",
        room: "Room 202",
        subjects: ["Geography", "Science", "Mathematics", "English", "Music"]
    },
    {
        id: "C1005",
        name: "4A",
        grade: "4",
        section: "A",
        students: 25,
        classTeacher: "Mason Green",
        room: "Room 301",
        subjects: ["Physics", "Chemistry", "Mathematics", "English", "Physical Education"]
    },
    {
        id: "C1006",
        name: "6B",
        grade: "6",
        section: "B",
        students: 22,
        classTeacher: "Noah Johnson",
        room: "Room 302",
        subjects: ["Chemistry", "Physics", "Biology", "Mathematics", "English", "History"]
    },
];

export const upcomingClassesData = [
    { id: 1, class: "5A", subject: "Mathematics", time: "9:00 AM - 9:45 AM", teacher: "Emma Baker", room: "Room 101" },
    { id: 2, class: "1B", subject: "English", time: "10:00 AM - 10:45 AM", teacher: "Olivia Davis", room: "Room 102" },
    { id: 3, class: "2A", subject: "History", time: "11:30 AM - 12:15 PM", teacher: "Ethan Evans", room: "Room 201" },
    { id: 4, class: "3A", subject: "Geography", time: "2:00 PM - 2:45 PM", teacher: "Sophia Foster", room: "Room 202" }
];

export const scheduleData = [
    {
        id: 1,
        subject: "Mathematics",
        class: "5A",
        teacher: "Emma Baker",
        day: "Monday",
        startTime: "09:00",
        endTime: "09:45",
        room: "Room 101",
        color: "bg-primary"
    },
    {
        id: 2,
        subject: "English",
        class: "1B",
        teacher: "Olivia Davis",
        day: "Monday",
        startTime: "10:00",
        endTime: "10:45",
        room: "Room 203",
        color: "bg-secondary"
    },
    {
        id: 3,
        subject: "History",
        class: "2A",
        teacher: "Ethan Evans",
        day: "Monday",
        startTime: "11:30",
        endTime: "12:15",
        room: "Room 105",
        color: "bg-success"
    },
    {
        id: 4,
        subject: "Geography",
        class: "3A",
        teacher: "Sophia Foster",
        day: "Monday",
        startTime: "13:00",
        endTime: "13:45",
        room: "Room 104",
        color: "bg-primary-dark"
    },
    {
        id: 5,
        subject: "Physics",
        class: "4A",
        teacher: "Mason Green",
        day: "Tuesday",
        startTime: "09:00",
        endTime: "09:45",
        room: "Lab 2",
        color: "bg-accent"
    },
    {
        id: 6,
        subject: "Chemistry",
        class: "1A",
        teacher: "Noah Johnson",
        day: "Tuesday",
        startTime: "10:00",
        endTime: "10:45",
        room: "Lab 1",
        color: "bg-secondary-light"
    },
    {
        id: 7,
        subject: "Biology",
        class: "6A",
        teacher: "Emma Parker",
        day: "Tuesday",
        startTime: "11:30",
        endTime: "12:15",
        room: "Lab 3",
        color: "bg-primary-light"
    },
    {
        id: 8,
        subject: "Computer Science",
        class: "3B",
        teacher: "Sophia Foster",
        day: "Wednesday",
        startTime: "09:00",
        endTime: "10:30",
        room: "Computer Lab",
        color: "bg-primary"
    },
    {
        id: 9,
        subject: "Physical Education",
        class: "2C",
        teacher: "Noah Johnson",
        day: "Wednesday",
        startTime: "11:00",
        endTime: "11:45",
        room: "Sports Hall",
        color: "bg-success"
    },
    {
        id: 10,
        subject: "Art",
        class: "4B",
        teacher: "Olivia Davis",
        day: "Thursday",
        startTime: "09:00",
        endTime: "10:30",
        room: "Art Studio",
        color: "bg-secondary"
    },
    {
        id: 11,
        subject: "Music",
        class: "1C",
        teacher: "Emma Baker",
        day: "Thursday",
        startTime: "11:00",
        endTime: "11:45",
        room: "Music Room",
        color: "bg-primary-dark"
    },
    {
        id: 12,
        subject: "Mathematics",
        class: "3A",
        teacher: "Mason Green",
        day: "Friday",
        startTime: "09:00",
        endTime: "09:45",
        room: "Room 101",
        color: "bg-primary"
    },
    {
        id: 13,
        subject: "English Literature",
        class: "5B",
        teacher: "Ethan Evans",
        day: "Friday",
        startTime: "10:00",
        endTime: "10:45",
        room: "Library",
        color: "bg-secondary-light"
    },
    {
        id: 14,
        subject: "Physics",
        class: "6A",
        teacher: "Sophia Foster",
        day: "Friday",
        startTime: "11:30",
        endTime: "12:15",
        room: "Lab 2",
        color: "bg-accent"
    }
];

export const timeSlots = [
    "09:00 - 09:45",
    "10:00 - 10:45",
    "11:00 - 11:45",
    "11:30 - 12:15",
    "12:30 - 13:15",
    "13:00 - 13:45",
    "14:00 - 14:45",
    "15:00 - 15:45"
];

export const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

export const classData = [
    { id: 1, className: "5A", subject: "Mathematics", teacher: "Emma Baker", time: "08:30 AM - 09:15 AM", totalStudents: 28, present: 26, absent: 2, status: "completed" },
    { id: 2, className: "1B", subject: "English", teacher: "Olivia Davis", time: "09:30 AM - 10:15 AM", totalStudents: 30, present: 28, absent: 2, status: "completed" },
    { id: 3, className: "2A", subject: "History", teacher: "Ethan Evans", time: "10:30 AM - 11:15 AM", totalStudents: 25, present: 25, absent: 0, status: "completed" },
    { id: 4, className: "3A", subject: "Geography", teacher: "Sophia Foster", time: "11:30 AM - 12:15 PM", totalStudents: 27, present: 24, absent: 3, status: "completed" },
    { id: 5, className: "4A", subject: "Physics", teacher: "Mason Green", time: "01:30 PM - 02:15 PM", totalStudents: 24, present: 0, absent: 0, status: "pending" },
    { id: 6, className: "6B", subject: "Chemistry", teacher: "Noah Johnson", time: "02:30 PM - 03:15 PM", totalStudents: 26, present: 0, absent: 0, status: "pending" },
];

export const assignmentsData: Assignment[] = [
    {
        id: "A1023",
        title: "Mathematics Problem Set - Linear Equations",
        subject: "Mathematics",
        class: "5A",
        teacher: "Emma Baker",
        dueDate: "July 15, 2025",
        assignedDate: "July 08, 2025",
        status: "pending",
        submissionCount: 18,
        totalStudents: 30
    },
    {
        id: "A1024",
        title: "English Literature Essay - Shakespeare Analysis",
        subject: "English",
        class: "1B",
        teacher: "Olivia Davis",
        dueDate: "July 18, 2025",
        assignedDate: "July 05, 2025",
        status: "submitted",
        submissionCount: 25,
        totalStudents: 25
    },
    {
        id: "A1025",
        title: "History Project - Ancient Civilizations",
        subject: "History",
        class: "2A",
        teacher: "Ethan Evans",
        dueDate: "July 10, 2025",
        assignedDate: "June 25, 2025",
        status: "graded",
        submissionCount: 28,
        totalStudents: 28
    },
    {
        id: "A1026",
        title: "Geography Assignment - Map Reading",
        subject: "Geography",
        class: "3A",
        teacher: "Sophia Foster",
        dueDate: "July 05, 2025",
        assignedDate: "June 28, 2025",
        status: "overdue",
        submissionCount: 20,
        totalStudents: 32
    },
    {
        id: "A1027",
        title: "Physics Experiment Report - Gravity",
        subject: "Physics",
        class: "4A",
        teacher: "Mason Green",
        dueDate: "July 20, 2025",
        assignedDate: "July 10, 2025",
        status: "pending",
        submissionCount: 10,
        totalStudents: 30
    },
    {
        id: "A1028",
        title: "Chemistry Lab Report - Reactions",
        subject: "Chemistry",
        class: "6A",
        teacher: "Emma Parker",
        dueDate: "July 22, 2025",
        assignedDate: "July 11, 2025",
        status: "pending",
        submissionCount: 5,
        totalStudents: 28
    }
];

export const performanceData = {
    overallScore: "86%",
    previousScore: "81%",
    attendance: "94%",
    previousAttendance: "92%",
    evaluations: "32",
    previousEvaluations: "28",
    observations: "18",
    previousObservations: "15"
};

export const teacherRankings = [
    { id: 1, name: "Emma Baker", subject: "Mathematics", score: 95, trend: "up" },
    { id: 2, name: "Olivia Davis", subject: "English", score: 92, trend: "up" },
    { id: 3, name: "Mason Green", subject: "Physics", score: 88, trend: "down" },
    { id: 4, name: "Sophia Foster", subject: "Geography", score: 86, trend: "up" },
    { id: 5, name: "Ethan Evans", subject: "History", score: 83, trend: "down" },
    { id: 6, name: "Noah Johnson", subject: "Chemistry", score: 81, trend: "down" },
    { id: 7, name: "Emma Parker", subject: "Biology", score: 79, trend: "up" },
];

export const departmentPerformance = [
    { name: "Science", score: 87, previousScore: 82 },
    { name: "Mathematics", score: 91, previousScore: 89 },
    { name: "Language Arts", score: 84, previousScore: 86 },
    { name: "Social Studies", score: 79, previousScore: 75 },
    { name: "Fine Arts", score: 88, previousScore: 83 },
];

export const monthlyTrend = [
    { month: "Jan", score: 78 },
    { month: "Feb", score: 80 },
    { month: "Mar", score: 79 },
    { month: "Apr", score: 82 },
    { month: "May", score: 85 },
    { month: "Jun", score: 89 },
];

export const performanceCriteria = [
    { name: "Lesson Planning", excellent: 90, good: 75, needsImprovement: 60 },
    { name: "Student Engagement", excellent: 92, good: 78, needsImprovement: 65 },
    { name: "Assessment Methods", excellent: 88, good: 76, needsImprovement: 62 },
    { name: "Professional Development", excellent: 85, good: 72, needsImprovement: 60 },
    { name: "Classroom Management", excellent: 95, good: 80, needsImprovement: 68 },
];

export const recentEvaluations = [
    { id: "E12345", teacher: "Emma Baker", date: "2025-07-10", evaluator: "Principal Smith", score: 95 },
    { id: "E12346", teacher: "Mason Green", date: "2025-07-08", evaluator: "Vice Principal Johnson", score: 88 },
    { id: "E12347", teacher: "Olivia Davis", date: "2025-07-05", evaluator: "Department Head Williams", score: 92 },
    { id: "E12348", teacher: "Sophia Foster", date: "2025-07-03", evaluator: "Principal Smith", score: 86 },
];
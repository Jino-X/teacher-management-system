/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: {
                    light: '#4F92D0', // Lighter blue
                    DEFAULT: '#2C6EBD', // Education blue - primary color
                    dark: '#1C5494', // Darker blue for hover states
                },
                secondary: {
                    light: '#FFA63F', // Lighter orange
                    DEFAULT: '#FF8C0A', // Warm orange - secondary color
                    dark: '#E67300', // Darker orange
                },
                accent: {
                    green: {
                        light: '#6ACB8C', // Light green for success states
                        DEFAULT: '#3AAB63', // Green for success
                        dark: '#2D8A4E', // Dark green
                    },
                    red: {
                        light: '#F56565', // Light red for errors
                        DEFAULT: '#E53E3E', // Red for errors/alerts
                        dark: '#C53030', // Dark red
                    },
                },
                neutral: {
                    100: '#F7F9FC', // Lightest - for backgrounds
                    200: '#EDF2F7', // Light gray - for alternate rows
                    300: '#E2E8F0', // Light gray - for borders
                    400: '#CBD5E0', // Mid gray - for disabled text
                    500: '#A0AEC0', // Mid gray - for placeholder text
                    600: '#718096', // Gray - for secondary text
                    700: '#4A5568', // Dark gray - for main text
                    800: '#2D3748', // Darker gray - for headings
                    900: '#1A202C', // Darkest - for emphasis
                }
            },
            fontFamily: {
                sans: ['Inter', 'Arial', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
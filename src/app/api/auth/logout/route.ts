import { NextResponse } from 'next/server';

interface LogoutSuccessResponse {
    message: string;
}

interface ErrorResponse {
    message: string;
}

export async function POST(): Promise<NextResponse<LogoutSuccessResponse | ErrorResponse>> {
    try {
        // Create response object
        const response = NextResponse.json<LogoutSuccessResponse>(
            { message: 'Logged out successfully' },
            { status: 200 }
        );

        // Clear the auth cookie
        response.cookies.set({
            name: 'auth',
            value: '',
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            path: '/',
            expires: new Date(0) // Set expiration to past date
        });

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json<ErrorResponse>(
            { message: 'Error during logout' },
            { status: 500 }
        );
    }
}
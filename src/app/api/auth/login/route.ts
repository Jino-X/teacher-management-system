import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { decrypt, isValidEncryptedFormat } from '@/utils/encrypt-decrypt';

interface LoginRequestBody {
    encData: string;
}

interface LoginSuccessResponse {
    message: string;
    access_token: string;
}

interface ErrorResponse {
    message: string;
    error?: string;
}

export async function POST(request: NextRequest): Promise<NextResponse<LoginSuccessResponse | ErrorResponse>> {
    try {
        const body: LoginRequestBody = await request.json();

        let plainRequest;
        // Handle encrypted request
        if ('encData' in body) {
            if (!isValidEncryptedFormat(body.encData)) {
                return NextResponse.json({
                    status: 'F',
                    message: 'Invalid encrypted data format'
                }, { status: 400 });
            }

            try {
                const decryptedData = decrypt(body.encData);
                plainRequest = JSON.parse(decryptedData as string);
            } catch (error) {
                return NextResponse.json({
                    status: 'F',
                    message: 'Decryption failed'
                }, { status: 400 });
            }
        } else {
            plainRequest = body;
        }

        const { email, password } = plainRequest;

        // Verify credentials against environment variables
        const isValidEmail = email === process.env.NEXT_PUBLIC_EMAIL;
        const isValidPassword = password === process.env.AUTH_PASSWORD;

        if (!isValidEmail) {
            return NextResponse.json<ErrorResponse>(
                { message: 'Invalid email' },
                { status: 401 }
            );
        }

        if (!isValidPassword) {
            return NextResponse.json<ErrorResponse>(
                { message: 'Invalid password' },
                { status: 401 }
            );
        }

        // Generate JWT token
        const token = jwt.sign(
            { email, timestamp: Date.now() },
            process.env.JWT_SECRET as string,
            { expiresIn: '1d' }
        );

        // Create the response
        const response = NextResponse.json<LoginSuccessResponse>(
            { message: 'Login successful', access_token: token },
            { status: 200 }
        );

        // Set cookie in the response
        response.cookies.set({
            name: 'auth',
            value: token,
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', // Changed from 'strict' to 'lax' for better compatibility
            path: '/',
            maxAge: 86400 // 1 day
        });

        return response;

    } catch (error) {
        console.error('Login error:', error);
        return NextResponse.json<ErrorResponse>(
            { message: 'Internal server error', error: error instanceof Error ? error.message : String(error) },
            { status: 500 }
        );
    }
}
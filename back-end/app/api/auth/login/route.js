import { NextResponse } from "next/server";
import { supabase } from "../../../supabase";

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Access-Control-Allow-Origin': 'https://quiz-buddy-web.vercel.app',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization'
        },
    })
}

export async function POST(request) {
    try {
        const { email, password } = await request.json()

        const { data, error } = await supabase.auth.signInWithPassword({
            email: email,
            password: password
        })

        if (error) {
            const errorResponse = NextResponse.json({error: error.message}, {status: 400});
            errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
            errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return errorResponse;
        }

        const response = NextResponse.json ({
            message: 'User logged in',
            user: {
                id: data.user.id,
                email: data.user.email
            },
            session: {
                access_token: data.session.access_token
            }
        });
        Response.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
        Response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        Response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return Response;


    } catch (error) {
        const errorResponse = NextResponse.json({error: 'User NOT logged in.'}, {status: 500});
        errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
        errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return errorResponse;
    }
}
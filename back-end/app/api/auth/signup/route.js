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
        const { fullName, email, userName, password } = await request.json()

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
            options: {
                data: {
                    fullName: fullName,
                    userName: userName, 
                }
            }
        })

        if (error) {
            const errorResponse = NextResponse.json({error: error.message}, {status: 400});
            errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
            errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return errorResponse;
        }

        const { data: usersData, error:usersError } = await supabase
            .from('users')
            .insert({
                id: data.user.id,
                full_name: fullName,
                email: email,
                username: userName
            });
        
        if (usersError) {
            console.error('Error creating user in Supabase Database. Error: ', usersError);
            const errorResponse = NextResponse.json({error: 'User not created!'}, {status: 500});
            errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
            errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return errorResponse;
        }

        const response = NextResponse.json ({
            message: 'User was created!',
            user: data.user
        }, 
            {status: 200}
        )
        response.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return response;

    } catch (error) {
        return NextResponse.json({error: 'ERROR, User not created!'}, {status: 500})
    }
}
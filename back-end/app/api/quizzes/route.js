import { NextResponse } from "next/server";
import { supabase } from "../../supabase";
import { createClient } from "@supabase/supabase-js";

async function getAuth(request) {
    const authh = request.headers.get('Authorization');

    if(!authh) {
        throw new Error('ERROR!! Missing auth token!');
    }

    const token = authh.replace('Bearer ', '');

    const authSupabase = createClient(
        process.env.SUPABASE_URL,
        process.env.SUPABASE_KEY,
        {
            global: {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        }
    );

    const { data, error } = await authSupabase.auth.getUser(token);

    if (error || !data.user) {
        throw new Error('ERROR!! Token not valid!')
    }

    return {
        authSupabase: authSupabase,
        userId: data.user.id
    };
}

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
        const { userId, title, questions, count, score } = await request.json()
        const { data, error } = await supabase
            .from('quizzes')
            .insert({
                user_id:userId,
                quiz_title: title,
                num_questions:count,
                questions: questions,
                score: score || 0
            })
        
        if (error) {
            const errorResponse = NextResponse.json({error: error.message}, {status: 400});
            errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
            errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return errorResponse;
        }

        const response =  NextResponse.json ({
            message: 'Quiz was created.',
            quiz: data
        });
        response.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
        response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');

        return response;
    } catch (error) {
        const errorResponse = NextResponse.json({error: 'ERROR, quiz was not created! Try again.'}, {status: 500});
        errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
        errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return errorResponse;
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const userId = searchParams.get('userId');

        if (id) {
            const { data, error } = await supabase
            .from('quizzes')
            .select('*')
            .eq('id', id)
            .single();

            if (error) {
                const errorResponse = NextResponse.json({ error: error.message }, { status: 400 });
                errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
                errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                return errorResponse;
            }

            const response = NextResponse.json({ quiz: data });
            response.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return response;

        }

        if (userId) {
            const { data, error } = await supabase
            .from('quizzes')
            .select('*')
            .eq('user_id', userId);

            if (error) {
                const errorResponse = NextResponse.json({ error: error.message }, { status: 400 });
                errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
                errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
                errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
                return errorResponse;
            }
            const response = NextResponse.json({ quizzez: data });
            response.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
            response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
            response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
            return response;
            
        } 

        const errorResponse = NextResponse.json({ error: "No user id provided, try again."}, { status: 400 });
        errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
        errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return errorResponse;
    } catch (error) {
        const errorResponse = NextResponse.json({ error: 'Server error. Not connected!' }, { status: 500 });
        errorResponse.headers.set('Access-Control-Allow-Origin', 'https://quiz-buddy-web.vercel.app');
        errorResponse.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
        errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
        return errorResponse;
    }
}
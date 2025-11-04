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

        // May not need this as the status 500 is used for errors
        //if (error) {
        //    return NextResponse.json({error: error.message}, {status: 400})
        //}

        return NextResponse.json ({
            message: 'User logged in',
            user: data.user
        })

    } catch (error) {
        return NextResponse.json({error: 'User NOT logged in.'}, {status: 500})
    }
}
import { NextResponse } from "next/server";
import { supabase } from "../supabase";

export async function POST(request) {
    try {
        const { userName, password } = await request.json()

        const { data, error } = await supabase.auth.signInWithPassword({
            userName: userName,
            password: password
        })

        if (error) {
            return NextResponse.json({error: error.message}, {status: 400})
        }

        return NextResponse.json ({
            message: 'User logged in',
            user: data.user
        })

    } catch (error) {
        return NextResponse.json({error: 'User NOT logged in.'}, {status: 500})
    }
}

export async function POST(request) {
    try {
        const { fullName, email, userName, password } = await request.json()

        const { data, error } = await supabase.auth.signUp({
            fullName: fullName,
            email: email,
            userName: userName, 
            password: password
        })

        if (error) {
            return NextResponse.json({error: error.message}, {status: 400})
        }

        return NextResponse.json ({
            message: 'User was created!',
            user: data.user
        })
    } catch (error) {
        return NextResponse.json({error: 'ERROR, User not created!'}, {status: 500})
    }
}
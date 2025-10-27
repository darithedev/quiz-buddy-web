import { NextResponse } from "next/server";
import { supabase } from "../../../supabase";

export async function OPTIONS() {
    return new Response(null, {
        status: 200,
        headers: {
            'Acecss-Control-Allow-Origin': '*',
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
            return NextResponse.json({error: error.message}, {status: 400})
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
            return NextResponse.json({error: 'User not created!'}, {status: 500})
        }

        return NextResponse.json ({
            message: 'User was created!',
            user: data.user
        }, {
            headers: {
                'Acecss-Control-Allow-Origin': '*',
            }
        })
    } catch (error) {
        return NextResponse.json({error: 'ERROR, User not created!'}, {status: 500})
    }
}
import { NextResponse } from "next/server";
import { supabase } from "../../../supabase";

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

        const { data: usersData, error:usersError } = await supabase
            .from('users')
            .insert({
                id: data.user.id,
                full_name: fullName,
                email: email,
                username: userName
                
            });
        
        // May not need this as the status 500 is used for errors
        //if (usersError) {
        //    console.error('Error creating user in Supabase Database. Error: ', usersError);
        //}

        return NextResponse.json ({
            message: 'User was created!',
            user: data.user
        })
    } catch (error) {
        return NextResponse.json({error: 'ERROR, User not created!'}, {status: 500})
    }
}
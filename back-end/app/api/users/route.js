import { NextResponse } from "next/server";
import { supabase } from "../../supabase";

export async function GET(request) {
    try {
        const { searchParms } = new URL(request.url);
        const userId = searchParms.get('userId');

        const { data, error} = await supabase
            .from('users')
            .select('*')
            .eq('id', userId)

        if (error) {
            return NextResponse.json({error: error.message}, {status: 400})
        }

        return NextResponse.json ({
            message: 'User was located',
            user: data
        })
    } catch (error) {
        return NextResponse.json({error: 'ERROR, User is not registed in database'}, {status: 500})
    }
}
import { NextResponse } from "next/server";
import { supabase } from "../../supabase";

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
                score: score
            })
        
        if (error) {
            return NextResponse.json({error: error.message}, {status: 400})
        }

        return NextResponse.json ({
            message: 'Quiz was created.',
            quiz: data
        })
    } catch (error) {
        return NextResponse.json({error: 'ERROR, quiz was not created! Try again.'}, {status: 500})
    }
}

export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');
        const userId = searchParams.get('userId');

        if (id) {
            const { data, error } = await supabase
            .from('quizes')
            .select('*')
            .eq('id', id)
            .single();

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }

            return NextResponse.json({ quiz: data });
        }

        if (userId) {
            const { data, error } = await supabase
            .from('quizzez')
            .select('*')
            .eq('user_id', userId);

            if (error) {
                return NextResponse.json({ error: error.message }, { status: 400 });
            }
            return NextResponse.json({ quizzez: data });
            
        } 

        return NextResponse.json({ error: "No user id provided, try again."}, { status: 400 });
    } catch (error) {
        return NextResponse.json({ error: 'Server error. Not connected!' }, { status: 500 });
    }
}
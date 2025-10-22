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
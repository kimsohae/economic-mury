
import { NextRequest } from "next/server";
import db from '@/lib/db';
import { Answer } from "@/lib/type";

// export async function GET(req:NextRequest, {params}: {params: Promise<{userId:string}>}):Promise<Response> {
//     const searchParams = req.nextUrl.searchParams;
//     const result = searchParams.get("user");
//     return new Response(JSON.stringify({result}), {
//         status: 200,
//     });
// }

export async function POST(req:NextRequest, {params}: {params: Promise<{userId:string}>}):Promise<Response> {
    try{
        const {score, selectedAnswers} = await req.json();
        const userId = (await params).userId;

        const userResult = await insertUser(userId, score);
        const quizResult = await insertQuizAnswer(userId, selectedAnswers);
    
        console.log({userResult, quizResult})

        return new Response(JSON.stringify({}), {
            status: 200,
        });

    } catch (e) {
        console.error(e);
        return new Response(JSON.stringify({}), {
            status: 500,
        })
    }
} 


async function insertUser(userId:string, score:number) {
    console.log(userId, score)
    const result = await db.query(`INSERT INTO "user" (id, score)
     VALUES ('${userId}',${score})`);
    return result;
}

async function insertQuizAnswer(userId:string, selectedAnswers: Answer[]) {
    if(selectedAnswers) {
        const insertValues = selectedAnswers.map(answer => `('${userId}',${answer.quizId},${answer.optionId},${answer.isCorrect})`).join(',');
        const result = db.query(`INSERT INTO "user_answer" (user_id, quiz_id, option_id, is_correct)
         VALUES ${insertValues}`);
        return result;
    } else {
        return [];
    }
}


import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { Answer } from "@/lib/type";
import { getRank } from "@/lib/rank";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
): Promise<NextResponse> {
  const userId = (await params).userId;
  const { score, analysis } = await getUserScoreAndAnalyis(userId);
  const ranking = await getUserRanking(userId);
  const wrongAnswers = await getWrongAnswerWithCorrectRate(userId);

  return NextResponse.json({
    id: userId,
    score,
    analysis,
    rank: getRank(score),
    ranking,
    wrongAnswers,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
): Promise<NextResponse> {
  const { score, selectedAnswers } = await req.json();
  const userId = (await params).userId;

  await insertUser(userId, score);
  await insertQuizAnswer(userId, selectedAnswers);
  const ranking = await getUserRanking(userId);
  const wrongAnswers = await getWrongAnswerWithCorrectRate(userId);

  const response = NextResponse.json({
    id: userId,
    score,
    rank: getRank(score),
    ranking,
    wrongAnswers,
  });

  response.cookies.set("userId", userId, {
    httpOnly: true,
  });

  return response;
}

async function insertUser(userId: string, score: number) {
  const result = await db.query(`INSERT INTO "user" (id, score)
     VALUES ('${userId}',${score})`);
  return result;
}

async function insertQuizAnswer(userId: string, selectedAnswers: Answer[]) {
  if (selectedAnswers) {
    const insertValues = selectedAnswers
      .map(
        (answer) =>
          `('${userId}',${answer.quizId},${answer.optionId},${answer.isCorrect})`
      )
      .join(",");

    const result =
      db.query(`INSERT INTO "user_answer" (user_id, quiz_id, option_id, is_correct)
         VALUES ${insertValues}`);
    return result;
  } else {
    return [];
  }
}

async function getUserScoreAndAnalyis(userId: string) {
  const result = await db.query(
    `SELECT score, analysis FROM "user" WHERE id = '${userId}'`
  );
  return result.rows[0];
}

//TODO: 정답률, 등수 등은 일정 주기로 업데이트하도록 변경

async function getUserRanking(userId: string) {
  const result = await db.query(`WITH ranked_users AS (
        SELECT 
            id, 
            score, 
            RANK() OVER (ORDER BY score DESC) AS position
        FROM "user"
    )
    SELECT 
        ru.position, 
        (SELECT COUNT(*) FROM "user") AS total
    FROM ranked_users ru
    WHERE ru.id = '${userId}';`);

  const ranking = {
    position: result.rows[0].position,
    total: result.rows[0].total,
  };

  return ranking;
}

async function getWrongAnswerWithCorrectRate(userId: string) {
  const result = await db.query(`WITH correct_counts AS (
        SELECT quiz_id, COUNT(*) AS total_attempts,
            SUM(CASE WHEN is_correct = true THEN 1 ELSE 0 END) AS correct_count
        FROM user_answer
        GROUP BY quiz_id
    ),
    user_wrong_answers AS (
        SELECT DISTINCT quiz_id, option_id
        FROM user_answer 
        WHERE user_id = '${userId}' 
            AND is_correct = false
    )
    SELECT uwa.quiz_id, uwa.option_id,  
        COALESCE(cc.correct_count * 100.0 / NULLIF(cc.total_attempts, 0), 0) AS correct_rate
    FROM user_wrong_answers uwa
    LEFT JOIN correct_counts cc ON uwa.quiz_id = cc.quiz_id
    ORDER BY quiz_id ASC;
    `);

  const wrongAnswers = result.rows.map((row) => {
    return {
      quizId: row.quiz_id,
      optionId: row.option_id,
      correctRate: row.correct_rate,
    };
  });

  return wrongAnswers;
}

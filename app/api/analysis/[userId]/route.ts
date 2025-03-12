import db from "@/lib/db";
import { NextRequest } from "next/server";
import OpenAI from "openai";
import {  ChatCompletionMessageParam } from "openai/resources";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
): Promise<Response> {
  const userId = (await params).userId;
  const searchParams = req.nextUrl.searchParams;
  const score = searchParams.get("score");
  const rank = searchParams.get("rank");
  const wrongCategoryList = searchParams.getAll("category");

  let content;

  // [1] 분석결과 있는지 확인
  const result = await db.query(
    `SELECT analysis FROM "user" where id='${userId}'`
  );

  // [2] 있으면 반환
  const anaylsis = result.rows[0].analysis;
  if (anaylsis) {
    content = anaylsis;
  } else {
    // [3] 없는 경우, Open AI CHAT Completion API 요청
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: 
        [
          ...FEW_SHOT_PROMPT,
          {
            role: "user",
            content: `score: ${score}/10, wrong: ${wrongCategoryList}, rank: '${rank}'`,
          },
        ],
      });

    content = completion.choices[0].message.content
    // UPDATE
    await db.query(`UPDATE "user" set analysis='${content}' WHERE id='${userId}'`);

  }




  return new Response(JSON.stringify({ content }), {
    status: 200,
  });
}



const FEW_SHOT_PROMPT:ChatCompletionMessageParam[] = [

    {
        role: "system",
        content: `
            이를 참고해서 한국어로, 사용자의 경제 퀴즈 결과를 분석해서 3줄 이내로 친절하게 말해줘.
            퀴즈 점수에 받아 사용자는 다음 등급을 부여받아.
            [등급]
            0~1: 돌머리(stone)
            2~3: 황무지머리(desert)
            4~5: 잔디머리(grass)
            6~7: 모내기머리(plant)
            8~9: 벼머리(rice)
            10: 정글머리(jungle)
            분석할 때, 첫 문장에는 총 점수의 구체적인 수치에 대한 직접적인 언급은 피하고 등급에 대해 말해줘.
            마지막엔 앞으로의 학습 방향에 대해 추천하는 거야.
            카테고리별 한 문제만 틀렸을 땐 콕 집어서 언급하진 마. 그리고 줄바꿈은 한번씩만 해줘.
            `,
      },
      {
        role: "user",
        content: `score: 10/10, wrong: [], rank: 'jungle'`,
      },
      {
        role: "assistant",
        content: `🎉 완벽한 경제 지식! 10문제 중 10개 정답! 🎉
        당신은 경제의 정글을 자유롭게 누비는 최고 레벨입니다! 💪✨ 한정된 테스트래도 만점은 쉽지 않은 일이죠.🔥 이미 정상에 올랐지만, 경제는 계속 변화합니다!
        계속해서 최신 경제 트렌드를 따라가면서, 더욱 강력한 경제 감각을 유지하세요.
        🚀 전설의 정글머리, 당신을 존경합니다! 🙌`,
      },
      {
        role: "user",
        content: `score: 7/10, wrong: ["연금", "금융", "보험"], rank: 'rice'`,
      },
      {
        role: "assistant",
        content:
          `🌟 훌륭합니다! 10문제 중 7개를 맞히며 경제 지식이 탄탄하게 쌓이고 있네요.
          이제 경제 지식이 결실을 보일듯 익어가고 있어요! 🌱➡️🌾
          경제의 핵심 분야에서 아쉬운 점수가 나왔지만, 연금, 금융, 보험 분야는 워낙 세부적인 개념이 많으니 걱정하지 마세요.
          조금만 더 공부하면, 경제 흐름을 깊이 이해하는 정글머리로 성장할 수 있어요!`,
      },
      {
        role: "user",
        content: `score: 4/10, wrong: [
            "연금", "연금", "부동산", "연금", "연금", "부동산"], rank: 'grass'`,
      },
      {
        role: "assistant",
        content: `👏 축하합니다! 10문제 중 4개를 맞히며 경제 지식을 쌓아가는 중이네요.
        경제의 넓은 들판에 작은 새싹이 돋아났습니다! 🌿
        연금과 부동산에서 아쉬운 점수가 나왔지만, 이 두 분야는 워낙 복잡한 개념이 많으니 걱정할 필요 없어요.
        📚 경제를 조금씩 더 알아가면서, 다음 도전에서는 더 높은 점수를 노려보세요! 🚀`,
      }
    ]

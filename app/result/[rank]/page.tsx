import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

type Params = Promise<{
  rank: string;
}>;

export async function generateStaticParams() {
  return [
    { rank: "1" },
    { rank: "2" },
    { rank: "3" },
    { rank: "4" },
    { rank: "5" },
  ];
}

const RESULT_MAP: {
  [key in `rank${string}`]: { desc: string; title: string };
} = {
  rank1: {
    desc: "경제 상식? 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
  rank2: {
    desc: "바람 불면 머리카락이 날아갈지 몰라요.",
    title: "희미한 솜털머리",
  },
  rank3: {
    desc: "경제지식의 새싹이 나고 있습니다!",
    title: "열심히 심은 새싹머리",
  },
  rank4: {
    desc: "지식이 무르익었네요. 추수의 계절이 다가오고 있습니다!",
    title: "황금빛 벼머리",
  },
  rank5: {
    title: "수풀 가득한 정글머리",
    desc: "머리가 이렇게 풍성할 수 있나요? 대단합니다!",
  },
};

const RESULT = [
  {
    id: " 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
  {
    id: 2,
    desc: "바람 불면 머리카락이 날아갈지 몰라요.",
    title: "희미한 솜털머리",
  },
  {
    id: 3,
    desc: "경제지식의 새싹이 나고 있습니다!",
    title: "열심히 심은 새싹머리",
  },
  {
    id: 4,
    desc: "경제상식? 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
];
export default async function Page({ params }: { params: Params }) {
  const { rank } = await params;
  const { title, desc } = RESULT_MAP[`rank${rank}`];

  return (
    <div>
      <div>
        <div>{desc}</div>
        <span>{title}</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link href="/">
          <Button size="md" variant={"outline"}>
            다시 하기
          </Button>
        </Link>
        <ShareButton title={title} description={desc} url={""} />
      </div>
    </div>
  );
}

import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ShareButton from "@/components/ShareButton";

export type Rank = "bald" | "downy" | "grass" | "plant" | "jungle";

type Params = Promise<{
  rank: Rank;
}>;

export async function generateStaticParams() {
  return [
    { rank: "bald" },
    { rank: "downy" },
    { rank: "grass" },
    { rank: "plant" },
    { rank: "jungle" },
  ];
}

const RESULT_MAP: {
  [key in Rank]: { desc: string; title: string };
} = {
  bald: {
    desc: "경제 상식? 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
  downy: {
    desc: "바람 불면 머리카락이 날아갈지 몰라요.",
    title: "희미한 솜털머리",
  },
  grass: {
    desc: "경제지식의 새싹이 나고 있습니다!",
    title: "열심히 심은 새싹머리",
  },
  plant: {
    desc: "지식이 무르익었네요. 추수의 계절이 다가오고 있습니다!",
    title: "황금빛 벼머리",
  },
  jungle: {
    title: "수풀 가득한 정글머리",
    desc: "머리가 이렇게 풍성할 수 있나요? 대단합니다!",
  },
};

export default async function Page({ params }: { params: Params }) {
  const { rank } = await params;
  const { title, desc } = RESULT_MAP[`${rank}`];

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

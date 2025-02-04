import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
    desc: "",
    title: "",
  },
};

const RESULT = [
  {
    id: " 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
  {
    id: 2,
    desc: "경제상식? 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
  {
    id: 1,
    desc: "경제상식? 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
  {
    id: 1,
    desc: "경제상식? 그런 건 머리에서 반짝거리기만 해요!",
    title: "광택나는 머머리",
  },
];
export default async function Page({ params }: { params: Params }) {
  const { rank } = await params;
  RESULT_MAP[`rank${rank}`];

  return (
    <div>
      <div>
        <div>경제 상식? 그런 건 머리에서 반짝거리기만 해요!</div>
        <span>광택나는 머머리</span>
      </div>
      <div className="flex flex-col items-center gap-2">
        <Link href="/">
          <Button size="lg" variant={"outline"}>
            다시 하기
          </Button>
        </Link>
        <Button size="lg">결과 공유</Button>
      </div>
    </div>
  );
}

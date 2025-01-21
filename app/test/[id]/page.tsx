import React from "react";
import AnswerList from "@/components/AnswerList";

const ANSWER_LIST = [
  {
    id: "a",
    label: "무디스(Moody's)",
  },
  {
    id: "b",
    label: "블룸버그(Bloomberg)",
  },
  {
    id: "c",
    label: "스탠다드앤푸어스(S&P)",
  },
  {
    id: "d",
    label: "피치(FitchRatings)",
  },
];

export default function Test() {
  return (
    <>
      <span className="text-5xl font-bold mb-8">Q1</span>
      <section className="flex flex-col items-center break-keep mx-8 mt-2 mb-12 text-lg">
        {/* <Image src="/Q.png" width={30} height={30} className={"mb-8"} alt="Q" /> */}
        <div className="text-center text-gray-500">
          <span>개인처럼 국가도 신용 평가를 받는데요.</span>
          <br />
          <span>
            세계 3대 신용평가회사에서 국가의 신용을 평가하고 있습니다.
          </span>
          <br />
          <h2 className="font-bold text-gray-800">
            세계 3대 신용평가회사가 아닌 곳은?
          </h2>
        </div>
      </section>
      <section className="grid gap-4 mx-12">
        <AnswerList answers={ANSWER_LIST} />
      </section>
      <div className="absolute bottom-4 w-[calc(100%-2rem)] rounded-lg h-3 bg-slate-200" />
      <div className="absolute bottom-4 left-[1rem] w-[calc(10%)] rounded-lg h-3 bg-primary" />
    </>
  );
}

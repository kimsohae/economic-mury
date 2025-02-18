import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { moneygraphy } from "./layout";

export default function Home() {
  return (
    <>
      {" "}
      <div className="relative w-full flex flex-col items-center">
        <div className="absolute flex flex-col items-center left-[50%] translate-x-[-50%] top-[-44%] w-full">
          <Image
            alt="main"
            // className=""
            width={300}
            height={300}
            src="/img/questionc.png"
            priority
          />
        </div>
        <Image
          className="px-8 w-full max-w-[460px] z-[1]"
          width={663}
          height={693}
          alt="title"
          src="/img/murmury_title.png"
          priority
        />
        {/* <div
          className={`font-moneygraphy text-8xl font-semibold  rotate-[-10deg] m-auto`}
        >
          <div className="">경제</div>
          <div className="text-primary">머머리</div>
          <div>테스트</div>
        </div> */}
      </div>
      <div className="absolute bottom-[30px] flex flex-col items-center justify-center w-full">
        <span className="block text-sm text-gray-400 mb-3 font-pretendard">
          *경제 머머리: 경제머리가 없는 사람
        </span>
        <Link href={"/test"} className="w-full px-4">
          <Button size={"full"}>시작하기</Button>
        </Link>
      </div>
    </>
  );
}

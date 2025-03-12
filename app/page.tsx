import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className="relative w-full flex flex-col items-center ">
        <div className="absolute flex flex-col items-center left-[50%] translate-x-[-50%] top-[-30%] w-full">
          {/* <Image
            priority
            className="absolute w-10 animate-[float_3s_infinite_ease-in-out]"
            width={100}
            height={150}
            src="/img/title_question.png"
            alt="title_question"
          /> */}
          <Image
            priority
            className="animate-[float_3s_infinite_ease-in-out]"
            width={176}
            height={176}
            src="/img/title_logo.webp"
            alt="title_logo"
          />
          {/* <Image
            priority
            // className="animate-[float_3s_infinite_ease-in-out]"
            width={300}
            height={300}
            src="/img/instruction_3.png"
            alt="title_logo"
          /> */}
        </div>
        <Image
          className="px-12 w-full  max-w-[460px] z-[1] max-h-[100%] "
          width={463}
          height={574}
          alt="title"
          src="/img/title.png"
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
          내 경제머리는 지금 어떤 모습일까?
        </span>
        <Link href={"/test"} className="w-full px-4">
          <Button size={"full"}>시작하기</Button>
        </Link>
      </div>
    </>
  );
}

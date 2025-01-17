import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <>
      {" "}
      <div className="relative m-auto">
        <Image
          alt="logo"
          width={400}
          height={200}
          src="/H1.png"
          className="relative z-10 px-4"
        />
        <Image
          alt="main"
          width={140}
          src="/murmury.png"
          height={140}
          className="absolute left-[50%] translate-x-[-50%] top-[-20%]"
        />

        {/* <div className="text-xl font-semibold rotate-[-10deg] m-auto">
    <div className="">경제</div>
    <div className="text-primary">머머리</div>
    <div>테스트</div>
  </div> */}
      </div>
      <div className="absolute bottom-[30px] flex flex-col items-center justify-center w-full">
        <span className="block text-sm text-gray-400 mb-3">
          *경제 머머리: 경제머리가 없는 사람
        </span>
        <Button size={"lg"}>테스트 시작</Button>
      </div>
    </>
  );
}

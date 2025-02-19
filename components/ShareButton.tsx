"use client";
import React, { useEffect } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";

const KAKAO_JS_KEY = process.env.NEXT_PUBLIC_KAKAO_JS_KEY || "";
const initKakao = () => {
  window.Kakao.init(KAKAO_JS_KEY);
};

export type ShareOptions = {
  objectType: "feed";
  content: {
    title: string;
    description: string;
    imageUrl: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  };
  buttons?: {
    title: string;
    link: {
      mobileWebUrl: string;
      webUrl: string;
    };
  }[];
};

interface Props {
  title: string;
  description: string;
  imageUrl: string;
}

export default function ShareButton({ title, description, imageUrl }: Props) {
  const onClickShare = () => {
    if (window.Kakao) {
      const shareUrl = window.location.href;
      const options: ShareOptions = {
        objectType: "feed",
        content: {
          title: title,
          description: description,
          imageUrl: imageUrl,
          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },
      };
      window.Kakao.Share.sendDefault(options);
    } else {
      console.error("window.Kakao not found");
    }
  };

  return (
    <>
      <Button size="full" onClick={onClickShare}>
        결과 공유{" "}
      </Button>
      <Script
        src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js"
        onLoad={initKakao}
      />
    </>
  );
}

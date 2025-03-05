"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";

export default function error() {
  return (
    <div className="flex flex-col gap-4">
      <span>에러가 발생했어요</span>
      <Link href="/">
        <Button size="md" variant={"default"} className="text-white">
          처음으로
        </Button>
      </Link>
    </div>
  );
}

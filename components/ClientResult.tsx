"use client";
import React, { use, useEffect, useState } from "react";
import Result from "@/components/Result";
import { LocalStorageUtility } from "@/lib/utils";
import { Rank, UserResult } from "@/lib/type";
import { fetchUserResult } from "@/lib/fetch";

export default function ClientResult() {
  const [userResult, setUserResult] = useState<UserResult>();
  useEffect(() => {
    const storedResult = LocalStorageUtility.getItem<UserResult>("result");
    if (storedResult) {
      setUserResult(storedResult);
    }
  }, []);

  if (userResult) {
    return <Result userResult={userResult} />;
  }

  return <></>;
}

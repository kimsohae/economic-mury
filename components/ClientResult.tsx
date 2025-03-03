"use client";
import React, { use, useEffect, useState } from "react";
import Result from "@/components/Result";
import { LocalStorageUtility } from "@/lib/utils";
import { Rank } from "@/lib/type";

export default function ClientResult() {
  const [rank, setRank] = useState<Rank>();
  useEffect(() => {
    const storedRank = LocalStorageUtility.getItem<Rank>("rank");
    if (storedRank) {
      setRank(storedRank);
    }
  });

  if (rank) {
    return <Result rank={rank} />;
  }

  return <></>;
}

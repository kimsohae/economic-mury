import { Category } from "@/lib/type";
import React from "react";
import { Badge } from "@/components/ui/badge";

const getCategoryBgClassName = (category: Category) => {
  switch (category) {
    case "macro":
      return "bg-gray-300/30 hover:bg-gray-300/20";
    case "finance":
      return "bg-red-300/30 hover:bg-red-300/20";
    case "pension":
      return "bg-blue-300/30 hover:bg-blue-300/20";
    case "realEstate":
      return "bg-green-300/30 hover:bg-green-300/20";
    case "savings":
      return "bg-yellow-300/30 hover:bg-yellow-300/20";
    case "stocks":
      return "bg-purple-300/30 hover:bg-purple-300/20";
    default:
      return "";
  }
};

export const getCategoryName = (category?: Category) => {
  switch (category) {
    case "macro":
      return "거시경제";
    case "finance":
      return "금융기관";
    case "pension":
      return "연금·퇴직금";
    case "realEstate":
      return "부동산·청약";
    case "savings":
      return "저축";
    case "stocks":
      return "주식·투자";
    default:
      return "";
  }
};

interface Props {
  category: Category;
  className?: string;
}

export default function CategoryBadge({ category, className }: Props) {
  return (
    <Badge className={`${getCategoryBgClassName(category)} ${className}`}>
      {getCategoryName(category)}
    </Badge>
  );
}

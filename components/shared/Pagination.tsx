"use client";

import { PaginationProps } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import { formUrlQuery } from "@/lib/utils";

const Pagination = ({ urlParamName, page, totalPages }: PaginationProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const onClick = (btnType: string) => {
    const pageValue = btnType === "next" ? Number(page) + 1 : Number(page) - 1;

    const newUrl = formUrlQuery({
      params: searchParams.toString(),
      key: urlParamName || "page",
      value: pageValue.toString(),
    });

    router.push(newUrl, { scroll: false });
  };

  return (
    <div className="flex justify-between mx-3">
      <Button
        size="default"
        variant="outline"
        className="bg-white  rounded-2xl"
        onClick={() => onClick("prev")}
        disabled={Number(page) <= 1}
      >
        Back
      </Button>
    
      <Button
        size="default"
        variant="outline"
        className="bg-white  rounded-2xl"
        onClick={() => onClick("next")}
        disabled={Number(page) >= totalPages}
      >
        Next
      </Button>
    </div>
  );
};

export default Pagination;

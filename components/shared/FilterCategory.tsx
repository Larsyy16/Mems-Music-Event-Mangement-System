"use client";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRouter, useSearchParams } from "next/navigation";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { ITag } from "@/lib/database/models/tag.model";
import { getAllTags } from "@/lib/actions/tag.actions";

const FilterCategory = () => {
  const [tags, setTags] = useState<ITag[]>([]);
  const router = useRouter();

  const searchParams = useSearchParams();

  useEffect(() => {
    const getTags = async () => {
      const tagsList = await getAllTags();

      tagsList && setTags(tagsList as ITag[]);
    };
    getTags();
  }, []);

  const onSelectCategory = (category: string) => {
    let newUrl = "";

    if (category && category !== "All") {
      newUrl = formUrlQuery({
        params: searchParams.toString(),
        key: "category",
        value: category,
      });
    } else {
      newUrl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }

    router.push(newUrl, { scroll: false });
  };
  return (
    <Select  onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="w-[180px] select-field">
        <SelectValue placeholder="Tag" className="text-black"/>
      </SelectTrigger>
      <SelectContent className="bg-grey-50 rounded-2xl">
        <SelectItem value="All" className="select-item p-regular-14">
          All
        </SelectItem>
        {tags.map((tag) => (
          <SelectItem
            value={tag.name}
            key={tag.id}
            className="select-item p-regular-14 text-black"
          >
            {tag.name}
          </SelectItem>
        ))}{" "}
      </SelectContent>
    </Select>
  );
};

export default FilterCategory;

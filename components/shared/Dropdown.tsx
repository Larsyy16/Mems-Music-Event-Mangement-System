import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "../ui/input";
import { startTransition, useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ITag } from "@/lib/database/models/tag.model";
import { createTag, getAllTags } from "@/lib/actions/tag.actions";

type DropdownProps = {
  eventChangeHandler?: () => void;
  value?: string;
};

const Dropdown = ({ eventChangeHandler, value }: DropdownProps) => {
  const [tags, setTags] = useState<ITag[]>([]);
  const [newTag, setNewTag] = useState("");

  const handleAddTag = () => {
    createTag({
      name: newTag.trim(),
    }).then((tag) => {
      setTags((prevState) => [...prevState, tag]);
    });
  };

  useEffect(() => {
    const getTags = async () => {
      const tagsList = await getAllTags();

      tagsList && setTags(tagsList as ITag[]);
    };
    getTags();
  }, []);

  return (
    <Select defaultValue={value} onValueChange={eventChangeHandler}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Tag" />
      </SelectTrigger>
      <SelectContent className="bg-white">
        {tags.length > 0 &&
          tags.map((tag) => (
            <SelectItem
              key={tag._id}
              value={tag._id}
              className="select-item p-regular-18 "
            >
              {tag.name}
            </SelectItem>
          ))}

        <AlertDialog>
          <AlertDialogTrigger className="p-medium-18 flex w-full rounded-sm py-3 pl-8 hover:bg-primary-500 text-primary-50 focus:text-primary-50">
            Add Tag
          </AlertDialogTrigger>
          <AlertDialogContent className="bg-primary-50">
            <AlertDialogHeader>
              <AlertDialogTitle>New Tag</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Tag name"
                  className="input-field mt-3"
                  onChange={(e) => setNewTag(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAddTag)}>
                Add
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
};

export default Dropdown;

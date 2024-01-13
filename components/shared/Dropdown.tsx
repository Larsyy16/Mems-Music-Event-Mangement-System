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
  } from "@/components/ui/alert-dialog"
import { Input } from "../ui/input"
import { useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ITag } from "@/lib/database/models/tag.model";
  
  
const Dropdown = () => {

    const [tag, setTag] = useState<ITag[]>([]);
    const [newTag, setNewTag] = useState("");

    // const addTag = () => {
    //     createTailwindMerge()
    // }

  return (

    <Select>
  <SelectTrigger className="select-field">
    <SelectValue placeholder="Tag" />
  </SelectTrigger>
  <SelectContent>

    {}

    <SelectItem value="light">House</SelectItem>
    <SelectItem value="dark">Electro</SelectItem>
    <SelectItem value="system">Rock</SelectItem>


<AlertDialog>
  <AlertDialogTrigger className=" bg-grey-50 p-medium-14 flex w-full rounded-sm py-3 pl-8 text-grey-500 focus:text-primary-500">Add Tag</AlertDialogTrigger>
  <AlertDialogContent className="bg-white">
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
      <AlertDialogAction>Continue</AlertDialogAction>
    </AlertDialogFooter>
  </AlertDialogContent>
</AlertDialog>
</SelectContent>
</Select>
  )
}

export default Dropdown
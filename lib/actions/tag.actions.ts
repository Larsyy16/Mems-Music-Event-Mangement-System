"use server";
import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import { CreateTagParams, CreateUserParams, UpdateUserParams } from "@/types";
import Tag from "../database/models/tag.model";

export async function createTag(tag: CreateTagParams) {
  try {
    await connectToDatabase();

    const newTag = await Tag.create(tag);
    return JSON.parse(JSON.stringify(newTag));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllTags() {
    try {
      await connectToDatabase();
  
      const tags = await Tag.find();
      return JSON.parse(JSON.stringify(tags));
    } catch (error) {
      handleError(error);
    }
  }
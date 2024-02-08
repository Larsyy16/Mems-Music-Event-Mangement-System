"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/event.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import { CreateEventParams, DeleteEventParams, FindAllEventsParams, UpdateEventParams } from "@/types";
import Tag from "../database/models/tag.model";

export async function createEvent({ userId, event, path }: CreateEventParams) {
  try {
    await connectToDatabase();

    const organizer = await User.findById(userId);
    if (!organizer) throw new Error("Organizer not found");

    const newEvent = await Event.create({
      ...event,
      category: event.tags,
      organizer: userId,
    });

    revalidatePath(path);

    return JSON.parse(JSON.stringify(newEvent));
  } catch (error) {
    handleError(error);
  }
}

const populateEvent = (query: any) => {
  return query
    .populate({
      path: "organizer",
      model: User,
      select: "_id firstName lastName",
    })
    .populate({ path: "category", model: Tag, select: "_id name" });
};

// GET ONE EVENT BY ID
export async function getEventById(eventId: string) {
  try {
    await connectToDatabase();

    const event = await populateEvent(Event.findById(eventId));

    if (!event) throw new Error("Event not found");

    return JSON.parse(JSON.stringify(event));
  } catch (error) {
    handleError(error);
  }
}

export async function getAllEvents({query, limit=10, page, category}:FindAllEventsParams) {
  try {
    await connectToDatabase();
    const events = await populateEvent(Event.find({}))
    .limit(limit)
    .skip(0)
    .sort({title:1})
    

    const countEvents = await Event.countDocuments(events)
    // console.log(events)
      return {
        data:JSON.parse(JSON.stringify(events)),
        totalPages: Math.ceil(countEvents / limit)
      }
      
  }catch (error) {
    handleError(error);
  }
}

//i have to get imageURL
//fix no price error

export async function deleteEventById({eventId, path}: DeleteEventParams) {
  try {
    await connectToDatabase();

    const deleteEvent = await Event.findByIdAndDelete(eventId);

    if (deleteEvent) revalidatePath(path);
  } catch (error) {
    handleError(error);
  }
}

// GET ONE EVENT BY ID
export async function updateEvent({ userId, event, path }: UpdateEventParams) {
  try {
    await connectToDatabase()

    const eventToUpdate = await Event.findById(event._id)
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error('Unauthorized or event not found')
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.categoryId },
      { new: true }
    )
    revalidatePath(path)

    return JSON.parse(JSON.stringify(updatedEvent))
  } catch (error) {
    handleError(error)
  }
}
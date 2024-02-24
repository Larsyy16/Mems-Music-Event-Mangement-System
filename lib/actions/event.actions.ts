"use server";

import { revalidatePath } from "next/cache";
import { connectToDatabase } from "@/lib/database";
import Event from "@/lib/database/models/event.model";
import User from "@/lib/database/models/user.model";
import { handleError } from "@/lib/utils";
import {
  CreateEventParams,
  DeleteEventParams,
  FindAllEventsParams,
  GetEventsByUserParams,
  GetSimilarEventsParams,
  UpdateEventParams,
} from "@/types";
import Tag from "../database/models/tag.model";

const getTagByName = async (name: string) => {
  return Tag.findOne({ name: { $regex: name, $options: "i" } });
};

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

export async function getAllEvents({
  query,
  limit = 6,
  page,
  category,
}: FindAllEventsParams) {
  try {
    await connectToDatabase();

    const titleCondition = query
      ? { title: { $regex: query, $options: "i" } }
      : {};
    const categoryCondition = category ? await getTagByName(category) : null;
    const conditions = {
      $and: [
        titleCondition,
        categoryCondition ? { category: categoryCondition._id } : {},
      ],
    };

    const skipAmount = (Number(page) - 1) * limit;
    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

//i have to get imageURL
//fix no price error

export async function deleteEventById({ eventId, path }: DeleteEventParams) {
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
    await connectToDatabase();

    const eventToUpdate = await Event.findById(event._id);
    if (!eventToUpdate || eventToUpdate.organizer.toHexString() !== userId) {
      throw new Error("Unauthorized or event not found");
    }

    const updatedEvent = await Event.findByIdAndUpdate(
      event._id,
      { ...event, category: event.tags },
      { new: true },
    );
    revalidatePath(path);

    return JSON.parse(JSON.stringify(updatedEvent));
  } catch (error) {
    handleError(error);
  }
}

// GET EVENTS BY ORGANIZER
export async function getEventsByUser({
  userId,
  limit = 6,
  page,
}: GetEventsByUserParams) {
  try {
    await connectToDatabase();

    const conditions = { organizer: userId };
    const skipAmount = (page - 1) * limit;

    const eventsQuery = Event.find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit);

    const events = await populateEvent(eventsQuery);
    const eventsCount = await Event.countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(events)),
      totalPages: Math.ceil(eventsCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getSimilarEvents({
  tagId,
  eventId,
}: GetSimilarEventsParams) {
  try {
    await connectToDatabase();

    const conditions = {
      $and: [{ category: tagId }, { _id: { $ne: eventId } }],
    };

    const eventsQuery = Event.find(conditions);

    const events = await populateEvent(eventsQuery);
    // const eventsCount = await Event.countDocuments(conditions)

    return { data: JSON.parse(JSON.stringify(events)) };
  } catch (error) {
    handleError(error);
  }
}

// export async function getAllEvents({query, limit=10, page, category}:FindAllEventsParams) {
//   try {
//     await connectToDatabase();
//     const events = await populateEvent(Event.find({}))
//     .limit(limit)
//     .skip(0)
//     .sort({title:1})

//     const countEvents = await Event.countDocuments(events)
//     // console.log(events)
//       return {
//         data:JSON.parse(JSON.stringify(events)),
//         totalPages: Math.ceil(countEvents / limit)
//       }

//   }catch (error) {
//     handleError(error);
//   }
// }

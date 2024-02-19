"use server";

import {
  CreatePurchaseOrderParams,
  GetPurchaseOrdersByEventParams,
  GetPurchaseOrdersByUserParams,
  PurchaseOrderParams,
} from "@/types";
import { redirect } from "next/navigation";
import Stripe from "stripe";
import { connectToDatabase } from "../database";
import Purchase from "../database/models/purchase.model";
import { handleError } from "../utils";
import Event from "../database/models/event.model";
import { ObjectId } from "mongodb";
import User from "../database/models/user.model";

export const purchaseOrder = async (purchase: PurchaseOrderParams) => {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  const price = purchase.isFree ? 0 : Number(purchase.price) * 100;
  try {
    // Create Checkout Sessions from body params.
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          price_data: {
            currency: "usd",
            unit_amount: price,
            product_data: {
              name: purchase.eventTitle,
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        eventId: purchase.eventId,
        buyerId: purchase.buyerId,
      },
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
      cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
    });
    redirect(session.url!);
  } catch (error) {
    throw error;
  }
};

export const createPurchaseOrder = async (
  purchase: CreatePurchaseOrderParams,
) => {
  try {
    await connectToDatabase();

    const newOrder = await Purchase.create({
      ...purchase,
      event: purchase.eventId,
      buyer: purchase.buyerId,
    });
    console.log(newOrder)

    return JSON.parse(JSON.stringify(newOrder));
  } catch (error) {
    handleError(error);
  }
};

export async function getPurchasesByUser({
  userId,
  limit = 3,
  page,
}: GetPurchaseOrdersByUserParams) {
  try {
    await connectToDatabase();

    const skipAmount = (Number(page) - 1) * limit;
    const conditions = { buyer: userId };

    const purchaseOrders = await Purchase.distinct("event._id")
      .find(conditions)
      .sort({ createdAt: "desc" })
      .skip(skipAmount)
      .limit(limit)
      .populate({
        path: "event",
        model: Event,
        populate: {
          path: "organizer",
          model: User,
          select: "_id firstName lastName",
        },
      });

    const ordersCount =
      await Purchase.distinct("event._id").countDocuments(conditions);

    return {
      data: JSON.parse(JSON.stringify(purchaseOrders)),
      totalPages: Math.ceil(ordersCount / limit),
    };
  } catch (error) {
    handleError(error);
  }
}

export async function getPurchaseOrdersByEvent({
  searchString,
  eventId,
}: GetPurchaseOrdersByEventParams) {
  try {
    await connectToDatabase();

    if (!eventId) throw new Error("Event ID is required");
    const eventObjectId = new ObjectId(eventId);

    const purchases = await Purchase.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "buyer",
          foreignField: "_id",
          as: "buyer",
        },
      },
      {
        $unwind: "$buyer",
      },
      {
        $lookup: {
          from: "events",
          localField: "event",
          foreignField: "_id",
          as: "event",
        },
      },
      {
        $unwind: "$event",
      },
      {
        $project: {
          _id: 1,
          totalAmount: 1,
          createdAt: 1,
          eventTitle: "$event.title",
          eventId: "$event._id",
          buyer: {
            $concat: ["$buyer.firstName", " ", "$buyer.lastName"],
          },
        },
      },
      {
        $match: {
          $and: [
            { eventId: eventObjectId },
            { buyer: { $regex: RegExp(searchString, "i") } },
          ],
        },
      },
    ]);

    return JSON.parse(JSON.stringify(purchases));
  } catch (error) {
    handleError(error);
  }
}

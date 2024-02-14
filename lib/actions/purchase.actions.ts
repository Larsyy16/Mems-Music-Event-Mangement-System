'use server'

import { CreatePurchaseOrderParams, PurchaseOrderParams } from "@/types";
import { redirect } from "next/navigation";
import Stripe from 'stripe'
import { connectToDatabase } from "../database";
import Purchase from "../database/models/purchase.model";
import { handleError } from "../utils";

export const purchaseOrder = async(purchase: PurchaseOrderParams) =>{
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

    const price = purchase.isFree ? 0 : Number(purchase.price) * 100
    try{
      // Create Checkout Sessions from body params.
      const session = await stripe.checkout.sessions.create({
        line_items: [
            {
                price_data: {
                  currency: 'usd',
                  unit_amount: price,
                  product_data: {
                    name: purchase.eventTitle
                  }
                },
                quantity: 1
              },
        ],
        metadata: {
            eventId: purchase.eventId,
            buyerId: purchase.buyerId,
          },
        mode: 'payment',
        success_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/profile`,
        cancel_url: `${process.env.NEXT_PUBLIC_SERVER_URL}/`,
      });
      redirect(session.url!)
    } catch(error) {
        throw error;
    }
    
}

export const createOrder = async (purchase: CreatePurchaseOrderParams) => {
    try {
      await connectToDatabase();
      
      const newOrder = await Purchase.create({
        ...purchase,
        event: purchase.eventId,
        buyer: purchase.buyerId,
      });
  
      return JSON.parse(JSON.stringify(newOrder));
    } catch (error) {
      handleError(error);
    }
  }
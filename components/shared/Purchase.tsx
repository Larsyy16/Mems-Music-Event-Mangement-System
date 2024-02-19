import { IEvent } from "@/lib/database/models/event.model";
import React, { useEffect } from "react";
import { Button } from "../ui/button";
import { loadStripe } from "@stripe/stripe-js";
import { purchaseOrder } from "@/lib/actions/purchase.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

const Purchase = ({ event, userId }: { event: IEvent; userId: string }) => {
  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);
    if (query.get("success")) {
      console.log("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      console.log(
        "Order canceled -- continue to shop around and checkout when you’re ready.",
      );
    }
  }, []);

  const onPurchase = async () => {
    const purchase = {
      eventTitle: event.title,
      eventId: event._id,
      price: event.price,
      isFree: event.isFree,
      buyerId: userId,
    };
    await purchaseOrder(purchase);
  };

  return (
    <form action={onPurchase} method="post">
      <Button type="submit" role="link" className="rounded-2xl button">
        {event.isFree ? "Get Ticket" : "Purchase Ticket"}
      </Button>
    </form>
  );
};

export default Purchase;

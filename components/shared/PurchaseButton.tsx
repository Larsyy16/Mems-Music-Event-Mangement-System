"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { SignedIn, SignedOut, useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import Purchase from "./Purchase";

const PurchaseButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;
  console.log(typeof userId);
  const pastEvent = new Date(event.endDateTime) < new Date();

  return (
    <div>
      {pastEvent ? (
        <p className="p-3 text-primary-5 text-lg"> Sorry, this event has past. </p>
      ) : (
        <>
          <SignedOut>
            <Button asChild className="button rounded-full" size="lg">
              <Link href="/sign-in">Order now</Link>
            </Button>
          </SignedOut>

          <SignedIn>
            <Purchase event={event} userId={userId} />
          </SignedIn>
        </>
      )}
    </div>
  );
};

export default PurchaseButton;

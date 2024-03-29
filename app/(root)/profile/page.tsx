import CardGroup from "@/components/shared/CardGroup";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { getPurchasesByUser } from "@/lib/actions/purchase.actions";
import { IPurchase } from "@/lib/database/models/purchase.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async ({ searchParams }: SearchParamProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const purchases = await getPurchasesByUser({ userId, page: 1 });

  const orderedPurchases =
    purchases?.data.map((purchase: IPurchase) => purchase.event) || [];

  const purchasesPage = Number(searchParams?.ordersPage) || 1;
  const eventsPage = Number(searchParams?.eventsPage) || 1;

  const organizedEvents = await getEventsByUser({ userId, page: eventsPage });

  return (
    <>
      {/* My Tickets */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h1 className="h3-bold text-center sm:text-left text-white">
            My Tickets
          </h1>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/#events">Explore More Events</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <CardGroup
          data={orderedPurchases}
          emptyTitle="No event tickets purchased yet"
          emptyStateSubtext="No worries - plenty of exciting events to explore!"
          collectionType="My_Tickets"
          limit={4}
          page={purchasesPage}
          urlParamName="purchasesPage"
          totalPages={6}
        />
      </section>

      {/* Events Organized */}
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-6 md:py-10">
        <div className="wrapper flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left text-white">
            Events Created
          </h3>
          <Button asChild size="lg" className="button hidden sm:flex">
            <Link href="/events/create"> Make New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <CardGroup
          data={organizedEvents?.data}
          emptyTitle="No events have been created yet"
          emptyStateSubtext="Go create some now"
          collectionType="Events_Organized"
          limit={3}
          page={eventsPage}
          urlParamName="eventsPage"
          totalPages={purchases?.totalPages}
        />
      </section>
    </>
  );
};

export default ProfilePage;

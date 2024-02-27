import CardGroup from "@/components/shared/CardGroup";
import PurchaseButton from "@/components/shared/PurchaseButton";
import { Separator } from "@/components/ui/separator";
import { getEventById, getSimilarEvents } from "@/lib/actions/event.actions";
import { EventSearchParams } from "@/types";
import Image from "next/image";
import React from "react";

const EventDetails = async ({
  params: { id },
  searchParams,
}: EventSearchParams) => {
  const event = await getEventById(id);

  const similarEvents = await getSimilarEvents({
    tagId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });
  return (
    <>
      <section className="bg-gray-100 wrapper">
        <h1 className="h1-bold mx-2 pt-2 px-4">{event.title}</h1>
        <Separator />

        <div className="bg-gray-5 p-8 rounded-lg shadow-md">
          <p className="text-gray-700 text-lg mb-4">
            Organizer: {event.organizer.firstName} {event.organizer.lastName}
          </p>

          <Image
            src={event.imageUrl}
            alt={event.title}
            className="mb-4 rounded-lg shadow-md"
            width={400}
            height={400}
          />
          <h2 className="h2-medium font-bold underline py-2"> Details</h2>
          <p className="text-gray-700 text-lg mb-4">{event.description}</p>
          <div className="flex items-center mb-4">
            <Image
              src="/assets/icons/location-grey.svg"
              width={24}
              height={24}
              alt="location"
            />
            <p className="text-gray-700 text-lg mx-1">{event.location}</p>
          </div>
          <div className="flex items-center">
            <Image
              src="/assets/icons/clock.svg"
              width={24}
              height={24}
              alt="location"
              className="mr-2"
            />
            <div>
              <p className="text-gray-700 inline-block">
                Start Time: {new Date(event.startDateTime).toLocaleString()}
              </p>
              <p className="text-gray-700 ">
                End Time: {new Date(event.endDateTime).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="flex items-center my-4">
            <p className="p-bold-20 text-green-700 bg-green-100 px-4 rounded-2xl mx-3">
              {" "}
              {event.isFree ? "Free" : `$${event.price}`}
            </p>
            <p className="text-white bg-primary-5000 rounded-2xl inline-block px-3 py-1">
              {event.category.name}
            </p>
          </div>
          <div className="flex items-center mb-4">
            <Image
              src="/assets/icons/link.svg"
              width={24}
              height={24}
              alt="location"
            />

            <p className="text-gray-700 text-lg text-fit mx-2">
              {" "}
              <a href={event.url} className="text-blue-500 hover:underline">
                {event.url}
              </a>
            </p>
          </div>
          <PurchaseButton event={event} />
        </div>
      </section>

      <section className="wrapper bg-grey-50">
        <h2 className="h2-bold mb-2 px-4"> Similar Events</h2>
        <CardGroup
          data={similarEvents?.data}
          emptyTitle="No events found."
          emptyStateSubtext="Check back soon!"
          collectionType="All_Events"
          limit={3}
          page={searchParams.page as string}
          totalPages={similarEvents?.totalPages}
        />
      </section>
    </>
  );
};

export default EventDetails;

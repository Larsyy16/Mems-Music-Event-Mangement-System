import { Separator } from "@/components/ui/separator";
import { getEventById } from "@/lib/actions/event.actions";
import { EventSearchParams } from "@/types";
import Image from "next/image";
import React from "react";

const EventDetails = async ({
  params: { id },
  searchParams,
}: EventSearchParams) => {

  const Event = await getEventById(id);

  return (
    <section className="bg-gray-100 wrapper">
            <h1 className="h1-bold mx-2 pt-2 ">{Event.title}</h1>
            <Separator />

<div className="bg-gray-5 p-8 rounded-lg shadow-md">
      <p className="text-gray-700 text-lg mb-4">Organizer: {Event.organizer.firstName} {Event.organizer.lastName}</p>

      <Image src={Event.imageUrl} alt={Event.title} className="mb-4 rounded-lg shadow-md" 
      width={400}
      height={400}/>
      <h2 className="h2-medium font-bold underline py-2"> Details</h2>
      <p className="text-gray-700 text-lg mb-4">{Event.description}</p>
      <div className="flex items-center mb-4">
      <Image src="/assets/icons/location-grey.svg" width={24} height={24} alt="location" />
        <p className="text-gray-700 text-lg mx-1">{Event.location}</p>
      </div>
      <div className="flex items-center">
      <Image src="/assets/icons/clock.svg" width={24} height={24} alt="location" className="mr-2" />
        <div>
        <p className="text-gray-700 text-lg text-fit inline-block">Start Time: {new Date(Event.startDateTime).toLocaleString()}</p>
        <p className="text-gray-700 text-lg text-fit">End Time: {new Date(Event.endDateTime).toLocaleString()}</p>
        </div>
      </div>
      <div className="flex items-center my-4">

      <p className="p-bold-20 text-green-700 bg-green-100 px-4 rounded-2xl mx-3"> {Event.isFree ? 'Free' : `$${Event.price}`}</p>
      <p className="text-white bg-primary-5000 rounded-2xl inline-block px-3 py-1">{Event.category.name}</p>

      </div>
      <div className="flex items-center mb-4">
      <Image src="/assets/icons/link.svg" width={24} height={24} alt="location" />

      <p className="text-gray-700 text-lg text-fit mx-2"> <a href={Event.url} className="text-blue-500 hover:underline">{Event.url}</a></p>
      </div>
    </div>
    </section>
  );
};

export default EventDetails;

import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

import { auth } from "@clerk/nextjs";
import React from "react";
import CardGroup from "@/components/shared/CardGroup";
import { getAllEvents } from "@/lib/actions/event.actions";

export default async function Home() {

  const findEvents = {
    query:'',
    limit:3,
    totalPages:6
  }

  const events = await getAllEvents(findEvents)


  return (
    <>
      <section className="bg-primary-50 bg-contain py-5 md:py-10">
        <div className="wrapper grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-8">
            <h1 className="h1-bold text-white">
              Empower your music event experience.
            </h1>
            <p className="p-regular-20 md:p-regular-24 text-white">
              Effortlessly create, manage, and discover concerts, shows, and
              events.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore shows</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/memsHero.png"
            alt="hero"
            width={1200}
            height={1200}
            // className="max-h-[70vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>

      <section
        id="events"
        className="wrapper my-8 flex flex-col gap-8 md:gap-12 text-white"
      >
        <h2 className="h2-bold text-white">
          Elevating Moments: <br /> At Your Fingertips
        </h2>
        <div className="flex w-full flex-col gap-5 md:flex-row text-white">
          {/* search filter */}
          <CardGroup data={events} emptyTitle='No events found.'
          emptyStateSubtext="Check back soon!" collectionType='idk'
          limit={5} page={1} totalPages={5}/>
        </div>
        Events will be here {"(soon)"}
      </section>
    </>
  );
}

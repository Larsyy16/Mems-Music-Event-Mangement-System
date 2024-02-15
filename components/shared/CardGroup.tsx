import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";

type CardGroupProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  collectionType: "Events_Organized" | "My_Tickets" | "All_Events";
  limit: number;
  page: number;
  totalPages?: number;
  urlParamName?: string;
};

const CardGroup = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  collectionType,
  page,
  totalPages,
  urlParamName,
}: CardGroupProps) => {
  // console.log(data)

  // const group = data[0]
  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-10">
          <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10">
            {data.map((event) => {
              const hasOrderLink = collectionType === "Events_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="flex justify-center">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      ) : (
        <div>
          <h3> {emptyTitle}</h3>
          <p> {emptyStateSubtext}</p>
        </div>
      )}
    </>
  );
};

export default CardGroup;

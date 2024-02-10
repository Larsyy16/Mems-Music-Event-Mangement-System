export type CreateUserParams = {
  clerkId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  photo: string;
  lastSignIn: Date;
};

export type UpdateUserParams = {
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
  lastSignIn: Date;
};

export type CreateTagParams = {
  name: string;
};

export type CreateEventParams = {
  userId: string;
  event: {
    title: string;
    description: string;
    location: string;
    imageUrl: string;
    startDateTime: Date;
    endDateTime: Date;
    tags: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type UpdateEventParams = {
  userId: string;
  event: {
    _id: string;
    title: string;
    imageUrl: string;
    description: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    tags: string;
    price: string;
    isFree: boolean;
    url: string;
  };
  path: string;
};

export type EventSearchParams = {
  params: { id: string };
  searchParams: { [key: string]: string | string | undefined };
};

export type FindAllEventsParams = {
  
    query: string;
    limit:number;
    totalPages:number;
}

export type DeleteEventParams = {
  eventId : string;
  path : string;
}

export type SearchParamProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type GetEventsByUserParams = {
  userId: string;
  limit?: number;
  page: number;
};

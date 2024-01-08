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


  export type Event = {
    _id: string;
    title: string;
    description: string;
    price: string;
    isFree: boolean;
    imageUrl: string;
    location: string;
    startDateTime: Date;
    endDateTime: Date;
    url: string;
    organizer: {
      _id: string;
      firstName: string;
      lastName: string;
    };
    category: {
      _id: string;
      name: string;
    };
  };
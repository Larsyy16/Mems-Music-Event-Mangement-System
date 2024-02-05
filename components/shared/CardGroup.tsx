import { IEvent } from '@/lib/database/models/event.model';
import React from 'react'
import Card from './Card';

type CardGroupProps = {
    data: IEvent[];
    emptyTitle: string;
    emptyStateSubtext:string;
    collectionType:string;
    limit:number;
    page:number;
    totalPages:number;
  };

const CardGroup = ({data, emptyTitle, emptyStateSubtext, collectionType, limit, page, totalPages}:CardGroupProps) => {
  
  // console.log(data)

  // const group = data[0]
  return (
    <div>
      <ul>
      {
  data.map((event) => {
    // console.log('yo');
    // console.log(event);

    return (
      <li key={event._id} className='flex justify-center'>
        <Card event={event}></Card>
      </li>
    );
  })
}

      </ul>

    </div>

  )
}

export default CardGroup
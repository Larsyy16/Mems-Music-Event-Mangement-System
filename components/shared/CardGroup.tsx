import { IEvent } from '@/lib/database/models/event.model';
import React from 'react'

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
  
  const collection = data.map(event=>(
    event.title
  ))
  return (
    <div>
      {collection}

    </div>
  )
}

export default CardGroup
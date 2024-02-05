import { IEvent } from '@/lib/database/models/event.model'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type CardProps = {
    event:IEvent
}

const Card = (event:CardProps) => {

    console.log('ay')
    console.log(event.event.imageUrl)
  return (
    <div>
        <Link
            href={`/events/${event.event._id}`}
            style={{backgroundImage: `url(${event.event.imageUrl})`}}
        >
          
          <Image src={event.event.imageUrl} width={200} height={200} alt='event image'></Image>

        </Link>
    </div>
  )
}

export default Card
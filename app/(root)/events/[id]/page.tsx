import { getEventById } from '@/lib/actions/event.actions'
import { EventSearchParams } from '@/types'
import Image from 'next/image'
import React from 'react'

const EventDetails = async ({params:{id}, searchParams}:EventSearchParams) => {

  console.log(id)

  const Event = await getEventById(id)
  console.log(Event)

  return (
   <section className='flex flex-grow flex-col items-center justify between'> 
    <div className='px-5 w-full border-b bg-white py-2 lg:py-6'>
      <h1 className='h1-bold'>{Event.title}</h1>
      <div className='mt-4 flex lg:mt-5'>

      <p className='p-medium-16'> Hosted by:<br/> <b>{Event.organizer.lastName +' ' + Event.organizer.firstName}</b></p>
      </div>
      <p className=' inline-block p-bold-16 rounded-full bg-purple-500/10 px-4 py-2.5 mt-2 text-grey-500'> Tags: {Event.category.name}</p>

      <div className='flex w-full flex-col items-center justify-between border-t border-gray2 lg:px-5'>

        <div className='md:max-w-screen bg-gray-100 overflow-hidden '>
          {/* <div className='flex flex-grow flex-col lg:mt-5 lg:max-w-2xl '> */}
      <Image
                src={Event.imageUrl}
                alt="event image"
                width={300}
                height={300}
                className="mt-0 lg:mt-8 overflow-auto w-3/4"> 
      </Image>
      {/* </div> */}
      <div className='px-6 sm:px-4 xl:px-0 md:max-w-screen mt-5 w-full'>
      <h2 className='h2-bold'>Details</h2>
      <p className='p-medium-16'> {Event.description}</p>
      <span className='p-medium-16'>{new Date(Event.startDateTime).toLocaleString()}</span>
        <p className='.p-medium-16'> {Event.location} </p>

<span className='.p-medium-16'> ${Event.price? Event.price : Event.isFree} </span>
<p className='.p-medium-16'> {Event.url}</p>


      </div>
      </div>



      </div>

      <div>

      </div>
    </div>
    </section>

    )
}

export default EventDetails
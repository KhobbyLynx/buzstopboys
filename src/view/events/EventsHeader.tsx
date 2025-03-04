'use client'
import React from 'react'

import { Typography } from '@material-tailwind/react'

export function EventsHeader() {
  return (
    <section className="mx-auto py-10">
      <div className="mb-10 grid place-items-center text-center">
        <Typography variant="h2" color="blue-gray" className="my-3">
          Cleaning Ghana, One Step at a Time
        </Typography>
        <Typography variant="lead" className="!text-gray-500 lg:w-6/12">
          Join us as we take action to keep our communities clean and safe! BuzStopBoys is dedicated
          to transforming public spaces through cleanup projects, community engagement, and
          awareness campaigns. Check out our upcoming events and be part of the change.
        </Typography>
        <Typography variant="h4" className="my-3 text-blue-400">
          You can volunteer to any listed Event
        </Typography>
      </div>
    </section>
  )
}

export default EventsHeader

import { Typography, IconButton, Input, Button } from '@material-tailwind/react'
import React from 'react'

const Newsletter = () => {
  return (
    <div className="flex !w-full py-10 mb-5 md:mb-20 flex-col justify-center !items-center bg-gray-900 container max-w-6xl mx-auto rounded-2xl p-5 bg-[url('/images/banner/cover7.jpg')] bg-right-bottom bg-cover bg-no-repeat">
      <Typography className="text-2xl md:text-3xl text-center font-bold " color="white">
        Join our community!
      </Typography>
      <Typography color="white" className=" md:w-7/12 text-center my-3 !text-base">
        Stay updated on our mission to create cleaner, healthier communities! Subscribe to our
        newsletter for the latest updates, upcoming events, transformation stories, and ways to get
        involved.
      </Typography>
      <div className="mt-8 w-full flex flex-col items-center justify-center gap-4 md:flex-row">
        <div className="w-full md:w-80">
          <Input label="Email" color="white" crossOrigin={''} />
        </div>
        <Button size="md" className="w-full md:w-60 lg:w-32" fullWidth color="white">
          subscribe
        </Button>
      </div>
    </div>
  )
}

export default Newsletter

'use client'

import AboutCard from '@/components/about-card'
import { AppDispatch, RootState } from '@/store'
import { getActivities } from '@/store/slides/activities'
import { Typography } from '@material-tailwind/react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// const ACTIVITIES_INFO = [
//   {
//     title: 'Our Transformation Process',
//     desc: 'We identify unclean areas, deploy cleaning teams equipped with sustainable tools, and work closely with community members to restore spaces into clean, vibrant environments.',
//     caption: 'From Neglect to Renewal',
//     img: 'cover2',
//   },
//   {
//     title: 'Empowering Communities for Change',
//     desc: 'Organizing hygiene education programs, engaging local volunteers, and creating partnerships to sustain cleanliness efforts long-term.',
//     caption: 'Community Outreach',
//     img: 'cover3',
//   },
// ]

export function AboutSection() {
  const store = useSelector((state: RootState) => state.activities)
  const { activities } = store

  const ACTIVITIES_INFO = activities.slice(0, 2)
  const BIG_BANNER = activities[2]

  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    if (activities.length === 0) {
      dispatch(getActivities())
    }
  }, [dispatch, activities.length])

  return (
    <section className="mx-auto flex flex-col items-center py-10 md:py-20 px-8 lg:px-16 bg-gray-100 dark:bg-gray-800 dark:text-white">
      <Typography variant="h6" className="text-center mb-2" color="blue">
        About BuzStopBoys
      </Typography>
      <Typography variant="h3" className="text-center" color="blue-gray">
        Vision | Mission
      </Typography>
      <Typography
        variant="lead"
        className="mt-2 lg:max-w-4xl mb-8 w-full text-center font-normal !text-gray-500"
      >
        BuzStopBoys is a dedicated non-governmental organization committed to transforming unclean
        areas into clean, healthy environments. Our mission is to promote public hygiene and
        environmental sustainability by transforming neglected and unclean areas into healthy
        spaces.
      </Typography>
      <div className="mt-8 w-full grid grid-cols-1 md:grid-cols-2 gap-4 ">
        {ACTIVITIES_INFO.map((props, idx) => (
          <AboutCard key={idx} {...props} />
        ))}
        <div className="md:col-span-2">
          <AboutCard {...BIG_BANNER} />
        </div>
      </div>
    </section>
  )
}

export default AboutSection

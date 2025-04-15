'use client'
import FeedbackCard from './feedback-card'
import { Typography, Container } from '@mui/material'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay, Pagination } from 'swiper/modules'
import { motion } from 'framer-motion'
import { useTheme } from '../theme-provider-layout'

type Feedback = {
  name: string
  job: string
  feedback: string
  star: number
  img: string
}

const FEEDBACKS: Feedback[] = [
  {
    name: 'John Doe',
    job: 'Software Engineer',
    feedback:
      'BuzStopBoys has done an incredible job transforming our neighborhood park. Their dedication is truly inspiring!',
    star: 5,
    img: '/images/avatars/avatar2.jpg',
  },
  {
    name: 'Jane Smith',
    job: 'Teacher',
    feedback:
      'The cleanliness of our community has significantly improved thanks to their efforts. Keep up the great work!',
    star: 3,
    img: '/images/avatars/avatar1.jpg',
  },
  {
    name: 'Samuel Opoku',
    job: 'Entrepreneur',
    feedback:
      "I appreciate their mission, but there's still room for improvement in organizing volunteers.",
    star: 4,
    img: '/images/avatars/avatar3.jpg',
  },
  {
    name: 'Ama Mensah',
    job: 'Nurse',
    feedback: "Fantastic initiative! I'm happy to see such impactful work in our community.",
    star: 5,
    img: '/images/avatars/avatar-blank.png',
  },
]

export function Feedback() {
  const { mode } = useTheme()

  return (
    <section className="py-16 md:py-24">
      <Container maxWidth="lg">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Typography
            variant="subtitle1"
            color="primary"
            sx={{
              fontWeight: 600,
              mb: 2,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            Testimonials
          </Typography>

          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 3,
              fontSize: { xs: '2rem', md: '2.5rem' },
            }}
          >
            We Value Your Feedback
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: '700px',
              mx: 'auto',
              fontSize: '1.1rem',
            }}
          >
            Help us improve and make a greater impact in our communities. Your thoughts and
            experiences matter to us.
          </Typography>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Swiper
            modules={[Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
              1280: {
                slidesPerView: 4,
              },
            }}
            className={`testimonial-swiper py-8 ${mode === 'dark' ? 'dark-swiper' : ''}`}
          >
            {FEEDBACKS.map((feedback, index) => (
              <SwiperSlide key={index}>
                <FeedbackCard {...feedback} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </Container>
    </section>
  )
}

export default Feedback

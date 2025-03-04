'use client'

import { useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import { Button } from '@mui/material'
import IconifyIcon from '@/components/icon'

const images = [
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042431/buzstopboys/merch/orange1_eurewb.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042456/buzstopboys/merch/context_ptp3sz.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042534/buzstopboys/merch/life1_u1wai9.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042428/buzstopboys/merch/blue2_n85gqr.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042472/buzstopboys/merch/Front_gxebiu.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042490/buzstopboys/merch/contextBlack_y8e1rm.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042487/buzstopboys/merch/contextPink_crapig.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042541/buzstopboys/merch/front3_wcvpod.jpg',
  'https://res.cloudinary.com/khobbylynx/image/upload/v1741042506/buzstopboys/merch/Duo_mnxugo.jpg',
]

const shapes = ['rounded-lg', 'rounded-full', 'rounded-xl', 'rounded-2xl']

const Gallery = () => {
  const router = useRouter()

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-4 pt-10">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold">🚀 BuzStopBoys Product Shop</h1>
        <p className="text-lg text-gray-600 dark:text-gray-400 mt-2">
          ✨ Coming Soon – Support the Cause with Every Purchase!
        </p>
      </header>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {images.map((src, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`overflow-hidden shadow-lg ${shapes[index % shapes.length]}`}
          >
            <img
              src={src}
              alt={`Gallery Image ${index + 1}`}
              className="w-full h-64 object-cover"
            />
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        {/* Back Button */}
        <Button
          startIcon={<IconifyIcon icon="mingcute:back-fill" />}
          onClick={() => router.push('/')}
          variant="outlined"
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-800"
        >
          Back
        </Button>
      </div>
    </div>
  )
}

export default Gallery

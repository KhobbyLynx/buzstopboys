'use client'
import Image from 'next/image'
import { Button } from '@material-tailwind/react'

export function FixedPlugin() {
  return (
    <a href="https://samueltetteh.netlify.app/" target="_blank">
      <Button
        color="white"
        size="sm"
        className="!fixed bottom-4 left-4 flex gap-1 pl-2 items-center border z-[99]"
      >
        <Image
          width={128}
          height={128}
          className="w-5 h-5"
          alt="Lynx"
          src="/images/partners/lynxnet_black.svg"
        />{' '}
        Made With 💖 by Lynxnet Innovations
      </Button>
    </a>
  )
}

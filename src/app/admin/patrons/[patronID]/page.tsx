'use client'
import { useParams } from 'next/navigation'
import React from 'react'

function PatronDetails() {
  const { patronId } = useParams() as { patronId: string }
  return (
    <div>
      {`${patronId} details`}
    </div>
  )
}

export default PatronDetails
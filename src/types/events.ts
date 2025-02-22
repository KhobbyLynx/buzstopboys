export type EventProps = {
  _id: string // MongoDB ObjectId as a string
  id: string // Activity ID
  title: string
  desc: string
  img: string
  hashTags: string[]
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  caption: string
  venue: string
  status: 'upcoming' | 'past' | 'suspended'
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  __v: number // Version key
}

export type AddEventType = {
  title: string
  desc: string
  hashTags: string[]
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  caption: string
  venue: string
  img: string | null
  status: 'upcoming' | 'past' | 'suspended'
}
export type EditEventType = {
  title: string
  desc: string
  hashTags: string[]
  startDate: string
  endDate: string
  startTime: string
  endTime: string
  caption: string
  venue: string
  img: string | null
  status: 'upcoming' | 'past' | 'suspended'
}

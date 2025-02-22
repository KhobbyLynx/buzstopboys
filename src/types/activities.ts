export type ActivityProps = {
  _id: string // MongoDB ObjectId as a string
  id: string // Activity ID
  title: string
  desc: string
  caption: string
  imgs: string[]
  videoUrls: string[]
  details: string[]
  icon: string
  createdAt: string // ISO date string
  updatedAt: string // ISO date string
  __v: number // Version key
}

export type EditActivityType = {
  title: string
  desc: string
  caption: string
}

export type AddActivityType = {
  title: string
  desc: string
  videoUrls: string[]
  details: string[]
  caption: string
  icon: string
  imgs: string[]
}

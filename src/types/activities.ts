export type ActivityProps = {
    _id: string; // MongoDB ObjectId as a string
    id: string; // Activity ID  
    title: string;
    desc: string;
    imgs: string[];
    videoUrls: string[];
    details: string[];
    caption: string;
    icon: string;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number; // Version key
}

export type EditActivityType = {
    id: string; // Activity ID
    title: string;
    desc: string;
    imgs: string[];
    videoUrls: string[];
    details: string[];
    caption: string;
    icon: string
}

export type AddActivityType = {
    title: string
    desc: string
    videoUrls: string[]
    details?: string[]
    caption?: string
    icon: string
}
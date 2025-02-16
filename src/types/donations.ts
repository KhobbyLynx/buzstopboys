type CampaignStatus = 'active' | 'suspended' | 'completed'

export type DonationCampaignProps = {
    _id: string; // MongoDB ObjectId as a string
    id: string; // Campaign ID
    title: string; 
    desc: string;
    img: string; 
    raised: number; 
    target: number; 
    status: CampaignStatus;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number; // Version key
}

export type DonationOptionsProps = { 
    _id?: string; // MongoDB ObjectId as a string
    id: string; // Donation option ID
    name: string;
    amount: number; 
    amountRaised: number;
    numberOfDonors: number;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number; // Version key
}

export type DonationOptionType =  {
    name?: string
    amount?: number
}

export type EditDonationOptionType =  {
    name?: string
    amount?: number
    numberOfDonors?: number
    amountRaised?: number
}
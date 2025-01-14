import { ACTIVITIES } from "@/data"
import { redirect } from "next/navigation"

export async function GET(Request: Request, { params }: { params: { activitiesId: string } }) {

    if( Number(params.activitiesId) > ACTIVITIES.length ){
        redirect("/donate/api")
    }

    const activity = ACTIVITIES.find((activity) => activity.id === parseInt(params.activitiesId))
    return  Response.json(activity)
}

export async function PATCH(Request: Request, { params }: {params: {activitiesId: string}}) {
    const activity = ACTIVITIES.find(activity => activity.id === Number(params.activitiesId))
    const body = await Request.json()
    const { title } = body

    return Response.json({
        ...activity,
        title
    })
}

export async function DELETE(Request: Request, { params } : { params: {activitiesId : string}}) {
    const activityIdx = ACTIVITIES.findIndex(activity => activity.id === parseInt(params.activitiesId))

    ACTIVITIES.splice(activityIdx, 1)
}
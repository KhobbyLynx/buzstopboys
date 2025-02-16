import Activity from "@/models/activity.model";
import { ActivityProps } from "@/types/activities";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: { params: { activityId: string } }) {
    try {
        const { activityId } = context.params; // Await params

        // Fetch activity and convert to a plain object
        const activity = await Activity.findOne({ id: activityId }).lean();

        console.log('@ROute', {activity, activityId})
        if (!activity) {
            return new Response(JSON.stringify({ message: "Activity not found" }), {
                status: 404,
                headers: { "content-type": "application/json" },
            });
        }

        return new Response(JSON.stringify(activity), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error fetching single activity:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { "content-type": "application/json" },
        });
    }
}

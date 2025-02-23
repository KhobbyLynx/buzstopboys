import Event from "@/models/events.model";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest, context: { params: Promise<{ eventId: string }> }) {
    try {
        const { eventId } = await context.params; // Await params

        // Fetch event and convert to a plain object
        const event = await Event.findOne({ id: eventId }).lean();

        console.log('@Route', { event, eventId });
        if (!event) {
            return new Response(JSON.stringify({ message: "Event not found" }), {
                status: 404,
                headers: { "content-type": "application/json" },
            });
        }

        return new Response(JSON.stringify(event), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (error: any) {
        console.error("Error fetching single event:", error);
        return new Response(JSON.stringify({ message: error.message }), {
            status: 500,
            headers: { "content-type": "application/json" },
        });
    }
}
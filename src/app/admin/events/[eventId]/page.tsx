'use client'
import { AppDispatch, RootState } from "@/store";
import { singleEvent } from "@/store/events";
import Head from "next/head";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const EventDetails = () => {
    const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const selectedEvent = useSelector((state: RootState) => state.events.selectedEvent)

  const { eventId } = useParams() as { eventId : string }

  useEffect(()=> {
    dispatch(singleEvent(eventId))
  }, [ dispatch, eventId ])

  if (!selectedEvent) {
    return <div className="text-center text-red-500">Event not found.</div>;
  }

  return (
    <>
      <Head>
        <title>{selectedEvent.title} | BuzStopBoys</title>
        <meta name="description" content={selectedEvent.desc} />
        <meta property="og:image" content={selectedEvent.img} />
      </Head>

      <div className="max-w-4xl mx-auto p-6">
        {/* Event Image */}
        <div className="relative w-full h-64 md:h-96">
          <Image src={selectedEvent.img || null} alt={selectedEvent.title || 'eventImage'} fill className="object-cover rounded-lg" />
        </div>

        {/* Event Title */}
        <h1 className="text-3xl font-bold mt-6">{selectedEvent.title}</h1>

        {/* Event Caption */}
        <p className="text-lg italic text-gray-600 mt-2">{selectedEvent.caption}</p>

        {/* Event Details */}
        <div className="mt-4 bg-gray-100 p-4 rounded-lg shadow-md">
          <p className="text-gray-700">{selectedEvent.desc}</p>
          <p className="mt-2"><strong>📍 Venue:</strong> {selectedEvent.venue}</p>
          <p><strong>📅 Date:</strong> {selectedEvent.startDate} - {selectedEvent.endDate}</p>
          <p><strong>⏰ Time:</strong> {selectedEvent.startTime} - {selectedEvent.endTime}</p>
          <p className={`mt-2 font-bold ${selectedEvent.status === "upcoming" ? "text-green-600" : "text-red-500"}`}>
            Status: {selectedEvent?.status?.toUpperCase()}
          </p>
        </div>

        {/* Hashtags */}
        <div className="mt-4 flex gap-2">
          {selectedEvent?.hashTags?.map((tag, index) => (
            <span key={index} className="px-3 py-1 bg-blue-500 text-white text-sm rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Back Button */}
        <button
          onClick={() => router.push("/admin/events")}
          className="mt-6 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Back to Events
        </button>
      </div>
    </>
  );
};

export default EventDetails;
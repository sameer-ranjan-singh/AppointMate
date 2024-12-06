import { getUserEvents } from "@/actions/events"
import EventCard from "@/components/event-card"
import { Suspense } from "react"

export default function EventPage() {
  return (
    <Suspense fallback={<div>Loading Events ...</div>}>
      <Events/>
    </Suspense>
  )
}
const Events = async () => {
  const {events, username} = await getUserEvents()

  if(events.length === 0){
    return <p>You haven't created any event yet</p>
  }
  return (
    <div className="grid gap-4 grid-col-1 md:grid-cols-2">
      {events?.map((event)=> (
        <EventCard key={event.id} event={event} username={username} isPublic={false}/> // DIY : added isPublic
      ))}
    </div>
  )
}

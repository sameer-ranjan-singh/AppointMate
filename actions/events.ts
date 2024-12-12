"use server"

import { eventSchema } from "@/app/lib/validators";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { addDays, addMinutes, format, isBefore, parseISO, startOfDay } from "date-fns"

export async function createEvent(data:any){
  const {userId} = await auth()
  if(!userId){
    throw new Error("Unauthorized, userId not found")
  }

  const validatedData = eventSchema.parse(data)
  const user = await db.user.findUnique({where: {clerkUserId : userId}})
  
  if(!user){
    throw new Error(`User not found for clerkId :${userId}`)
  }
  
  const event = await db.event.create({
    data:{
        ...validatedData,
        userId: user.id
    }
  })
  console.log("event created :", event)
  return event

}

export async function getUserEvents(){

 const {userId} = await auth()
  if(!userId){
    throw new Error("Unauthorized, userId not found")
  }

  const user = await db.user.findUnique({where: {clerkUserId : userId}})
  
  if(!user){
    throw new Error(`User not found for clerkId :${userId}`)
  }
  
  const events = await db.event.findMany({
    where:{userId : user.id},
    orderBy:{createdAt: "desc"},
    include:{
        _count:{
            select:{bookings:true}
        }
    }
  })
  return {events, username : user.username}
}

export async function deleteEvent(eventId:any){

 const {userId} = await auth()
  if(!userId){
    throw new Error("Unauthorized, userId not found")
  }

  const user = await db.user.findUnique({where: {clerkUserId : userId}})
  
  if(!user){
    throw new Error(`User not found for clerkId :${userId}`)
  }
  
  const event = await db.event.findUnique({
    where:{id:eventId}
  })

  if(!event || event.userId !== user.id){
    throw new Error("Event not found or unauthorized")
  }
  await db.event.delete({
    where:{id:eventId}
  })
  return {success : true}
}

export async function getEventDetails(username:any, eventId:any) {
  const event = await db.event.findFirst({
    where: {
      id: eventId,
      user: {
        username: username,
      },
    },
    include: {
      user: {
        select: {
          name: true,
          email: true,
          imageUrl: true,
        },
      },
    },
  });

  return event;
}

export async function getEventAvailability(eventId:any){
  const event = await db.event.findUnique({
    where:{id: eventId},
    include:{
      user:{
        include:{
          availability:{
            select:{
              days:true,
              timeGap:true
            }
          },
          bookings:{
            select:{
              startTime:true,
              endTime:true
            }
          }
        }
      }
    }
  })
  if(!event || !event?.user?.availability){
    return []
  }
  const {availability, bookings} = event.user

  // while creating-updating time slots in db,it is converting it to its own time zone :
  // - so we have to change them back to our time zone using lib (date-fns)
  const startDate = startOfDay(new Date())
  const endDate = addDays(startDate, 30)

  const availableDates = []

  for(let date = startDate ; date <= endDate ; date = addDays(startDate, 1)){
    const dayOfWeek = format(date, "EEEE").toUpperCase()
    const dayAvailability = availability.days.find((d)=> d.day === dayOfWeek)

    if(dayAvailability){
      const dateStr = format(date, "yyyy-MM-dd")
      const slots = generateAvailableTimeSlots(
        dayAvailability.startTime,
        dayAvailability.endTime,
        event.duration,
        bookings,
        dateStr,
        availability.timeGap
      )

      availableDates.push({
        dates:dateStr,
        slots
      })
    }
  }
  return availableDates
}
/*
interface AvailableSlotsinterface {
  startTime: Date
  endTime : Date
  duration : number 
  bookings : {
    startTime: Date
    endTime : Date
  }
  dateStr: string
  timeGap: number
} */

function generateAvailableTimeSlots(
  startTime,
  endTime,
  duration,
  bookings,
  dateStr,
  timeGap
){
 const slots = []

 let currentTime = parseISO(
  `${dateStr}T${startTime.toISOString().slice(11,16)}`
 )
 const slotEndTime = parseISO(
  `${dateStr}T${endTime.toISOString().slice(11,16)}`
 )

 const now = new Date()
 if(format(now, "yyyy-MM-dd") === dateStr){
  currentTime = isBefore(currentTime, now)?addMinutes(now,timeGap): currentTime
 }

 while(currentTime < slotEndTime){
  const slotEnd = new Date(currentTime.getTime() + duration * 60000)
  const isSlotAvailable = !bookings.some((booking:any) => {
    const bookingStart = booking.startTime;
    const bookingEnd = booking.endTime;
    
    return (
      (currentTime >= bookingStart && currentTime < bookingEnd) ||
      (slotEnd > bookingStart && slotEnd <= bookingEnd) ||
      (currentTime <= bookingStart && slotEnd >= bookingEnd)
    )
  })
  if(isSlotAvailable){
    slots.push(format(currentTime, "HH:mm"))
  }

  currentTime = slotEnd
 }
 return slots
}
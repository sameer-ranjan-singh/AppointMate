"use server"

import { eventSchema } from "@/app/lib/validators";
import db from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";

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
"use server"

import db from "@/lib/prisma"
import { auth, clerkClient } from "@clerk/nextjs/server"

export const updateUsername = async (username:any)=> {
    const clerkClientServer = await clerkClient()
    const {userId } = await auth()
    if(!userId){
        throw new Error("Unauthorized")
    }
    const existingUsername = await db.user.findUnique({
        where:{username}
    })
    if(existingUsername && existingUsername.id !== userId){
        throw new Error("Username is already taken")
    }

    await db.user.update({
        where:{clerkUserId:userId},
        data:{username}
    })
    console.log("clerk before :",clerkClientServer.users)
    await clerkClientServer.users.updateUser(userId,{username})
    console.log(clerkClientServer.users)
    return {success:true}
}
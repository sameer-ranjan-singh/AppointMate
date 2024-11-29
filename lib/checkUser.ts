import {  clerkClient, currentUser } from "@clerk/nextjs/server"
import db from "./prisma"
import { PrismaClient } from "@prisma/client"


// const prisma = new PrismaClient()
const prisma = db

export const checkUser = async ()=> {
  const clerkUser = await currentUser()
  const clerkClientServer = await clerkClient()
  if(!clerkUser) return null

  try{
    const loggedInUser = await prisma?.user?.findUnique({
      where:{
        clerkUserId: clerkUser.id
      }}
    )
    // console.log("loggedInUser :",loggedInUser)
    if(loggedInUser){
      return loggedInUser
    }
    const name = `${clerkUser.firstName} ${clerkUser.lastName}`
    const defaultUsernameForClerk = name.split(" ").join("-") + clerkUser.id.slice(-4)
    const addingUsernameInClerk = await clerkClientServer.users.updateUser(clerkUser.id,{
      username: defaultUsernameForClerk,
    })
    // console.log("clerk-user-username :", clerkUser.username)

    const newUser = await prisma.user.create({
      data:{
        clerkUserId : clerkUser.id,
        email:clerkUser.emailAddresses[0].emailAddress,
        name:name,
        imageUrl:clerkUser.imageUrl,
        username:defaultUsernameForClerk
      }
    })
    // console.log("new-User-Added :", newUser)
    return newUser

  }catch(error){
    console.error(error)
  }
}
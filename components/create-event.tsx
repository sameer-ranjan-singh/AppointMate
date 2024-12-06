"use client"
// 1:55:00 - Drawer bg color issue , header bg issue

import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer"
import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import EventForm from "./event-form"


export function CreateEventDrawer() {
 const [isOpen, setIsOpen] = useState(false)
 const router = useRouter()
 const searchParams = useSearchParams()
 const createkey = searchParams.get("create")
  useEffect(()=>{
    const create = createkey
    if(create === "true"){
        setIsOpen(true)
    }
  },[searchParams])
 const handleOnClose =()=> {
    setIsOpen(false)
    if(createkey === "true"){
        console.log("window.location?.pathname :",window.location?.pathname)
        router.replace(window.location?.pathname)
    }
}
 return (
    <Drawer open ={isOpen} onClose={handleOnClose}>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Create New Event</DrawerTitle>
          </DrawerHeader>
          <EventForm onSubmitForm= {()=> handleOnClose()}/>
          <DrawerFooter>
            {/* <Button>Submit</Button> */}
            <DrawerClose asChild>
              <Button variant="destructive" onClick={()=> handleOnClose()}>Cancel</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

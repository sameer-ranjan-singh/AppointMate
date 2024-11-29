import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"
import { PenBox } from "lucide-react"
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs"
import UserMenu from "./UserMenu"
import { checkUser } from "@/lib/checkUser"

export const Header =async ()=> {
  await checkUser()

    return (
        <nav className="mx-auto py-2 px-4 flex justify-between items-center shadow-md border-b-2">
            <Link href={"/"} className="flex items-center">
              <Image
               src={"/orange.png"}
               width={32}
               height={32}
               alt="Appointmate"
               className="w-auto"
              />
              <h1 className="font-bold md:font-extrabold text-xl text-orange-500">AppointMate</h1>
            </Link>

            <div className="flex items-center gap-4">
                <Link href={"/events?create=true"}>
                 <Button className="flex items-center gap-2" variant={"destructive"}><PenBox size={18}/> Create Event</Button>
                </Link>
                <SignedOut>
                 <SignInButton forceRedirectUrl={"/dashboard"}>
                   <Button className="flex items-center" variant={"outline"}>Login</Button>
                 </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserMenu/>
                    {/* <UserButton/> */}
                </SignedIn>
            </div>
        
        </nav>
    )
}
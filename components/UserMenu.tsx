"use client"

import { UserButton } from "@clerk/nextjs";
import { ChartNoAxesGantt } from "lucide-react";
import React from "react";

const UserMenu = () => {
  return (
    <UserButton
      appearance={{
        elements: {
          avatarBox: "w-8 h-8",
        },
      }}
    >
      <UserButton.MenuItems>
        <UserButton.Link
          label="My events"
          labelIcon={<ChartNoAxesGantt size={15} />}
          href="/events"
        />
        <UserButton.Action label="manageAccount"/>
      </UserButton.MenuItems>
    </UserButton>
  );
};

export default UserMenu;

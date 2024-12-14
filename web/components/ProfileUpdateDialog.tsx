"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileUpdateForm } from "./ProfileUpdateForm";
import { useState } from "react";

export const ProfileUpdateDialog = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen}>
      <DialogTrigger asChild>
        <Button
          className={buttonVariants({
            variant: "default",
            className: "w-full bg-primary-light text-primary-white hover:bg-primary-dark hover:text-white-default",
          })}
          onClick={() => setIsOpen(true)}
        >
          Update Profile
        </Button>
      </DialogTrigger>
<DialogContent 
  className="
    w-full 
    max-w-full 
    sm:max-w-[425px] 
    p-4 sm:p-6 
    rounded-lg
  "
>
  <DialogHeader>
    <DialogTitle className="text-xl sm:text-2xl font-semibold">Edit profile</DialogTitle>
    <DialogDescription className="text-sm sm:text-base">
      Make changes to your profile here. Click save when you're done.
    </DialogDescription>
  </DialogHeader>
  <ProfileUpdateForm
    onClose={() => {
      setIsOpen(false);
    }}
  />
</DialogContent>

    </Dialog>
  );
};

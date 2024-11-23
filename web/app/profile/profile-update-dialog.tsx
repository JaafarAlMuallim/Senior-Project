import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ProfileUpdateForm } from "./profile-update-form";

export const ProfileUpdateDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          className={buttonVariants({
            variant: "default",
            className: "w-full bg-primary-light",
          })}
        >
          Update Profile
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <ProfileUpdateForm />
      </DialogContent>
    </Dialog>
  );
};

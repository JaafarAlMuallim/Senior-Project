import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileUpdateDialog } from "./profile-update-dialog";

export const ProfileSection = () => {
  return (
    <div className="flex flex-col gap-4 justify-start items-center">
      <Avatar className="h-64 w-64">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-violet-700 text-white text-7xl">
          JA
        </AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold">Jaafar Al Muallim</h2>
      <ProfileUpdateDialog />
    </div>
  );
};

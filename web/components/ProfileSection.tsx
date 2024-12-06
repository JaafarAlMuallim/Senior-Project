import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileUpdateDialog } from "./ProfileUpdateDialog";
import { trpc } from "@/trpc/server";
import { getInitials } from "@/lib/utils";
import { currentUser } from "@clerk/nextjs/server";

export const ProfileSection = async () => {
  const profile = await trpc.profiles.get();
  const user = await currentUser();
  return (
    <div className="flex flex-col gap-4 justify-start items-center">
      <Avatar className="h-64 w-64">
        <AvatarImage src={user?.imageUrl} />
        <AvatarFallback className="bg-violet-700 text-white text-7xl">
          {getInitials(profile?.user.name ?? "XX")}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold">{profile?.user.name}</h2>
      <ProfileUpdateDialog />
    </div>
  );
};

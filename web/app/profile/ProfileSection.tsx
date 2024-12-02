import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ProfileUpdateDialog } from "./ProfileUpdateDialog";
import { trpc } from "@/trpc/server";

export const ProfileSection = async () => {
  const profile = await trpc.profiles.get();
  function getInitials(name: string) {
    const words = name.trim().split(" ");
    if (words.length === 0) return ""; // Handle empty input
    const firstLetter = words[0][0]?.toUpperCase() || ""; // First letter of the first name
    const lastLetter = words[words.length - 1][0]?.toUpperCase() || ""; // First letter of the last name
    return firstLetter + lastLetter;
  }
  return (
    <div className="flex flex-col gap-4 justify-start items-center">
      <Avatar className="h-64 w-64">
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback className="bg-violet-700 text-white text-7xl">
          {getInitials(profile?.user.name ?? "")}
        </AvatarFallback>
      </Avatar>
      <h2 className="text-2xl font-semibold">{profile?.user.name}</h2>
      <ProfileUpdateDialog />
    </div>
  );
};

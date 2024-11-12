import {
  Moon,
  UserRound,
  ShieldCheck,
  Bell,
  CircleHelp,
  UsersRound,
} from "lucide-react-native";
import { Text, View, Image } from "react-native";
import ProfileOption from "@/components/ProfileOption";
import CustomText from "@/components/CustomText";
import { useUser } from "@clerk/clerk-expo";
import { useOfflineStore } from "@/store/offlineStorage";

const Profile = () => {
  const { user: clerkUser } = useUser();
  const { user } = useOfflineStore();

  return (
    <View className="flex-1 flex-col bg-white-default w-full">
      <View className="w-full">
        <View className="my-4 flex flex-col justify-center items-center rounded-full">
          <Image
            className="w-32 h-32 rounded-full border-red"
            source={{ uri: clerkUser?.imageUrl }}
            resizeMode={"cover"}
          />
        </View>
        <View className="flex flex-col justify-center items-center">
          <CustomText styles="font-poppinsSemiBold text-2xl">
            {user?.user.name}
          </CustomText>
          <CustomText styles="text-lg">{user?.user.email}</CustomText>
        </View>
      </View>
      <Moon className="w-10 h-10 self-end px-8" size={32} color={"black"} />
      <View className="w-full flex flex-col px-8">
        <CustomText styles="text-xl text-gray-400 mt-2">
          Account Setting
        </CustomText>
        <View className="flex-col flex">
          <ProfileOption
            label={"Edit Profile"}
            link={"/(edit)/edit-profile"}
            params={JSON.stringify(user)}
            icon={<UserRound size={32} color={"black"} />}
          />
          <ProfileOption
            label={"Privacy Policy"}
            link={"/privacy-policy"}
            icon={<ShieldCheck size={32} color={"black"} />}
          />
          <ProfileOption
            label={"Notification"}
            link={"/notification"}
            icon={<Bell color={"black"} />}
          />
        </View>
      </View>
      <View className="border border-black w-full my-4 opacity-20" />
      <View className="w-full flex flex-col px-8">
        <Text className="font-poppins text-xl text-gray-400 mt-2">More</Text>
        <View className="flex-col flex">
          <ProfileOption
            label={"FAQs"}
            link={"/faq"}
            icon={<CircleHelp size={32} color={"black"} />}
          />
          <ProfileOption
            label={"Support"}
            link={"/support"}
            icon={<UsersRound size={32} color={"black"} />}
          />
        </View>
      </View>
    </View>
  );
};

export default Profile;

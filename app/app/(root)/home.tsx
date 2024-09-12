import CustomText from "@/components/CustomText";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, Image, TouchableOpacity, View } from "react-native";
import { useClerk } from "@clerk/clerk-expo";

const Page = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View className="h-full flex flex-col p-8">
      <SignedIn>
        <View className="flex-1">
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <Text>{user?.fullName}</Text>
          <Image source={{ uri: user?.imageUrl }} className="h-4 w-4" />
          <Text>{user?.phoneNumbers[0]?.phoneNumber ?? "None"}</Text>
        </View>
        <View className="">
          <TouchableOpacity
            className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-danger-700"
            onPress={() => signOut()}
          >
            <CustomText styles="font-poppinsBold text-lg text-white-default">
              Sign Out
            </CustomText>
          </TouchableOpacity>
        </View>
      </SignedIn>
      <SignedOut>
        <Redirect href={"/(auth)/welcome"} />
      </SignedOut>
    </View>
  );
};

export default Page;

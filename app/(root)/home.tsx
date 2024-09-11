import CustomText from "@/components/CustomText";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useClerk } from "@clerk/clerk-expo";

const Page = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <TouchableOpacity
          className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-danger-700"
          onPress={() => signOut()}
        >
          <CustomText styles="font-poppinsBold text-lg text-white-default">
            Sign Out
          </CustomText>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <Redirect href={"/(auth)/welcome"} />
      </SignedOut>
    </View>
  );
};

export default Page;

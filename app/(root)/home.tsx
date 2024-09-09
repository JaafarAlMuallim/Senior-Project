import CustomText from "@/components/CustomText";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Link } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const Page = () => {
  const { user } = useUser();

  return (
    <View>
      <SignedIn>
        <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
        <TouchableOpacity
          className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-danger-700"
          onPress={() => {}}
        >
          <CustomText styles="font-poppinsBold text-lg text-white-default">
            Sign Out
          </CustomText>
        </TouchableOpacity>
      </SignedIn>
      <SignedOut>
        <Link href="/sign-in">
          <Text>Sign In</Text>
        </Link>
        <Link href="/sign-up">
          <Text>Sign Up</Text>
        </Link>
      </SignedOut>
    </View>
  );
};

export default Page;

import CustomText from "@/components/CustomText";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import {
  Text,
  Image,
  TouchableOpacity,
  View,
  Animated,
  Easing,
} from "react-native";
import { useClerk } from "@clerk/clerk-expo";
import trpc from "@/utils/trpc";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react-native";
import { useEffect } from "react";

const Page = () => {
  const { user } = useUser();
  const { signOut } = useClerk();
  const spinValue = new Animated.Value(0);

  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: () => trpc.getProfileProc.query({ clerkId: user?.id! }),
  });

  useEffect(() => {
    if (isLoading) {
      Animated.loop(
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 1000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
      ).start();
    } else {
      // Reset spin value when loading stops
      spinValue.setValue(0);
    }
  }, [isLoading]);

  if (isLoading) {
    return (
      <View className="h-full flex flex-col p-8 bg-white-default">
        <SignedIn>
          <Animated.View
            style={{
              transform: [{ rotate }],
            }}
            className="flex-1 items-center justify-center"
          >
            <Loader2 className="h-48 w-48 animate-spin" size={96} />
          </Animated.View>
        </SignedIn>
        <SignedOut>
          <Redirect href={"/(auth)/welcome"} />
        </SignedOut>
      </View>
    );
  }

  return (
    <View className="h-full flex flex-col p-8 bg-white-default">
      <SignedIn>
        <View className="flex-1">
          <Text>Hello {user?.emailAddresses[0].emailAddress}</Text>
          <Text>{user?.fullName}</Text>
          <Image source={{ uri: user?.imageUrl }} className="h-4 w-4" />
          <Text>{user?.phoneNumbers[0]?.phoneNumber ?? "None"}</Text>
          {data && (
            <View>
              <Text>{data?.major}</Text>
              <Text>{data?.phone}</Text>
              <Text>{data?.university}</Text>
              <Text>{data?.standing}</Text>
            </View>
          )}
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

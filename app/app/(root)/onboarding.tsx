import CustomText from "@/components/CustomText";
import Dropdown from "@/components/Dropdown";
import Input from "@/components/Input";
import { MAJORS, STANDINGS, UNIVERSITIES } from "@/constants/data";
import { trpc } from "@/lib/trpc";
import { useUserStore } from "@/store/store";
import { useTokenStore } from "@/store/tokenStore";
import { SignedIn, SignedOut, useSession, useUser } from "@clerk/clerk-expo";
import { Redirect, router } from "expo-router";
import {
  Bolt,
  GraduationCap,
  Loader2,
  Phone,
  University,
} from "lucide-react-native";
import { useEffect, useState } from "react";
import { Alert, Animated, Easing, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const OnBoarding = () => {
  const { user } = useUser();
  const { session } = useSession();
  const { setUser } = useUserStore();
  const { setToken } = useTokenStore();
  const [phone, setPhone] = useState("");
  const [university, setUniversity] = useState("");
  const [major, setMajor] = useState("");
  const [standing, setStand] = useState("");

  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  useEffect(() => {
    const findToken = async () => {
      const t = await session?.getToken({
        template: "supabase",
      });
      console.log("Token: ", t);
      if (t) setToken({ token: t });
    };
    findToken();
  }, [session]);

  const { data, isLoading } = trpc.profiles.get.useQuery();

  useEffect(() => {
    if (!isLoading && data?.university) {
      console.log("DATA ONBOARDING: ", data);
      setUser(data);
      router.push("/(root)/(drawer)/(tabs)/(home)/home");
    }
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
      spinValue.setValue(0);
    }
  }, [data, isLoading]);

  const { mutate } = trpc.profiles.update.useMutation({
    onSuccess: async () => {
      router.push("/(root)/(drawer)/(tabs)/(home)/home");
    },
  });

  const updateProfile = (data: {
    clerkId: string;
    phone: string;
    university: string;
    major: string;
    standing: string;
  }) =>
    mutate({
      data: data,
    });

  const onSubmit = () => {
    if (!phone || !university || !major || !standing) {
      Alert.alert("Please fill all fields");
    }
    updateProfile({
      clerkId: user?.id!,
      phone,
      university,
      major,
      standing,
    });
  };

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
            <Loader2 className="h-48 w-48" size={96} />
          </Animated.View>
        </SignedIn>
        <SignedOut>
          <Redirect href={"/(auth)/welcome"} />
        </SignedOut>
      </View>
    );
  }

  return (
    <SafeAreaView className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <SignedIn>
        <CustomText styles={"text-4xl font-poppinsBold text-primary-light"}>
          Welcome {user?.fullName!.split(" ")[0]}
        </CustomText>
        <CustomText styles={"text-lg"}>
          Complete your{" "}
          <CustomText styles={"font-poppinsBold text-primary-light"}>
            account
          </CustomText>{" "}
          to access all the features of{" "}
          <CustomText styles="text-black font-poppinsBold">EduLink!</CustomText>
        </CustomText>
        <View className="flex flex-col mt-14">
          <Input
            label={"Phone"}
            inputConfig={{
              placeholder: "054 000 0000",
              value: phone,
              defaultValue: data?.phone ?? "",
              textContentType: "telephoneNumber",
              onChangeText: setPhone,
              keyboardType: "phone-pad",
            }}
          >
            <Phone />
          </Input>
          <Dropdown
            data={UNIVERSITIES}
            onChange={(item) => setUniversity(item.value)}
            placeholder={"University"}
            icon={<University />}
            label={"University"}
          />
          <Dropdown
            data={MAJORS}
            onChange={(item) => setMajor(item.value)}
            placeholder={"Major"}
            icon={<Bolt />}
            label={"Major"}
          />
          <Dropdown
            data={STANDINGS}
            onChange={(item) => setStand(item.value)}
            placeholder={"Standing"}
            icon={<GraduationCap />}
            label={"Standing"}
          />
          <TouchableOpacity
            className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light z-0"
            onPress={onSubmit}
          >
            <CustomText styles="text-white-default font-poppinsBold text-lg">
              Submit
            </CustomText>
          </TouchableOpacity>
        </View>
      </SignedIn>
      <SignedOut>
        <Redirect href={"/(auth)/welcome"} />
      </SignedOut>
    </SafeAreaView>
  );
};

export default OnBoarding;

import React, { useEffect, useMemo, useState } from "react";
import CustomText from "@/components/CustomText";
import { Alert, Animated, Easing, TouchableOpacity, View } from "react-native";
import { Book, BriefcaseBusiness, GraduationCap } from "lucide-react-native";
import { SignedIn, SignedOut, useUser } from "@clerk/clerk-expo";
import { useMutation, useQuery } from "@tanstack/react-query";
import trpc from "@/utils/trpc";
import { Loader2 } from "lucide-react-native";
import { Redirect, router } from "expo-router";
import Dropdown from "@/components/Dropdown";
import { GRADES } from "@/constants/data";

const Tutoring = () => {
  const { user } = useUser();

  const [course, setCourse] = useState(""); // Fetch courses from DB
  const [grade, setGrade] = useState("");

  const spinValue = new Animated.Value(0);
  const rotate = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const { data, isLoading } = useQuery({
    queryKey: ["profile", user?.id],
    enabled: !!user?.id,
    queryFn: () => trpc.getProfile.query({ clerkId: user?.id! }),
  });
  const { data: courses, isLoading: coursesLoading } = useQuery({
    queryKey: ["courses"],
    queryFn: () => trpc.getCourses.query(),
  });

  const { mutate: addTutor } = useMutation({
    mutationKey: ["addTutor", user?.id],
    mutationFn: (data: { userId: string; course: string; grade: string }) =>
      trpc.addTutor.mutate({
        userId: data.userId,
        courseId: data.course,
        grade,
      }),
    onSuccess: () => {
      router.push("/(root)/(drawer)/(tabs)/home");
    },
  });

  const onSubmit = () => {
    if (!grade || !course) {
      Alert.alert("Please fill all fields");
    }
    addTutor({ userId: data?.user.id!, course, grade });
  };

  const coursesData = useMemo(() => {
    return courses?.map((course) => ({
      label: course.name,
      value: course.id,
    }));
  }, [courses])!;

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
      spinValue.setValue(0);
    }
  }, [data, isLoading]);

  if (isLoading || coursesLoading) {
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
    <View className="py-8">
      <View className="bg-primary-light rounded-lg h-56 mx-4 p-8">
        <View className="flex flex-col">
          <CustomText styles="text-3xl text-primary-white capitalize">
            {user?.fullName!}
          </CustomText>
          <View className="flex flex-row items-center justify-between">
            <CustomText styles="text-lg text-primary-white">
              {user?.emailAddresses[0].emailAddress}
            </CustomText>
            <CustomText styles="text-lg text-primary-white">
              {data?.phone}
            </CustomText>
          </View>
        </View>
        <View className="flex flex-col my-8">
          <View className="flex flex-col">
            <View className="flex flex-row items-center justify-start">
              <BriefcaseBusiness size={32} color={"white"} />
              <CustomText styles="ml-4 text-3xl text-primary-white uppercase">
                {data?.university}
              </CustomText>
            </View>
            <CustomText styles="ml-12 text-2xl text-primary-white uppercase">
              {data?.major}
            </CustomText>
          </View>
        </View>
      </View>
      <View className="flex flex-col mt-8 p-4">
        <Dropdown
          data={coursesData}
          onChange={(item) => {
            setCourse(item.value);
          }}
          placeholder={"Course"}
          icon={<Book />}
          label={"Tutoring Course"}
        />
        <Dropdown
          data={GRADES}
          onChange={(item) => {
            setGrade(item.value);
          }}
          placeholder={"Grade"}
          icon={<GraduationCap />}
          label={"Grade"}
        />
        <TouchableOpacity
          className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light z-0"
          onPress={() => {
            onSubmit();
          }}
        >
          <CustomText styles="text-white-default font-poppinsBold text-lg">
            Submit
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Tutoring;

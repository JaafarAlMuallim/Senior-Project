import CustomText from "@/components/CustomText";
import Input from "@/components/Input";
import { useUser } from "@clerk/clerk-expo";
import {
  Mail,
  UserRound,
  LockKeyhole,
  University,
  GraduationCap,
  Bolt,
} from "lucide-react-native";
import { useState } from "react";
import {
  TouchableOpacity,
  View,
  Modal,
  TouchableWithoutFeedback,
  Alert,
} from "react-native";
import React from "react";
import Dropdown, { OptionItem } from "@/components/Dropdown";
import { MAJORS, STANDINGS, UNIVERSITIES } from "@/constants/data";
import { useUserStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import trpc from "@/utils/trpc";
import { router } from "expo-router";

type MutationProps = {
  name: string;
  phone: string;
  university: string;
  major: string;
  standing: string;
};

const EditProfile = () => {
  const { user, setUser } = useUserStore();
  const { user: clerkUser } = useUser();

  const [name, setName] = useState(user?.user.name || "");
  const [phoneNumber, setphoneNumber] = useState(user?.phone || "");
  const [university, setUniversity] = useState(user?.university || "");
  const [major, setMajor] = useState(user?.major || "");
  const [standing, setStand] = useState(user?.standing || "");

  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prevValue) => !prevValue);
  };

  const { mutate: updateUser } = useMutation({
    mutationKey: ["updateUser", user?.id],
    mutationFn: async (data: MutationProps) =>
      trpc.updateProfile.mutate({
        clerkId: clerkUser?.id!,
        data,
      }),
    onSuccess: async () => {
      await clerkUser?.update({
        firstName: name.split(" ")[0],
        lastName: name.split(" ")[1],
      });
      setUser({ ...user, user: { ...user.user, name } });
      Alert.alert("Profile updated successfully");
      router.back();
    },
  });

  const onUpdatePassword = async () => {
    try {
      const res = await clerkUser?.updatePassword({
        currentPassword: prevPassword,
        newPassword: newPassword,
        signOutOfOtherSessions: true,
      });
      if (res) {
        Alert.alert("Password updated successfully");
        toggleModal();
      }
    } catch (e) {
      Alert.alert("Error updating password");
      toggleModal();
      console.log(e);
    }
  };

  const onSubmit = () => {
    if (!name || !phoneNumber || !university || !major || !standing) {
      Alert.alert("Please fill all fields");
    }
    updateUser({ name, phone: phoneNumber, university, major, standing });
  };

  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      {/*
    <View className="flex items-center ">
        <Image
          className="w-44 h-44 rounded-full border"
          source={images.profileImage}
          resizeMode={"cover"}
        />
      </View>
      */}
      <View className="flex flex-col mt-5 flex-1">
        <Input
          label={"Name"}
          inputConfig={{
            placeholder: "Ex: Mohammad Ali",
            value: name,
            textContentType: "name",
            onChangeText: setName,
          }}
        >
          <UserRound />
        </Input>
        <Dropdown
          data={UNIVERSITIES}
          onChange={(item) => setUniversity(item.value)}
          placeholder={"University"}
          value={UNIVERSITIES.find((uni) => uni.value === university)}
          icon={<University />}
          label={"University"}
        />
        <Dropdown
          data={MAJORS}
          onChange={(item) => setMajor(item.value)}
          placeholder={"Major"}
          value={MAJORS.find((maj) => maj.value === major)}
          icon={<Bolt />}
          label={"Major"}
        />
        <Dropdown
          data={STANDINGS}
          onChange={(item) => setStand(item.value)}
          placeholder={"Standing"}
          value={STANDINGS.find((stand) => stand.value === standing)}
          icon={<GraduationCap />}
          label={"Standing"}
        />
        <Input
          label={"Phone Number"}
          inputConfig={{
            placeholder: "0512345678",
            value: phoneNumber,
            textContentType: "telephoneNumber",
            onChangeText: setphoneNumber,
          }}
        >
          <LockKeyhole />
        </Input>
      </View>
      {isModalVisible && (
        <Modal
          visible={isModalVisible}
          animationType="fade"
          transparent
          className="mx-3 my-4 py-4"
        >
          <TouchableWithoutFeedback onPress={toggleModal}>
            <View className="flex w-full h-full justify-center items-center bg-black-80 p-8">
              <View className="flex shadow-2xl shadow-slate-900 rounded-2xl bg-slate-50 justify-between w-full h-96 p-8">
                <View>
                  <Input
                    label={"Current Password"}
                    inputConfig={{
                      placeholder: "**********",
                      secureTextEntry: true,
                      value: prevPassword,
                      onChangeText: setPrevPassword,
                      textContentType: "password",
                    }}
                  >
                    <LockKeyhole />
                  </Input>
                  <Input
                    label={"New Password"}
                    inputConfig={{
                      placeholder: "**********",
                      secureTextEntry: true,
                      value: newPassword,
                      onChangeText: setNewPassword,
                      textContentType: "password",
                    }}
                  >
                    <LockKeyhole />
                  </Input>
                </View>
                <TouchableOpacity
                  className="items-center justify-center min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light"
                  onPress={onUpdatePassword}
                >
                  <CustomText styles="text-primary-white font-poppinsBold text-lg">
                    Submit
                  </CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </Modal>
      )}
      <TouchableOpacity
        className="items-center justify-center min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light"
        onPress={toggleModal}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Change Password
        </CustomText>
      </TouchableOpacity>
      <TouchableOpacity
        className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-light"
        onPress={onSubmit}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

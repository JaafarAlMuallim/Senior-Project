import CustomText from "@/components/CustomText";
import Input from "@/components/Input";
import { useUser } from "@clerk/clerk-expo";
import { Mail, UserRound, LockKeyhole } from "lucide-react-native";
import { useState } from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { images } from "@/constants/images";
import React from "react";
import Dropdown from "@/components/Dropdown";
import { UNIVERSITIES } from "@/constants/data";
import Modal from "react-native-modal";

const EditProfile = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setphoneNumber] = useState("");
  const [university, setUniversity] = useState("");

  const [password, setPassword] = useState();
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible((prevValue) => !prevValue);
  };
  return (
    <View className="h-full w-full px-4 flex-1 bg-white-default py-8">
      <View className="flex items-center ">
        <Image
          className="w-44 h-44 rounded-full border"
          source={images.profileImage}
          resizeMode={"cover"}
        />
      </View>
      <View className="flex flex-col mt-5">
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
        <Input
          label={"Email"}
          inputConfig={{
            placeholder: "Ex: abc@example.com",
            value: email,
            textContentType: "emailAddress",
            onChangeText: setEmail,
          }}
        >
          <Mail />
        </Input>
        <Dropdown
          data={UNIVERSITIES}
          onChange={(item) => setUniversity(item.value)}
          placeholder={"University"}
          // icon={<University />}
          label={"University"}
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

      <TouchableOpacity
        className="items-center justify-center min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
        onPress={toggleModal}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Change Password
        </CustomText>
      </TouchableOpacity>
      {isModalVisible && (
        <Modal
          isVisible={isModalVisible}
          animationIn={"fadeInUpBig"}
          backdropOpacity={0.5}
          backdropColor="white"
          className="mx-3 my-4"
        >
          <View className="flex h-full justify-end">
            <View className="flex h-[68%] -mb-4 -mx-2 p-3 shadow-2xl shadow-slate-900  rounded-lg bg-slate-50 justify-between">
              <View>
                <Input
                  label={"Current Password"}
                  inputConfig={{
                    placeholder: "**********",
                    secureTextEntry: true,
                    value: password,
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
                    value: password,
                    textContentType: "password",
                  }}
                >
                  <LockKeyhole />
                </Input>
                <Input
                  label={"Confirm Password"}
                  inputConfig={{
                    placeholder: "**********",
                    secureTextEntry: true,
                    value: password,
                    textContentType: "password",
                  }}
                >
                  <LockKeyhole />
                </Input>
              </View>
              <TouchableOpacity
                className="items-center justify-center min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
                onPress={toggleModal}
              >
                <CustomText styles="text-primary-white font-poppinsBold text-lg">
                  Submit
                </CustomText>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}
      <TouchableOpacity
        className="items-center justify-center mt-5 min-h-16 p-3 rounded-2xl flex-wrap flex-row bg-primary-default"
        onPress={() => {}}
      >
        <CustomText styles="text-primary-white font-poppinsBold text-lg">
          Submit
        </CustomText>
      </TouchableOpacity>
    </View>
  );
};

export default EditProfile;

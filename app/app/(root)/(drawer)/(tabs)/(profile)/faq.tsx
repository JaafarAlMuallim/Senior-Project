import React from "react";
import { SafeAreaView, ScrollView, TouchableOpacity, View } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { router } from "expo-router";
import CustomText from "@/components/CustomText";

const FAQPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="px-6 pt-6">
          <Accordion
            type="multiple"
            collapsible
            defaultValue={["item-1"]}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <CustomText styles="font-poppinsSemiBold text-base text-primary-dark">
                  What is the use of this app?
                </CustomText>
              </AccordionTrigger>
              <AccordionContent>
                <CustomText styles="font-poppinsRegular text-base text-secondary-gray">
                  This application is designed to help undergraduate students
                  manage their studying career. By providing an AI assistant and
                  general groups along with features to manage files and tasks,
                  studying becomes easier and more enjoyable.
                </CustomText>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <CustomText styles="font-poppinsSemiBold text-base text-primary-dark">
                  How can I become a tutor?
                </CustomText>
              </AccordionTrigger>
              <AccordionContent>
                <CustomText styles="font-poppinsRegular text-base text-secondary-gray">
                  You can apply to become a tutor from the settings under
                  tutoring. You need to fill out the required information. Our
                  team will review each application. Based on your GPA and
                  grades, we will make a decision on your application and notify
                  you of the status.
                </CustomText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <TouchableOpacity
            className="mt-8"
            onPress={() => {
              router.push("/support");
            }}
          >
            <CustomText styles="font-poppinsSemiBold text-blue-default">
              Cannot find your question? Click here to ask your question.
            </CustomText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQPage;

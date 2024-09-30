import React from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { router } from "expo-router";

const FAQPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="px-6 pt-6">
          <Text className="text-primary-dark font-poppinsBold text-2xl mb-4 text-center">
            FAQs
          </Text>

          <Accordion
            type="multiple"
            collapsible
            defaultValue={["item-1"]}
            className="w-full"
          >
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <Text className="font-poppinsSemiBold text-base text-primary-dark">
                  What is the use of this app?
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="font-poppinsRegular text-base text-secondary-gray">
                  This application is designed to help undergraduate students
                  manage their studying career. By providing an AI assistant and
                  general groups along with features to manage files and tasks,
                  studying becomes easier and more enjoyable.
                </Text>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <Text className="font-poppinsSemiBold text-base text-primary-dark">
                  How can I become a tutor?
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="font-poppinsRegular text-base text-secondary-gray">
                  You can apply to become a tutor from the settings under
                  tutoring. You need to fill out the required information. Our
                  team will review each application. Based on your GPA and
                  grades, we will make a decision on your application and notify
                  you of the status.
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <TouchableOpacity
            className="mt-8"
            onPress={() => {
              router.push("/privacyPolicy");
            }}
          >
            <Text className="font-poppinsSemiBold text-blue-default">
              Cannot find your question? Click here to ask your question.
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FAQPage;

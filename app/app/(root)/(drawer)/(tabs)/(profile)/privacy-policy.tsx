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
import { Link, router } from "expo-router";

const PrivacyPolicyPage = () => {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
        <View className="px-6 pt-6">
          <Text className="text-primary-dark font-poppinsBold text-2xl mb-4">
            Privacy Policy
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
                  1. Types of Data We Collect
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="font-poppinsRegular text-base text-secondary-gray">
                  we collect genaral data according to the usage of the app to
                  help maintain it and improve it.
                </Text>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <Text className="font-poppinsSemiBold text-base text-primary-dark">
                  2. Use Of Your Personal Data
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="font-poppinsRegular text-base text-secondary-gray">
                  the use of your personal data is to help you manage your
                  studying career. By providing an AI assistant and general
                  groups along with features to manage files and tasks, studying
                  becomes easier and more enjoyable.
                </Text>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <Text className="font-poppinsSemiBold text-base text-primary-dark">
                  3. Disclosure Of Your Personal Data
                </Text>
              </AccordionTrigger>
              <AccordionContent>
                <Text className="font-poppinsRegular text-base text-secondary-gray">
                  we use your personal data to help you manage your studying
                  career. By providing an AI assistant and general groups along
                  with features to manage files and tasks, studying becomes
                  easier and more enjoyable.
                </Text>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyPage;

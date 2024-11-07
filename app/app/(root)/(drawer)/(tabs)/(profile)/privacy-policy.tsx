import React from "react";
import { SafeAreaView, ScrollView, View } from "react-native";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import CustomText from "@/components/CustomText";

const PrivacyPolicyPage = () => {
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
                  1. Types of Data We Collect
                </CustomText>
              </AccordionTrigger>
              <AccordionContent>
                <CustomText styles="font-poppinsRegular text-base text-secondary-gray">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae. Sed ut perspiciatis unde omnis iste natus error
                  sit voluptatem accusantium doloremqu.
                </CustomText>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                <CustomText styles="font-poppinsSemiBold text-base text-primary-dark">
                  2. Use Of Your Personal Data
                </CustomText>
              </AccordionTrigger>
              <AccordionContent>
                <CustomText styles="font-poppinsRegular text-base text-secondary-gray">
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque laudantium, totam rem aperiam, eaque
                  ipsa quae ab illo inventore veritatis et quasi architecto
                  beatae vitae.
                </CustomText>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>
                <CustomText styles="font-poppinsSemiBold text-base text-primary-dark">
                  3. Disclosure Of Your Personal Data
                </CustomText>
              </AccordionTrigger>
              <AccordionContent>
                <CustomText styles="font-poppinsRegular text-base text-secondary-gray">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et quas molestias excepturi sint occaecati cupiditate
                  non provident, similique sunt in culpa qui officia deserunt
                  mollitia animi, id est laborum et dolorum fuga. Et harum
                  quidem rerum facilis est et expedita distinctio. Nam libero
                  tempore, cum soluta
                </CustomText>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default PrivacyPolicyPage;

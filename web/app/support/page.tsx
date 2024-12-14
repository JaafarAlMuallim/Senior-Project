import MaxWidthWrapper from "@/components/MaxWidthWrapper";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import { Mail, Phone } from "lucide-react";
import React from "react";

const Support = () => {
  return (
    <>
      <Navbar />
      <MaxWidthWrapper>
        <div className="py-16 bg-white">
          <div className="text-left">
            <h2 className="text-3xl font-semibold">Technical Support</h2>
            <p className="mt-2 text-lg text-muted-foreground">
              We are here to help you with any questions or concerns you may
              have. Feel free to reach out to us!
            </p>
          </div>
          <div className="flex justify-start items-center my-8 gap-8">
            <div className="flex items-start justify-center gap-4">
              <Image
                alt="Profile Picture"
                src="/profile.jpeg"
                width={100}
                height={100}
                className="rounded-full"
              />
              <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <Mail />
                    <h4 className="text-lg font-semibold">Email</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Send us an email at{" "}
                    <a
                      className="underline"
                      href="mailto:jaafarAlmuallim@gmail.com"
                    >
                      JaafarAlmuallim@gmail.com
                    </a>
                  </p>
                </div>
                <div className="flex flex-col gap-1">
                  <div className="flex gap-2 items-center">
                    <Phone />
                    <h4 className="text-lg font-semibold">Phone</h4>
                  </div>
                  <p className="text-muted-foreground">
                    Call us at <a href="tel:">+966 54 001 4988</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="text-left">
          <h2 className="text-3xl font-semibold">FAQs</h2>
          <div className="my-2">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger className="text-lg">
                  What is the use of this app?
                </AccordionTrigger>
                <AccordionContent className="text-md">
                  This application designed to help undergraduate students in
                  managing their studying career. By providing AI assistant and
                  general groups along with features to manage files and tasks,
                  studying become easier and more enjoyable.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger className="text-lg">
                  How can I become a tutor?
                </AccordionTrigger>
                <AccordionContent className="text-md">
                  You can apply to a tutor from “Start Teaching Students!”
                  button in the home page, then you need to fill the required
                  information. You will tutor directly. However, if there are
                  any issues with your applications or reports, the role will be
                  revoked.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </MaxWidthWrapper>
    </>
  );
};
export default Support;

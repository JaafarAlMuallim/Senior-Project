"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import LoginContent from "@/components/LoginContent";
import RegisterContent from "@/components/RegisterContent";
import { useState } from "react";
import { User, UserPlus } from "lucide-react";
import { SignIn } from "@clerk/nextjs";

export default function Auth() {
  const [tab, setTab] = useState("login");
  return (
    <MaxWidthWrapper className="flex flex-col justify-center items-center w-full md:px-0 px-0">
      <Tabs
        value={tab}
        className="w-[440px] my-6"
        onValueChange={(value) => setTab(value)}
      >
        <div className="flex justify-center items-center w-[440px]">
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="login" className="flex gap-2">
              <User /> Login
            </TabsTrigger>
            <TabsTrigger value="register" className="flex gap-2">
              <UserPlus /> Register
            </TabsTrigger>
          </TabsList>
        </div>
        <div className="my-8">
          <TabsContent value="login" className="px-0">
            <SignIn />
          </TabsContent>
          <TabsContent value="register">
            <RegisterContent />
          </TabsContent>
        </div>
      </Tabs>
    </MaxWidthWrapper>
  );
}

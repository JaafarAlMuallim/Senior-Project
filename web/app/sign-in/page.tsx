"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import logo from '@/public/SplashNew.png'; 
import Image from "next/image";
import { useRouter } from 'next/navigation';
    
const TabsDemo = () => { 
   const router = useRouter();
   return(
  <MaxWidthWrapper className="px-24 justify-center content-center p-10 size-max">
    <Tabs
      className="flex p-4 w-[800px] flex-col shadow-[0_2px_8px] bg-white shadow-blackA"
      defaultValue="register"
    >
      <div className="flex-col">
        <div className=" flex items-center justify-center">
          <Image
            src={logo}
            alt="EduLink Icon"
            width={100} 
            height={100} 
          />
        </div>

        <div className="">
          <TabsList
            className="flex shrink-0 border-b border-mauve6"
            aria-label="Access your account"
          >
            <TabsTrigger
              className="flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-primary-dark data-[state=active]:text-primary-dark data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current"
              value="register"
            >
              Register
            </TabsTrigger>
            <TabsTrigger
              className="flex h-[45px] flex-1 cursor-pointer select-none items-center justify-center bg-white px-5 text-[15px] leading-none outline-none first:rounded-tl-md last:rounded-tr-md hover:text-primary-dark data-[state=active]:text-primary-dark data-[state=active]:shadow-[inset_0_-1px_0_0,0_1px_0_0] data-[state=active]:shadow-current"
              value="login"
            >
              Login
            </TabsTrigger>
          </TabsList>

          <TabsContent
            className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="register"
          >
            <p className="text-[15px] mb-5 leading-normal text-primary-dark font-semibold">
              Welcome to EduLink
            </p>

            <div className="flex flex-wrap">
              <fieldset className="mb-[15px] flex w-1/2 flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="name"
                >
                  Your Name
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="name"
                  placeholder="Jaffer"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex w-1/2 flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="email"
                  type="email"
                  placeholder="example@gmail.com"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex w-1/2 flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="phone"
                >
                  Phone Number
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="phone"
                  type="tel"
                  placeholder="1234567890"
                />
              </fieldset>
              <fieldset className="mb-[15px] flex w-1/2 flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="phone"
                >
                  University
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="phone"
                  type="tel"
                  placeholder="KFUPM"
                />
                            </fieldset>
               <fieldset className="mb-[15px] flex w-1/2 flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="phone"
                >
                  Password
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="phone"
                  type="tel"
                  placeholder="******"
                />
              </fieldset>
              <fieldset className="mb-[15px] flex w-1/2 flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="phone"
                >
                  Password Confirmation
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="phone"
                  type="tel"
                  placeholder="******"
                />
              </fieldset>
            </div>

            <div className="mt-5 flex justify-end">
              <button
              onClick={() => router.push('/onboarding')}
              className="inline-flex h-[35px] items-center justify-center rounded bg-primary-dark px-[15px] text-[15px] font-medium leading-none text-white outline-none hover:bg-green-600 focus:shadow-[0_0_0_2px] focus:shadow-green-300">
                Sign Up
              </button>
            </div>
          </TabsContent>

          <TabsContent
            className="grow rounded-b-md bg-white p-5 outline-none focus:shadow-[0_0_0_2px] focus:shadow-black"
            value="login"
          >
            <p className="text-[15px] mb-5 leading-normal text-primary-dark font-semibold">
              Login to EduLink
            </p>


            <div className="flex">
              <fieldset className="mb-[15px] flex w-full flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="loginEmail"
                >
                  Email
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="loginEmail"
                  type="email"
                  placeholder="Enter your email"
                />
              </fieldset>

              <fieldset className="mb-[15px] flex w-full flex-col justify-start px-2">
                <label
                  className="mb-2.5 block text-[13px] leading-none"
                  htmlFor="loginPassword"
                >
                  Password
                </label>
                <input
                  className="h-[35px] rounded px-2.5 text-[13px] leading-none text-secondary-gray shadow-[0_0_0_1px] shadow-gray-400 outline-none focus:shadow-[0_0_0_2px] focus:shadow-gray-600"
                  id="loginPassword"
                  type="password"
                  placeholder="Enter your password"
                />
              </fieldset>
            </div>

            <div className="mt-5 flex justify-end">
              <button onClick={() => router.push('/home')}
              className="inline-flex h-[35px] items-center justify-center rounded bg-primary-dark px-[15px] text-[15px] font-medium leading-none text-white outline-none hover:bg-blue-600 focus:shadow-[0_0_0_2px] focus:shadow-blue-300">
                Login
              </button>
            </div>
          </TabsContent>
        </div>
      </div>
    </Tabs>
  </MaxWidthWrapper>
    );
};

export default TabsDemo;

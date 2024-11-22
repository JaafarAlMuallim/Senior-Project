'use client';
import React, { useState, useEffect } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FaUser, FaUsers, FaClipboardList } from "react-icons/fa";
import { USERS, MESSAGES, REPORTS, GROUPS } from "@/validators/Placeholders";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserTabContent from "@/components/UserTabContent";
import GroupTabContent from "@/components/GroupTabContent";
import ReportTabContent from "@/components/ReportTabContent";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import logo from './SplashNew.png';
import Onboarding from '@/components/OnBoarding';
import { useRouter } from 'next/navigation';
import { useOnboarding } from '@/components/OnBoardingContext';

const MainDashboard = () => {
  const router = useRouter();
  const { startOnboarding } = useOnboarding();

  const handleGetStarted = () => {
    startOnboarding();
    router.push('/home');
  };

  return (
    <div className="px-24">
      <div className="flex flex-col items-center justify-center">
        <Image src={logo} alt="Rocket Icon" width={250} height={250} />
        <h1 className="text-2xl font-bold text-gray-800 mt-4 mb-2">Welcome to EduLink!</h1>
        <p className="text-center text-gray-600 mb-12 px-2">
          Let us start with a quick tour, and we'll have you up and running in no time!
        </p>

        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none"
        >
          Get started
        </button>
      </div>
    </div>
  );
};

export default MainDashboard;
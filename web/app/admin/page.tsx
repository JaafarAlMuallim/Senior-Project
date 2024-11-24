"use client";
import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { USERS, MESSAGES, REPORTS, GROUPS } from "@/validators/Placeholders";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserTabContent from "@/components/UserTabContent";
import GroupTabContent from "@/components/GroupTabContent";
import ReportTabContent from "@/components/ReportTabContent";
import { Button } from "@/components/ui/button";
import { ClipboardList, User, Users } from "lucide-react";

const categoryCounts = {
  security: 8,
  bug: 3,
  other: 1,
};
const typeCounts = {
  student: 8,
  tutor: 3,
};

const MainDashboard = () => {
  const [tab, setTab] = useState("users");

  const [isTableView, setIsTableView] = useState(false);

  return (
    <MaxWidthWrapper className="px-24">
      <Tabs
        value={tab}
        className="w-full my-4"
        onValueChange={(value) => setTab(value)}
      >
        <MaxWidthWrapper>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="users" className="flex gap-2">
              <User /> Users
            </TabsTrigger>
            <TabsTrigger value="groups" className="flex gap-2">
              <Users /> Groups
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex gap-2">
              <ClipboardList /> Reports
            </TabsTrigger>
          </TabsList>
        </MaxWidthWrapper>
        <UserTabContent
          data={USERS}
          isTableView={isTableView}
          typeCounts={typeCounts}
        />
        <GroupTabContent
          isTableView={isTableView}
          data={GROUPS}
          messages={MESSAGES}
        />
        <ReportTabContent
          isTableView={isTableView}
          data={REPORTS}
          categoryCounts={categoryCounts}
        />
      </Tabs>

      <div className="z-30">
        <Button
          variant="default"
          onClick={() => setIsTableView((prev) => !prev)}
          className="fixed bottom-8 right-8 px-4 py-2 rounded-xl font-semibold shadow-lg"
        >
          {isTableView ? "Switch to Chart" : "Switch to Table"}
        </Button>
      </div>
    </MaxWidthWrapper>
  );
};

export default MainDashboard;

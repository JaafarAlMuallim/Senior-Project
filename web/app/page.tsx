// app/page.tsx
"use client";

import React, { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  ChartContainer,
  ChartTooltipContent,
  ChartLegendContent,
} from "../components/ui/chart";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "../components/ui/table";
import {
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent,
} from "../components/ui/tabs";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

const MainDashboard = () => {
  const [viewMode, setViewMode] = useState("table");

  const users = [
    {
      id: "12345",
      email: "example1@gmail.com",
      name: "Ahmed Abdullah",
      date: "2024/12/06",
    },
    {
      id: "12445",
      email: "example2@gmail.com",
      name: "Saed Wael",
      date: "2024/12/06",
    },
    {
      id: "15345",
      email: "example3@gmail.com",
      name: "Ali Hassan",
      date: "2024/12/06",
    },
    {
      id: "18345",
      email: "example4@gmail.com",
      name: "Ahmed Mohammed",
      date: "2024/12/06",
    },
  ];

  const groups = [
    { id: "12345", name: "ICS 485", courseId: "23945", date: "2024/12/06" },
    { id: "12445", name: "IAS 322", courseId: "56070", date: "2024/12/06" },
    { id: "15345", name: "ISE 291", courseId: "55966", date: "2024/12/06" },
    { id: "18345", name: "SWE 316", courseId: "15967", date: "2024/12/06" },
  ];

  const messagesInGroupsData = [
    { day: "2024-11-01", messages: 30 },
    { day: "2024-11-02", messages: 45 },
    { day: "2024-11-03", messages: 50 },
  ];

  const messagesInAIData = [
    { day: "2024-11-01", messages: 10 },
    { day: "2024-11-02", messages: 20 },
    { day: "2024-11-03", messages: 15 },
  ];

  const renderTableContent = (contentType) => {
    if (contentType === "users") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.id}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    } else if (contentType === "groups") {
      return (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Course ID</TableHead>
              <TableHead>Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {groups.map((group) => (
              <TableRow key={group.id}>
                <TableCell>{group.id}</TableCell>
                <TableCell>{group.name}</TableCell>
                <TableCell>{group.courseId}</TableCell>
                <TableCell>{group.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
    }
  };

  const renderChartContent = (contentType) => {
    const data =
      contentType === "messagesInGroups"
        ? messagesInGroupsData
        : messagesInAIData;
    const color = contentType === "messagesInGroups" ? "#4f46e5" : "#f97316";
    const label =
      contentType === "messagesInGroups"
        ? "Messages in Groups"
        : "Messages in AI";

    return (
      <ChartContainer config={{ messages: { label: "Messages", color } }}>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="day" />
            <YAxis />
            <Tooltip content={<ChartTooltipContent />} />
            <Legend content={<ChartLegendContent />} />
            <Line type="monotone" dataKey="messages" stroke={color} />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    );
  };

  return (
    <Tabs defaultValue="users">
      <div className="flex h-screen">
        {/* Sidebar Tabs */}
        <div className="w-1/5 p-4 bg-gray-100 flex flex-col items-start space-y-4">
          <TabsList className="flex-col space-y-2 w-full">
            {viewMode === "table" ? (
              <>
                <TabsTrigger value="users">Table of Users</TabsTrigger>
                <TabsTrigger value="groups">Table of Groups</TabsTrigger>
              </>
            ) : (
              <>
                <TabsTrigger value="messagesInGroups">
                  Chart - Messages in Groups
                </TabsTrigger>
                <TabsTrigger value="messagesInAI">
                  Chart - Messages in AI
                </TabsTrigger>
              </>
            )}
          </TabsList>

          <Button
            onClick={() =>
              setViewMode(viewMode === "table" ? "chart" : "table")
            }
            className="w-full mt-4"
          >
            {viewMode === "table"
              ? "Switch to Chart Mode"
              : "Switch to Table Mode"}
          </Button>
        </div>

        {/* Content Area */}
        <div className="flex-1 p-8 bg-gray-50 overflow-y-auto">
          {/* Search and Filter Section */}
          <div className="flex items-center space-x-4 mb-4">
            <Input placeholder="Filter emails or IDs..." className="flex-1" />
            <Button>Columns</Button>
          </div>

          {viewMode === "table" ? (
            <>
              <TabsContent value="users">
                {renderTableContent("users")}
              </TabsContent>
              <TabsContent value="groups">
                {renderTableContent("groups")}
              </TabsContent>
            </>
          ) : (
            <>
              <TabsContent value="messagesInGroups">
                {renderChartContent("messagesInGroups")}
              </TabsContent>
              <TabsContent value="messagesInAI">
                {renderChartContent("messagesInAI")}
              </TabsContent>
            </>
          )}
        </div>
      </div>
    </Tabs>
  );
};

export default MainDashboard;

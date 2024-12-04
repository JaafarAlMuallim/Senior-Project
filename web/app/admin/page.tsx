import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import UserTabContent from "@/components/UserTabContent";
import GroupTabContent from "@/components/GroupTabContent";
import ReportTabContent from "@/components/ReportTabContent";
import { ClipboardList, User, Users } from "lucide-react";
import { trpc } from "@/trpc/server";

const MainDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{
    [key: string]: string;
  }>;
}) => {
  const { tab } = await searchParams;
  // const [tab, setTab] = useState("users");
  //
  // const [isTableView, setIsTableView] = useState(false);
  const userData = await trpc.admin.userData();
  const groupData = await trpc.admin.msgData();
  const reportData = await trpc.admin.reportsData();

  return (
    <MaxWidthWrapper className="px-24">
      <Tabs value={tab} className="w-full my-4">
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
        <UserTabContent data={userData} />
        <GroupTabContent data={groupData} />
        <ReportTabContent data={reportData} />
      </Tabs>
    </MaxWidthWrapper>
  );
};

export default MainDashboard;

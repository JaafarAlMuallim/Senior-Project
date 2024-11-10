import { User, userColumns } from "@/models/user-columns";
import { DataTable } from "./DataTable";
import { TabsContent } from "./ui/tabs";

const UserTabContent = ({ data }: { data: User[] }) => {
  return (
    <TabsContent value="users" className="p-3">
      <div className="text-2xl">Table of users</div>
      <div className="container mx-auto py-10">
        <DataTable
          columns={userColumns}
          data={data}
          placeholder="Filter emails.."
          tColumn="email"
        />
      </div>
    </TabsContent>
  );
};
export default UserTabContent;

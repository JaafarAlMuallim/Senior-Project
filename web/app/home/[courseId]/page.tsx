import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { ClipboardPenLine, Files } from "lucide-react";
import MaterialTabContent from "./MaterialTabContent";
import QuizTabContent from "./QuizTabContent";

// const courseId = "cm177rnwp0000119qsarlyxia";

const CoursePage = () => {
  return (
    <MaxWidthWrapper>
      <Tabs defaultValue={"material"} className="w-full my-4">
        <MaxWidthWrapper>
          <TabsList className="grid grid-cols-2 w-full">
            <TabsTrigger value="material" className="flex gap-2">
              <Files /> Material
            </TabsTrigger>
            <TabsTrigger value="quiz" className="flex gap-2">
              <ClipboardPenLine /> Quizzes
            </TabsTrigger>
          </TabsList>
        </MaxWidthWrapper>
        <MaterialTabContent />
        <QuizTabContent />
      </Tabs>
    </MaxWidthWrapper>
  );
};

export default CoursePage;

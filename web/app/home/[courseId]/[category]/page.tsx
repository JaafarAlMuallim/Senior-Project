import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import FileList from "./FileList";
import { separateNameNum } from "@/lib/utils";
import NoDataFound from "@/components/NoDataFound";
import UploadForm from "./UploadForm";
import { trpc } from "@/trpc/server";

const FilesPage = async ({
  params,
}: {
  params: Promise<{ courseId: string; category: string }>;
}) => {
  const { courseId, category } = await params;
  const data = await trpc.courses.getMaterial({
    courseId: courseId,
    category: category,
  });

  if (!data) {
    <NoDataFound />;
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold uppercase">
          {separateNameNum(data?.course?.code!)}
        </h1>
        <h2 className="text-xl">Files</h2>
        <div className="flex justify-end w-full">
          <UploadForm />
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 my-8">
        <FileList materials={data!.materials!} />
      </div>
    </MaxWidthWrapper>
  );
};

export default FilesPage;

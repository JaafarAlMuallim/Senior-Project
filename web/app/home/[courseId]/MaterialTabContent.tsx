"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  CloudUpload,
  FileIcon,
  FolderClosed,
  Loader2,
  MousePointerSquareDashed,
} from "lucide-react";

import { Check, ChevronsUpDown } from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { TabsContent } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { z } from "zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import Dropzone, { FileRejection } from "react-dropzone";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useUploadThing } from "@/lib/uploadthing";
import { trpc } from "@/trpc/client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/validators/Placeholders";
import Progress from "@/components/CustomProgress";
import Category from "@/models/Category";

// const courseId = "cm177rnwp0000119qsarlyxia";

interface Folder {
  id: number;
  title: string;
  type: string;
}

const Folder = ({ folder }: { folder: Folder }) => {
  return (
    <div className="flex items-center gap-2 bg-white-default shadow-md rounded-lg p-6 hover:shadow-lg hover:bg-primary-light hover:text-primary-white cursor-pointer">
      <FolderClosed />
      <span className="flex-grow font-semibold text-lg">{folder.title}</span>
    </div>
  );
};

const formSchema = z.object({
  material: z.string(),
  category: z.nativeEnum(Category),
  name: z.string().optional(),
});
const MaterialTabContent = () => {
  const params = useParams<{ courseId: string }>();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      category: Category.OTHER,
      name: "Untitled",
    },
  });

  const { toast } = useToast();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const { startUpload, isUploading } = useUploadThing("document", {
    onClientUploadComplete: ([data]) => {
      form.setValue("material", data.url);
    },
    onUploadProgress(p) {
      setUploadProgress(p);
    },
  });

  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  const onDropRejected = (rejectedFiles: FileRejection[]) => {
    const [file] = rejectedFiles;
    setIsDragOver(false);
    toast({
      title: `Invalid file type ${file.file.type}`,
      description: "Please upload a valid file",
      variant: "destructive",
    });
  };

  const onDropAccepted = async (acceptedFiles: File[]) => {
    startUpload(acceptedFiles);
    setUploadProgress(0);
    form.setValue("name", acceptedFiles[0].name);
    // convert the image to QR and upload it
    setIsDragOver(false);
  };
  const utils = trpc.useUtils();

  const { mutateAsync: addMaterial } = trpc.courses.addMaterial.useMutation({
    onSuccess: () => {
      toast({
        title: "Material added",
        description: "Material has been added successfully",
        className: "bg-success-600 text-primary-white",
      });
      utils.courses.getMaterial.invalidate();
    },
    onError: (e) => {
      console.log(e);
      toast({
        title: "Error",
        description: "An error occurred while adding the material",
        variant: "destructive",
      });
    },
  });
  async function onSubmit(data: z.infer<typeof formSchema>) {
    await addMaterial({
      courseId: params.courseId,
      name: data.name || "",
      url: data.material,
      category: data.category,
    });
    setIsDialogOpen(false);
  }

  return (
    <TabsContent value="material" className="p-3">
      <div className="flex flex-col gap-8">
        <h1 className="text-2xl font-bold">MATH 101</h1>
        <h2 className="text-xl">Folders</h2>
        <div className="flex justify-end w-full">
          <Dialog open={isDialogOpen}>
            <DialogTrigger asChild>
              <Button
                className={buttonVariants({
                  variant: "default",
                  className:
                    "flex gap-2 bg-primary-light hover:bg-primary-dark my-5",
                })}
                onClick={() => setIsDialogOpen(true)}
              >
                Upload New Material
                <CloudUpload size={24} />
              </Button>
            </DialogTrigger>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-4 focus:ring-0 focus:outline-0"
              >
                <DialogContent>
                  <DialogTitle>Upload File</DialogTitle>
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 w-full">
                        <FormLabel className="">Name</FormLabel>
                        <FormControl>
                          <Input
                            className={cn(
                              "w-full rounded-lg border border-gray-300 p-2",
                              !!field.value
                                ? "text-black"
                                : "text-muted-foreground",
                            )}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 w-full">
                        <FormLabel className="">Category</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild>
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "justify-between",
                                  !!field.value
                                    ? "text-black"
                                    : "text-muted-foreground",
                                )}
                              >
                                {field.value
                                  ? CATEGORIES.options.find(
                                      (item) => item.value === field.value,
                                    )?.title
                                  : "Select a category"}
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className={"p-0"}>
                              <Command>
                                <CommandInput
                                  placeholder={"Search a Category"}
                                />
                                <CommandEmpty>No Category Found.</CommandEmpty>
                                <CommandList>
                                  {CATEGORIES.options.map((item) => (
                                    <CommandItem
                                      key={item.value}
                                      value={item.value}
                                      onSelect={(value) => {
                                        field.onChange(value);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value === item.value
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {item.title}
                                    </CommandItem>
                                  ))}
                                </CommandList>
                              </Command>
                            </PopoverContent>
                          </Popover>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="material"
                    render={({}) => (
                      <FormItem className="flex flex-col gap-2 w-full">
                        <FormLabel className="">Upload File</FormLabel>
                        <FormControl>
                          <Dropzone
                            onDropRejected={onDropRejected}
                            onDropAccepted={onDropAccepted}
                            accept={{
                              "image/png": [".png"],
                              "image/jpeg": [".jpeg"],
                              "image/jpg": [".jpg"],
                              "appilcation/pdf": [".pdf"],
                              "application/vnd.ms-powerpoint": [".pptx"],
                              "application/vnd.ms-word.document.macroenabled.12":
                                [".docx"],
                            }}
                            onDragEnter={() => setIsDragOver(true)}
                            onDragLeave={() => setIsDragOver(false)}
                          >
                            {({ getRootProps, getInputProps }) => (
                              <div
                                className="h-full w-full flex-1 flex flex-col items-center justify-center"
                                {...getRootProps()}
                              >
                                <input {...getInputProps()} />
                                {isDragOver ? (
                                  <MousePointerSquareDashed className="h-6 w-6 text-zinc-500 mb-2" />
                                ) : isUploading ? (
                                  <Loader2 className="h-6 w-6 text-zinc-500 mb-2 animate-spin" />
                                ) : (
                                  <FileIcon className="h-6 w-6 text-zinc-500 mb-2" />
                                )}
                                <div className="flex flex-col justify-center mb-2 text-sm text-zinc-700">
                                  {isUploading ? (
                                    <div className="flex flex-col items-center">
                                      <p>Uploading...</p>
                                      <Progress
                                        value={uploadProgress}
                                        indicatorColor="bg-primary-light"
                                        className="mt-2 w-64 h-4 rounded-md"
                                      />
                                    </div>
                                  ) : uploadProgress === 100 ? (
                                    <div className="flex flex-col items-center">
                                      <p>Uploaded, Click to Change the File</p>
                                      <Progress
                                        value={uploadProgress}
                                        indicatorColor="bg-primary-light"
                                        className="mt-2 w-64 h-4 rounded-md"
                                      />
                                    </div>
                                  ) : isDragOver ? (
                                    <p>
                                      <span className="font-semibold">
                                        Drop file
                                      </span>{" "}
                                      to upload
                                    </p>
                                  ) : (
                                    <p>
                                      <span className="font-semibold">
                                        Drop file
                                      </span>{" "}
                                      to upload
                                    </p>
                                  )}
                                </div>
                                <p className="text-xs text-zinc-500">
                                  PDF, PPTX, DOCX, PNG, JPG, JPEG
                                </p>
                              </div>
                            )}
                          </Dropzone>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                      className={buttonVariants({
                        variant: "default",
                        className:
                          "w-full bg-primary-light hover:bg-primary-dark text-primary-white",
                      })}
                      disabled={isUploading || form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="animate-spin h-6 w-6 text-primary-white" />
                      ) : (
                        "Upload"
                      )}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </form>
            </Form>
          </Dialog>
        </div>
      </div>
      <div className="flex flex-col item-center gap-4">
        {CATEGORIES.options.map((folder) => (
          <Link
            href={`/home/${params.courseId}/${folder.type}`}
            key={folder.id}
          >
            <Folder key={folder.id} folder={folder} />
          </Link>
        ))}
      </div>
    </TabsContent>
  );
};

export default MaterialTabContent;

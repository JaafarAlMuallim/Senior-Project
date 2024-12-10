"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { CloudUpload, Loader2, Pencil } from "lucide-react";

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
import { cn, separateNameNum } from "@/lib/utils";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
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
import Loader from "@/components/Loader";
import { Badge } from "@/components/ui/badge";

// const courseId = "cm177rnwp0000119qsarlyxia";

const QuizCard = ({ index }: { index: number }) => {
  return (
    <div className="flex items-center gap-2 bg-white-default shadow-md rounded-lg p-4 sm:p-6 hover:shadow-lg hover:bg-primary-light hover:text-white-default cursor-pointer">
      <Pencil />
      <span className="flex-grow font-semibold text-base sm:text-lg">Quiz {index}</span>
    </div>
  );
};

const formSchema = z.object({
  material: z.array(z.string()),
});
const MaterialTabContent = () => {
  const params = useParams<{ courseId: string }>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      material: [],
    },
  });

  const { toast } = useToast();

  const utils = trpc.useUtils();
  const router = useRouter();
  const { data: quizzes, isLoading: quizzesLoading } =
    trpc.courses.getQuizzes.useQuery({ courseId: params.courseId });
  const { data: allMaterial, isLoading: materialLoading } =
    trpc.courses.getMaterial.useQuery({
      courseId: params.courseId,
      category: "quiz",
    });

  const { mutateAsync: createQuiz } = trpc.courses.createQuiz.useMutation({
    onSuccess: (quiz) => {
      toast({
        title: "Material added",
        description: "Material has been added successfully",
        className: "bg-success-600 text-primary-white",
      });
      utils.courses.getMaterial.invalidate();
      if (quiz.courseId !== null) {
        router.push(`/quiz/${quiz.id}`);
      }
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
    await createQuiz({
      courseId: params.courseId,
      material: data.material.join(","),
    });
  }

  if (quizzesLoading || materialLoading) {
    return (
      <TabsContent value="users" className="p-3 sm:p-6">
        <Loader />
      </TabsContent>
    );
  }

  return (
    <TabsContent value="quiz" className="p-3 sm:p-6">
      <div className="flex flex-col gap-8">
        <h1 className="text-xl sm:text-2xl font-bold uppercase">
          {separateNameNum(allMaterial?.course?.code || "")}
        </h1>
        <h2 className="text-lg sm:text-xl">Quizzes</h2>
        <div className="flex justify-end w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className={buttonVariants({
                  variant: "default",
                  className:
                    "flex gap-2 bg-primary-light hover:bg-primary-dark my-5",
                })}
              >
                Select Material
                <CloudUpload size={24} />
              </Button>
            </DialogTrigger>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col justify-center items-center gap-4 focus:ring-0 focus:outline-0"
              >
                <DialogContent>
                  <DialogTitle>Select Material</DialogTitle>
                  <FormField
                    control={form.control}
                    name="material"
                    render={({ field }) => (
                      <FormItem className="flex flex-col gap-2 w-full">
                        <FormLabel className="">Material</FormLabel>
                        <FormControl>
                          <Popover>
                            <PopoverTrigger asChild className="z-20">
                              <Button
                                variant="outline"
                                role="combobox"
                                className={cn(
                                  "w-full justify-between font-normal h-auto hover:bg-white z-20 text-sm sm:text-base",
                                  {
                                    "text-muted-foreground":
                                      !field.value || !field.value.length,
                                  },
                                )}
                              >
                                <div className="flex flex-row flex-wrap h-auto gap-2 w-full z-[99]">
                                  {field.value?.length > 0
                                    ? field.value?.map((material) => {
                                        const materialName =
                                          allMaterial?.materials.find(
                                            (m) => m.id === material,
                                          )?.name!;
                                        return (
                                          <Badge
                                            className="bg-blue-700 flex gap-2 hover:bg-blue-800/90"
                                            key={material}
                                          >
                                            {`${materialName.substring(0, 10)}${materialName?.length > 10 ? "..." : ""}`}
                                          </Badge>
                                        );
                                      })
                                    : "Select Material"}
                                </div>
                                <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-full lg:w-[462px] p-0">
                              <Command>
                                <div className="flex flex-col gap-2">
                                  <CommandInput placeholder="Search for Material" />
                                </div>
                                <CommandList className="max-h-[200px] sm:max-h-[300px] px-2">
                                  <CommandEmpty>No Material Found</CommandEmpty>
                                  {allMaterial?.materials.map((material) => (
                                    <CommandItem
                                      key={material.id}
                                      onSelect={() => {
                                        if (
                                          field.value?.includes(material.id)
                                        ) {
                                          field.onChange(
                                            field.value?.filter(
                                              (val) => val !== material.id,
                                            ),
                                          );
                                          return;
                                        }
                                        field.onChange([
                                          ...field.value,
                                          material.id,
                                        ]);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          field.value?.includes(material.id)
                                            ? "opacity-100"
                                            : "opacity-0",
                                        )}
                                      />
                                      {material.name}
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
                  <DialogFooter>
                    <Button
                      type="submit"
                      onClick={form.handleSubmit(onSubmit)}
                      className={buttonVariants({
                        variant: "default",
                        className:
                          "w-full bg-primary-light hover:bg-primary-dark text-white-default text-sm sm:text-base",
                      })}
                      disabled={form.formState.isSubmitting}
                    >
                      {form.formState.isSubmitting ? (
                        <Loader2 className="animate-spin h-6 w-6 text-primary-white" />
                      ) : (
                        "Create Quiz"
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
        {quizzes?.map((quiz, index) => (
          <Link href={`/quiz/${quiz.id}`}>
            <QuizCard key={quiz.id} index={index + 1} />
          </Link>
        ))}
      </div>
    </TabsContent>
  );
};

export default MaterialTabContent;

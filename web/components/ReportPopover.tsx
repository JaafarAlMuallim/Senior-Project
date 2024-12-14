"use client";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandList,
  Command,
} from "@/components/ui/command";
import SubmitButton from "@/components/SubmitButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button, buttonVariants } from "./ui/button";
import { trpc } from "@/trpc/client";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ReportCategory from "@/models/ReportCategory";
import { Input } from "./ui/input";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, MessageSquareWarning } from "lucide-react";

const formSchema = z.object({
  title: z.string(),
  content: z.string(),
  category: z.nativeEnum(ReportCategory),
});

const ReportForm = ({ showText }: { showText: boolean }) => {
  const utils = trpc.useUtils();
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "Untitled",
      content: "",
      category: ReportCategory.OTHER,
    },
  });
  const [open, setOpen] = useState(false);

  const { mutateAsync: addReport } = trpc.report.createReport.useMutation({
    onSuccess: () => {
      toast({
        title: "Report Sent",
        description:
          "Your report has been sent successfully. It will be reviewed by the admin and taken care of.",
        className: "bg-success-600 text-primary-white",
      });
      setOpen(false);
      utils.sessions.getUserSessions.invalidate();
      router.refresh();
    },
    onError: (e: any) => {
      toast({
        title: "Session booking failed",
        description: e.message,
        className: "bg-danger-600 text-primary-white",
      });
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    addReport({
      title: values.title,
      content: values.content,
      category: values.category,
    });
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild id="university" className="cursor-pointer">
        <Button
          className={buttonVariants({
            variant: "outline",
            size: `${showText ? "default" : "icon"}`,
            className: cn(
              "bg-primary-white text-primary-black hover:bg-primary-black hover:text-primary-white shadow-none",
              !showText &&
                "bg-transparent hover:bg-transparent group-hover:text-primary-white border-0",
            ),
          })}
          onClick={() => setOpen(true)}
        >
          {showText ? "Issue a report" : <MessageSquareWarning />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4 py-4"
          >
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="title">Title</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Title"></Input>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="category">Category</FormLabel>
                  <FormControl>
                    <Popover>
                      <PopoverTrigger asChild id="tutor">
                        <Button
                          variant="outline"
                          role="combobox"
                          className={cn(
                            "flex justify-between items-center",
                            !field.value && "text-muted-foreground",
                          )}
                        >
                          <div
                            className={cn("flex gap-2 items-center capitalize")}
                          >
                            {field.value.toLowerCase()}
                          </div>
                          <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className={cn("p-0")}>
                        <Command>
                          <CommandList>
                            <CommandEmpty>No Tutors Available</CommandEmpty>
                            <CommandGroup>
                              {Object.entries(ReportCategory).map((c) => (
                                <CommandItem
                                  key={c[0]}
                                  value={c[0]}
                                  onSelect={field.onChange}
                                  className="capitalize"
                                >
                                  <Check
                                    className={cn(
                                      "mr-2 h-4 w-4",
                                      c[0] === field.value
                                        ? "opacity-100"
                                        : "opacity-0",
                                    )}
                                  />
                                  {c[0].toLowerCase()}
                                </CommandItem>
                              ))}
                            </CommandGroup>
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
              name="content"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-2">
                  <FormLabel htmlFor="content">Content</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <SubmitButton
              isSubmitting={form.formState.isSubmitting}
              text="Submit Report"
            />
          </form>
        </Form>
      </PopoverContent>
    </Popover>
  );
};
export default ReportForm;

"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { MAJORS, UNIVERSITIES } from "@/validators/Placeholders";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown, Loader2 } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";
import { useUser, RedirectToSignUp } from "@clerk/nextjs";
import Loader from "./Loader";
import { trpc } from "@/trpc/client";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  university: z.string().min(3),
  phone: z.string(),
  major: z.string().min(2),
});
const OnBoarding = () => {
  const [openUni, setOpenUni] = useState(false);
  const [openMajor, setOpenMajor] = useState(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      university: "",
      phone: "",
      major: "",
    },
  });
  const router = useRouter();
  const { toast } = useToast();
  const { mutateAsync: updateProfile } = trpc.profiles.update.useMutation({
    onSuccess: () => {
      router.push("/home");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const { user, isLoaded } = useUser();

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await updateProfile({
      data: {
        university: values.university,
        major: values.major,
      },
    });
  };

  if (!isLoaded) return <Loader />;

  if (!user) return;
  <RedirectToSignUp />;

  return (
    <Card className="w-[440px] space-y-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">
          Welcome, {user.fullName?.split(" ")[0]}
        </CardTitle>
        <CardDescription className="">
          Add your phone number and university to get started
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4 w-full"
          >
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2">
                  <FormLabel htmlFor="email">Phone Number</FormLabel>
                  <Input {...field} id="email" className="col-span-3" />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="university"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2">
                  <FormLabel htmlFor="university">University</FormLabel>
                  <Popover open={openUni} onOpenChange={setOpenUni}>
                    <PopoverTrigger asChild id="university">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openUni}
                        className={cn(
                          "relative justify-start items-center",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? `${UNIVERSITIES.find((uni) => uni.value === field.value)?.label}`
                          : "Select University"}
                        <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Companies" />
                        <CommandList>
                          <CommandEmpty>No Universities Available</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value={""}
                              key={""}
                              onSelect={() => {
                                field.onChange("");
                                setOpenUni(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  !!field.value ? "opacity-100" : "opacity-0",
                                )}
                              />
                              No Selection
                            </CommandItem>

                            {UNIVERSITIES.map((uni) => (
                              <CommandItem
                                value={uni.label}
                                key={uni.label}
                                onSelect={() => {
                                  field.onChange(uni.value);
                                  setOpenUni(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === uni.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />

                                {uni.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="major"
              render={({ field }) => (
                <FormItem className="w-full flex flex-col gap-2">
                  <FormLabel htmlFor="Major">Major</FormLabel>
                  <Popover open={openMajor} onOpenChange={setOpenMajor}>
                    <PopoverTrigger asChild id="Major">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openMajor}
                        className={cn(
                          "relative justify-start items-center",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value
                          ? `${MAJORS.find((major) => major.value === field.value)?.label}`
                          : "Select Major"}
                        <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="p-0">
                      <Command>
                        <CommandInput placeholder="Search Companies" />
                        <CommandList>
                          <CommandEmpty>No Majors Available</CommandEmpty>
                          <CommandGroup>
                            <CommandItem
                              value={""}
                              key={""}
                              onSelect={() => {
                                field.onChange("");
                                setOpenMajor(false);
                              }}
                            >
                              <Check
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  !!field.value ? "opacity-100" : "opacity-0",
                                )}
                              />
                              No Selection
                            </CommandItem>

                            {MAJORS.map((major) => (
                              <CommandItem
                                value={major.label}
                                key={major.label}
                                onSelect={() => {
                                  field.onChange(major.value);
                                  setOpenMajor(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    field.value === major.value
                                      ? "opacity-100"
                                      : "opacity-0",
                                  )}
                                />

                                {major.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </CommandList>
                      </Command>
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className={buttonVariants({
                variant: "default",
                className: "bg-primary-light",
              })}
              disabled={form.formState.isSubmitting}
            >
              {form.formState.isSubmitting ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : (
                "Start Learning"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnBoarding;

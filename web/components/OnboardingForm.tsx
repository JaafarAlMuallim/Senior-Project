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
import { Check, ChevronsUpDown } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "./ui/command";
import { useState } from "react";
import { SignedOut, useUser, RedirectToSignUp } from "@clerk/nextjs";
import Loader from "./Loader";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  university: z.string().min(3),
  phone: z.string().email(),
  major: z.string().min(3),
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

  const { user, isLoaded } = useUser();

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  if (!isLoaded) return <Loader />;

  if (!user) return;
  // @ts-ignore
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
                <FormItem>
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
                <FormItem>
                  <FormLabel htmlFor="university">University</FormLabel>
                  <Popover open={openUni} onOpenChange={setOpenUni}>
                    <PopoverTrigger asChild id="university">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openUni}
                        className={cn(
                          "w-[200px] relative justify-center items-center text-center",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? <>{field.value}</> : "Select Company"}
                        <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
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
                                value={uni.value}
                                key={uni.value}
                                onSelect={() => {
                                  field.onChange(uni.value);
                                  setOpenUni(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    !!field.value ? "opacity-100" : "opacity-0",
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
                <FormItem>
                  <FormLabel htmlFor="Major">Major</FormLabel>
                  <Popover open={openMajor} onOpenChange={setOpenMajor}>
                    <PopoverTrigger asChild id="Major">
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={openMajor}
                        className={cn(
                          "w-[200px] relative justify-center items-center text-center",
                          !field.value && "text-muted-foreground",
                        )}
                      >
                        {field.value ? <>{field.value}</> : "Select Company"}
                        <ChevronsUpDown className="absolute right-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
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
                                value={major.value}
                                key={major.value}
                                onSelect={() => {
                                  field.onChange(major.value);
                                  setOpenMajor(false);
                                }}
                              >
                                <Check
                                  className={cn(
                                    "mr-2 h-4 w-4",
                                    !!field.value ? "opacity-100" : "opacity-0",
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
            >
              Submit
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default OnBoarding;

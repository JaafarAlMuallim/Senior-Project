"use client";
import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const COURSES = [
  {
    id: 1,
    code: "MATH 101",
    name: "Calculus 101",
    days: ["Monday", "Wednesday", "Friday"],
    time: "10:00 AM",
  },
  {
    id: 2,
    code: "MATH 102",
    name: "Calculus 102",
    days: ["Tuesday", "Thursday"],
    time: "11:00 AM",
  },
  {
    id: 3,
    code: "MATH 103",
    name: "Calculus 103",
    days: ["Monday", "Wednesday", "Friday"],
    time: "1:00 PM",
  },
  {
    id: 4,
    code: "MATH 104",
    name: "Calculus 104",
    days: ["Tuesday", "Thursday"],
    time: "2:00 PM",
  },
];

import { MoveRight } from "lucide-react";
const formSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(10).optional(),
  password: z.string().min(8).optional(),
});

const ProfilePage = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Jaafar Al Muallim",
      email: "edulink@EduLink.com",
      phone: "1234567890",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <MaxWidthWrapper className="my-8 px-4 mx-4">
      <div className="flex flex-row gap-16">
        <div className="flex flex-col gap-4 justify-start items-center">
          <Avatar className="h-64 w-64">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback className="bg-violet-700 text-white text-7xl">
              JA
            </AvatarFallback>
          </Avatar>
          <h2 className="text-2xl font-semibold">Jaafar Al Muallim</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button
                className={buttonVariants({
                  variant: "default",
                  className: "w-full bg-primary-light",
                })}
              >
                Update Profile
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Edit profile</DialogTitle>
                <DialogDescription>
                  Make changes to your profile here. Click save when you're
                  done.
                </DialogDescription>
              </DialogHeader>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="grid gap-4 py-4 w-full"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="name">Name</FormLabel>
                        <Input {...field} id="name" className="col-span-3" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <Input {...field} id="email" className="col-span-3" />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

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
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel htmlFor="password">Password</FormLabel>
                        <Input
                          {...field}
                          id="password"
                          className="col-span-3"
                          placeholder="******"
                          type="password"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <DialogFooter>
                    <Button type="reset" variant={"destructive"}>
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className={buttonVariants({
                        variant: "default",
                        className: "bg-primary-light",
                      })}
                    >
                      Save changes
                    </Button>
                  </DialogFooter>
                </form>
              </Form>
            </DialogContent>
          </Dialog>
        </div>
        <div className="flex flex-col gap-8">
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Schedule</h2>
            <div className="grow grid grid-cols-3 gap-8">
              {COURSES.map((course) => (
                <Card className="w-64 hover:bg-primary-light hover:text-white transition-all group">
                  <CardHeader>
                    <CardTitle>{course.code}</CardTitle>
                    <CardDescription className="group-hover:text-secondary-lightGray">
                      {course.name}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex justify-end items-center gap-2">
                    74 File Uploads
                    <MoveRight size={24} />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default ProfilePage;

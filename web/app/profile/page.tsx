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
      <div className="flex flex-row gap-32">
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
            <div className="grow grid grid-cols-2 grid-rows-2 gap-8">
              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>

              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>

              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>
              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h2 className="text-2xl font-semibold">Tutoring</h2>
            <div className="grow grid grid-cols-2 grid-rows-2 gap-8">
              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>

              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>

              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>
              <Card className="w-[350px] hover:bg-primary-light hover:text-white transition-all group">
                <CardHeader>
                  <CardTitle>MATH 101</CardTitle>
                  <CardDescription className="group-hover:text-secondary-lightGray">
                    Calculs 101
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-row justify-center items-center flex-wrap gap-4">
                    <li>174 Students</li>
                    <li>4 Tutors</li>
                    <li>74 File Uploads</li>
                    <MoveRight size={24} />
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </MaxWidthWrapper>
  );
};
export default ProfilePage;

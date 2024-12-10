"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import Image from "next/image";

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

const formSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(10).optional(),
  password: z.string().min(8).optional(),
});
const RegisterContent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };
  return (
    <Card className="w-[440px] space-y-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Register</CardTitle>
        <CardDescription className="">
          Create a new account to get started
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
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="name">Name</FormLabel>
                  <Input
                    {...field}
                    id="name"
                    className="w-full bg-white"
                    placeholder="example@gmail.com"
                  />
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
                  <Input
                    {...field}
                    id="email"
                    className="w-full bg-white"
                    placeholder="example@gmail.com"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="phone">Phone Number</FormLabel>
                  <Input
                    {...field}
                    id="phone"
                    className="w-full bg-white"
                    placeholder="example@gmail.com"
                  />
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
                    className="w-full bg-white"
                    placeholder="example@gmail.com"
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex flex-col justify-center items-center w-full gap-4 px-1">
              <Button
                type="submit"
                className={buttonVariants({
                  variant: "default",
                  className: "bg-primary-light hover:bg-primary-dark w-full",
                })}
              >
                Submit
              </Button>
              <Button
                type="submit"
                className={buttonVariants({
                  variant: "outline",
                  className: "bg-white flex gap-2 text-black w-full",
                })}
              >
                <Image src="/google.png" alt="Google" width={20} height={20} />
                Sign in with Google
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default RegisterContent;

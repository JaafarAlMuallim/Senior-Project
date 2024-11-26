"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import GoogleAuth from "@/components/GoogleAuth";
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
import Link from "next/link";

const formSchema = z.object({
  email: z.string().email().optional(),
  password: z.string().min(8).optional(),
});
const LoginContent = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <Card className="w-[440px] space-y-2">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl">Login</CardTitle>
        <CardDescription className="">
          Sign in to your account to continue
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid gap-4 py-4 w-[400px]"
          >
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
            <div className="flex flex-col">
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
                      placeholder="******"
                      type="password"
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Link href={"/forget"} className="text-sm mx-1 text-primary my-2">
                Forget Password?
              </Link>
            </div>
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

export default LoginContent;

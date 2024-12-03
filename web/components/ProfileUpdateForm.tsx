"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  phone: z.string().min(10).max(10).optional(),
  password: z.string().min(8).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ProfileUpdateForm = () => {
  const { user } = useUser();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.fullName!,
      email: user?.emailAddresses[0].emailAddress,
      phone: user?.phoneNumbers[0].phoneNumber,
      password: "",
    },
  });

  const { mutate } = trpc.profiles.update.useMutation();

  const onSubmit = (values: FormValues) => {
    if (!user) return;
    user?.update({
      firstName: values.name!.split(" ")[0],
      lastName: values.name!.split(" ")[1],
    });
    if (!!values.password) {
      user?.updatePassword({
        newPassword: values.password,
      });
    }

    mutate({
      data: {
        name: values.name,
        email: values.email,
        phone: values.phone,
      },
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid gap-4 py-4 w-full"
      >
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
  );
};

"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  name: z.string().min(3).optional(),
  email: z.string().email().optional(),
  password: z.string().min(0).optional(),
});

type FormValues = z.infer<typeof formSchema>;

export const ProfileUpdateForm = ({ onClose }: { onClose: () => void }) => {
  const { user } = useUser();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.fullName!,
      email: user?.emailAddresses[0].emailAddress,
      password: "",
    },
  });
  const { toast } = useToast();
  const utils = trpc.useUtils();

  const { mutateAsync: updateProfile } = trpc.profiles.update.useMutation({
    onSuccess: () => {
      utils.profiles.get.invalidate();
      toast({
        title: "Profile updated successfully",
        description: "Your profile has been updated successfully",
        className: "bg-success-600 text-white-default",
      });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Profile update failed",
        description: error.message,
        className: "bg-danger-600 text-white-default",
      });
    },
  });

  const onSubmit = async (values: FormValues) => {
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

    await updateProfile({
      data: {
        name: values.name,
        email: values.email,
      },
    });
  };

  return (
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
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? "Saving changes..." : "Save changes"}
          </Button>
        </DialogFooter>
      </form>
    </Form>
  );
};

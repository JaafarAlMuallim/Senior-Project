import { Button, buttonVariants } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
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
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "Jaafar Al Muallim",
      email: "edulink@EduLink.com",
      phone: "1234567890",
      password: "",
    },
  });

  const onSubmit = (values: FormValues) => {
    console.log(values);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4 py-4 w-full">
        {/* ... keep existing FormField components ... */}
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

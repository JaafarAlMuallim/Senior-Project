"use client";
import { Image as ImageIcon, Mic, Paperclip, Send } from "lucide-react";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { Button } from "./ui/button";
import { trpc } from "@/trpc/client";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

const formSchema = z.object({
  text: z.string(),
});

const AddAIMessageForm = ({
  groupId,
  onMessagePost,
  agent,
}: {
  onMessagePost: () => void;
  groupId: string;
  agent: string;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { mutate: addMsg } = trpc.messages.addUserMessage.useMutation({
    onSuccess: () => {
      utils.messages.getMessages.invalidate();
      onMessagePost();
      form.reset();
    },
    onMutate: () => {
      utils.messages.addUserMessage.getMutationDefaults();
      onMessagePost();
      form.reset();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        duration: 3000,
      });
      utils.messages.getMessages.invalidate();
    },
  });
  const { mutate: addAIMsg } = trpc.messages.addAIMessage.useMutation({
    onSuccess: () => {
      setIsLoading(false);
      utils.messages.getMessages.invalidate();
      onMessagePost();
      form.reset();
    },
    onMutate: () => {
      setIsLoading(true);
      utils.messages.addAIMessage.getMutationDefaults();
      onMessagePost();
      form.reset();
    },
    onError: (error) => {
      setIsLoading(false);
      toast({
        title: "Error",
        description: error.message,
        duration: 3000,
      });
      utils.messages.getMessages.invalidate();
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const utils = trpc.useUtils();

  function postMessage() {
    addMsg({
      text: form.getValues().text,
      groupId,
    });
    addAIMsg({
      text: form.getValues().text,
      groupId,
      agent,
    });
  }

  const onSubmit = async () => {
    postMessage();
  };

  return (
    <div className="relative flex flex-col gap-4">
      {isLoading && (
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg">
            <p className="text-center">{agent} is Typing...</p>
          </div>
        </div>
      )}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex items-center"
        >
          <Button type="button" variant="ghost" size="icon" className="mr-2">
            <ImageIcon className="size-5" />
            <span className="sr-only">Attach image</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="mr-2">
            <Paperclip className="size-5" />
            <span className="sr-only">Attach file</span>
          </Button>
          <Button type="button" variant="ghost" size="icon" className="mr-2">
            <Mic className="size-5" />
            <span className="sr-only">Record voice</span>
          </Button>
          <FormField
            control={form.control}
            name="text"
            render={({ field }) => (
              <FormControl>
                <Textarea
                  className="flex-grow pr-12"
                  placeholder="Type your message..."
                  {...field}
                  rows={1}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      form.handleSubmit(onSubmit)();
                    }
                  }}
                  autoFocus
                />
              </FormControl>
            )}
          />
          <Button
            className="absolute right-2 top-2"
            size="icon"
            type="submit"
            variant="ghost"
          >
            <Send className="size-5" />
            <span className="sr-only">Send message</span>
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default AddAIMessageForm;

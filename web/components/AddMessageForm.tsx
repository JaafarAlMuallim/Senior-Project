"use client";
import {
  Image as ImageIcon,
  Mic,
  MessageSquare,
  Paperclip,
  Send,
} from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormMessage,
} from "@/components/ui/form";
import { cx } from "class-variance-authority";
import { format, formatDistanceToNow, isToday } from "date-fns";
import { listWithAnd, pluralize, run } from "@/lib/utils";
import { useLiveMessages, useThrottledIsTypingMutation } from "@/hooks/useChat";
import { Button } from "./ui/button";
import { trpc } from "@/trpc/client";
import { useUser } from "@clerk/nextjs";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { useEffect, useRef, useState } from "react";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  text: z.string(),
});

const AddMessageForm = ({
  groupId,
  onMessagePost,
}: {
  onMessagePost: () => void;
  groupId: string;
}) => {
  const addMsg = trpc.messages.add.useMutation();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
    },
  });
  const [isFocused, setIsFocused] = useState(false);

  function postMessage() {
    const input = {
      text: form.getValues().text,
      groupId,
    };
    addMsg.mutate(input, {
      onSuccess() {
        onMessagePost();
        form.reset();
      },
      onError(error) {
        alert(error.message);
      },
    });
  }

  const isTypingMutation = useThrottledIsTypingMutation(groupId);

  const msg = form.watch("text");
  useEffect(() => {
    isTypingMutation(isFocused && msg.trim().length > 0);
  }, [isFocused, msg, isTypingMutation]);

  const onSubmit = async () => {
    postMessage();
  };

  return (
    <div className="relative">
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
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
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
export default AddMessageForm;

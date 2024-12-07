"use client";
import { Mic, Paperclip, Send, Loader2 } from "lucide-react";
import { Form, FormControl, FormField } from "@/components/ui/form";
import { useThrottledIsTypingMutation } from "@/hooks/useChat";
import { Button } from "./ui/button";
import { trpc } from "@/trpc/client";
import { useEffect, useState, useRef } from "react";
import { Textarea } from "./ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUploadThing } from "@/lib/uploadthing";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  text: z.string(),
  attachment_url: z.string().optional().nullish(),
  attachment_type: z.string().optional().nullish(),
});

const AddMessageForm = ({
  groupId,
  onMessagePost,
}: {
  onMessagePost: () => void;
  groupId: string;
}) => {
  const { toast } = useToast();
  const { mutateAsync: addMsg } = trpc.messages.add.useMutation({
    onSuccess: () => {
      onMessagePost();
      form.reset();
      setUploadProgress(0);
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      text: "",
      attachment_url: null,
      attachment_type: null,
    },
  });
  const [isFocused, setIsFocused] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<BlobPart[]>([]);
  const { startUpload, isUploading } = useUploadThing("document", {
    onUploadProgress: (p) => {
      setUploadProgress(p);
    },
    onClientUploadComplete: (data) => {
      form.setValue("attachment_url", data[0].url);
      form.setValue("attachment_type", data[0].type);
      form.setValue("text", "");
      console.log(data[0].type);
      form.handleSubmit(onSubmit)();
    },
  });

  async function postMessage() {
    const input = {
      text: form.getValues().text,
      groupId,
      attachment_url: form.getValues().attachment_url,
      attachment_type: form.getValues().attachment_type,
    };
    await addMsg(input);
  }

  const isTypingMutation = useThrottledIsTypingMutation(groupId);

  const msg = form.watch("text");
  useEffect(() => {
    isTypingMutation(isFocused && msg.trim().length > 0);
  }, [isFocused, msg, isTypingMutation]);

  const onSubmit = async () => {
    await postMessage();
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: "audio/webm",
        });
        const file = new File([audioBlob], "audio.webm", {
          type: "audio/webm",
        });
        startUpload([file]);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error("Error accessing microphone:", error);
      toast({
        title: "Recording Error",
        description: "Failed to access microphone",
        variant: "destructive",
      });
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="relative">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-col items-center"
        >
          <div className="flex items-center w-full relative">
            <FormField
              control={form.control}
              name="text"
              render={({ field }) => (
                <FormControl>
                  <div className="relative w-full">
                    <Textarea
                      className="pr-24 resize-none"
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
                    <div className="absolute right-2 bottom-2 flex items-center">
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            startUpload([file]);
                            setUploadProgress(100);
                          }
                        }}
                        accept=".png,.jpg,.jpeg,.pdf,.pptx,.docx,.webm,.mp3"
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() =>
                          document.getElementById("file-upload")?.click()
                        }
                      >
                        <Paperclip className="h-4 w-4" />
                        <span className="sr-only">Attach file</span>
                      </Button>
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8"
                        onClick={isRecording ? stopRecording : startRecording}
                      >
                        <Mic
                          className={`h-4 w-4 ${isRecording ? "text-red-500" : ""}`}
                        />
                        <span className="sr-only">
                          {isRecording ? "Stop Recording" : "Start Recording"}
                        </span>
                      </Button>
                    </div>
                  </div>
                </FormControl>
              )}
            />
            <Button
              className="ml-2"
              size="icon"
              type="submit"
              variant="ghost"
              disabled={isUploading || form.formState.isSubmitting}
            >
              {isUploading || form.formState.isSubmitting ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Send className="h-4 w-4" />
              )}
              <span className="sr-only">Send message</span>
            </Button>
          </div>
          {uploadProgress > 0 && uploadProgress < 100 && (
            <Progress value={uploadProgress} className="mt-2 w-full h-1" />
          )}
        </form>
      </Form>
    </div>
  );
};

export default AddMessageForm;

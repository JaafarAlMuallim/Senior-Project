import { cn } from "@/lib/utils";
import { Portal } from "@rn-primitives/portal";
import * as ToastPrimitive from "@rn-primitives/toast";
import { Ban, Check, Info, OctagonAlert, X } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import CustomText from "../CustomText";

type ToastType = "info" | "success" | "warning" | "error";

type Action = {
  text: string;
  onPress: () => void;
  className?: string;
  textClassName?: string;
};

type ToastPayload = {
  id: string;
  title: string;
  description: string;
  ms: number;
  variant: "info" | "success" | "warning" | "error";
  actions?: Action[];
  onClose: () => void;
};

function Toast({
  ms,
  title,
  description,
  variant,
  onClose,
  actions,
}: ToastPayload) {
  const [_, setSeconds] = useState(ms / 1000); // Countdown timer
  const insets = useSafeAreaInsets();

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setTimeout(onClose, 0); // Fade out animation
          return ms / 1000; // Reset for future use
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, [ms, onClose]);

  const getVariantClass = (variant: ToastType) => {
    switch (variant) {
      case "success":
        return "bg-success-default";
      case "info":
        return "bg-info-default";
      case "warning":
        return "bg-warning-default";
      case "error":
        return "bg-danger-default";
    }
  };
  const icon = (variant: ToastType) => {
    switch (variant) {
      case "success":
        return <Check size={24} className="text-toast-success mx-1 mt-1" />;
      case "info":
        return <Info size={24} className="text-toast-info mx-1 mt-1" />;
      case "warning":
        return (
          <OctagonAlert size={24} className="text-toast-warning mx-1 mt-1" />
        );
      case "error":
        return <Ban size={24} className="text-toast-error mx-1 mt-1" />;
    }
  };
  const textColor = (variant: ToastType) => {
    switch (variant) {
      case "success":
        return "text-toast-success";
      case "info":
        return "text-toast-info";
      case "warning":
        return "text-toast-warning";
      case "error":
        return "text-toast-error";
    }
  };

  return (
    <Portal name="toast">
      <View
        style={{ bottom: insets.bottom + 80 }}
        className="px-4 absolute w-full"
      >
        <ToastPrimitive.Root
          open={true}
          onOpenChange={() => {
            /* Do nothing */
          }}
          className={`w-full opacity-95 border-border flex-row justify-between items-center p-4 rounded-xl ${getVariantClass(
            variant,
          )}`}
        >
          <View className="flex flex-col w-full">
            <View className="flex flex-row justify-between w-full">
              <ToastPrimitive.Title
                className={cn(
                  "text-foreground text-2xl font-poppinsBold",
                  textColor(variant),
                )}
              >
                {title}
              </ToastPrimitive.Title>
              <ToastPrimitive.Close className="" onPress={onClose}>
                <X size={24} color={"black"} />
              </ToastPrimitive.Close>
            </View>
            <ToastPrimitive.Description
              className={cn(
                "text-lg font-poppins items-center justify-center",
                textColor(variant),
              )}
            >
              {icon(variant)}
              {description}
            </ToastPrimitive.Description>
            {actions
              ? actions.map((action, index) => (
                  <ToastPrimitive.Action
                    key={index}
                    className={cn(
                      "text-black-80 text-lg font-poppins",
                      action.className,
                    )}
                    onPress={action.onPress}
                  >
                    <CustomText styles={cn("", action.textClassName)}>
                      {action.text}
                    </CustomText>
                  </ToastPrimitive.Action>
                ))
              : null}
          </View>
        </ToastPrimitive.Root>
      </View>
    </Portal>
  );
}

let addToast: (payload: Omit<ToastPayload, "id" | "onClose">) => void;

const toast = (payload: Omit<ToastPayload, "id" | "onClose">) => {
  console.log("TOAST");
  if (addToast) {
    addToast(payload);
  }
};

const Toaster = () => {
  const [toasts, setToasts] = useState<Omit<ToastPayload, "onClose">[]>([]);

  // Add a new toast to the list
  addToast = (toastProps) => {
    const id = Math.random().toString(36).substring(2, 9); // Generate a unique ID for the toast
    setToasts((prevToasts) => [...prevToasts, { ...toastProps, id }]);
  };

  // Remove a toast by ID
  const removeToast = (id: string) => {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  };

  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          ms={toast.ms || 3000}
          title={toast.title}
          description={toast.description}
          variant={toast.variant}
          onClose={() => removeToast(toast.id)}
          actions={toast.actions}
        />
      ))}
    </>
  );
};

export { Toast, toast, Toaster };

import * as Linking from "expo-linking";
import { onSignUp } from "@/app/(auth)/actions";
import {
  StartOAuthFlowParams,
  StartOAuthFlowReturnType,
} from "@clerk/clerk-expo";

export const googleOAuth = async (
  startOAuthFlow: (
    startOAuthFlowParams?: StartOAuthFlowParams,
  ) => Promise<StartOAuthFlowReturnType>,
) => {
  try {
    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/home"),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });
        if (signUp.createdUserId) {
          console.log("signUp.createdUserId", signUp.createdUserId);
          try {
            await onSignUp({
              name: signUp.firstName + " " + signUp.lastName,
              email: signUp.emailAddress,
              clerkId: signUp.createdUserId,
            });
          } catch (error) {
            console.error("Fetch error:", error);
            throw error;
          }
        }
        return {
          success: true,
          code: "success",
          message: "You have successfully signed in with Google",
        };
      }
    }

    return {
      success: false,
      message: "An error occurred while signing in with Google",
    };
  } catch (err: any) {
    console.error(err);
    return {
      success: false,
      code: err.code ?? "error",
      message: err?.errors[0]?.longMessage,
    };
  }
};

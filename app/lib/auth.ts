import * as Linking from "expo-linking";
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
      redirectUrl: Linking.createURL("/(root)/onboarding"),
    });

    if (createdSessionId) {
      console.log("createdSessionId", createdSessionId);
      if (setActive) {
        await setActive({ session: createdSessionId });
        if (signUp?.createdUserId) {
          console.log("signUp.createdUserId", signUp.createdUserId);
        }
        return {
          success: true,
          code: "success",
          message: "You have successfully signed in with Google",
          data: {
            clerkId: signUp?.createdUserId,
            name: signUp?.firstName + " " + signUp?.lastName,
            email: signUp?.emailAddress,
          },
        };
      }
    }
    console.log("createdSessionId", createdSessionId || "No session created");
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

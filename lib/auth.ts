import { signUpUser } from "@/app/(auth)/actions";
import * as Linking from "expo-linking";

export const googleOAuth = async (startOAuthFlow: any) => {
  try {
    const { createdSessionId, setActive, signUp } = await startOAuthFlow({
      redirectUrl: Linking.createURL("/(root)/home"),
    });

    if (createdSessionId) {
      if (setActive) {
        await setActive({ session: createdSessionId });
        if (signUp.createdUserId) {
          try {
            await signUpUser({
              name: signUp.user?.fullName,
              email: signUp.user?.emailAddresses[0]?.email,
              clerkId: signUp.created,
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
      code: err.code,
      message: err?.errors[0]?.longMessage,
    };
  }
};

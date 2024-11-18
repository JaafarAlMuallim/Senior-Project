import { SignedIn, SignedOut } from "@clerk/clerk-expo";
import { Redirect } from "expo-router";
import { Loader2 } from "lucide-react-native";
import { Animated, View } from "react-native";

interface LoadingSpinnerProps {
  rotate: Animated.AnimatedInterpolation<string>;
}

export const LoadingSpinner = ({ rotate }: LoadingSpinnerProps) => {
  return (
    <View className="h-full flex flex-col p-8 bg-white-default">
      <SignedIn>
        <Animated.View
          style={{
            transform: [{ rotate }],
          }}
          className="flex-1 items-center justify-center"
        >
          <Loader2 className="h-48 w-48" size={96} />
        </Animated.View>
      </SignedIn>
      <SignedOut>
        <Redirect href={"/(auth)/welcome"} />
      </SignedOut>
    </View>
  );
}; 
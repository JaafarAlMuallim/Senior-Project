import * as React from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient"; // Use LinearGradient from Expo for gradient effect
import { View, StyleSheet } from "react-native";
import { cn } from "@/lib/utils";

const duration = 1000;

function Skeleton({
  className,
  ...props
}: Omit<React.ComponentPropsWithoutRef<typeof Animated.View>, "style">) {
  const opacityValue = useSharedValue(1);
  const translateX = useSharedValue(-200); // Starting position of the shimmer effect

  React.useEffect(() => {
    opacityValue.value = withRepeat(
      withTiming(0.5, { duration }), // Pulsate effect
      -1,
      true,
    );

    translateX.value = withRepeat(
      withTiming(200, { duration: 1500 }), // Shimmer effect animation
      -1,
      false,
    );
  }, []);

  const shimmerStyle = useAnimatedStyle(() => ({
    opacity: opacityValue.value,
  }));

  const animatedGradientStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <Animated.View
      style={[styles.skeleton, shimmerStyle]}
      className={cn(
        "rounded-md bg-secondary-lightGray dark:bg-muted",
        className,
      )}
      {...props}
    >
      <Animated.View style={[styles.shimmerOverlay, animatedGradientStyle]}>
        <LinearGradient
          colors={[
            "rgba(255, 255, 255, 0.1)",
            "rgba(255, 255, 255, 0.3)",
            "rgba(255, 255, 255, 0.1)",
          ]}
          start={[0, 0]}
          end={[1, 0]}
          style={styles.gradient}
        />
      </Animated.View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  skeleton: {
    overflow: "hidden",
  },
  shimmerOverlay: {
    ...StyleSheet.absoluteFillObject,
  },
  gradient: {
    flex: 1,
    width: 200, // Width of the shimmer effect
  },
});

export { Skeleton };

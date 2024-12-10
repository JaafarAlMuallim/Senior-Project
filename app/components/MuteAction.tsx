import { Bell, BellOff } from "lucide-react-native";
import { Animated, TouchableOpacity, StyleSheet } from "react-native";
import CustomText from "./CustomText";

interface MuteActionProps {
  progressAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  dragAnimatedValue: Animated.AnimatedInterpolation<string | number>;
  isMuted: boolean;
  onMute: () => void;
}

const MuteAction = ({
  progressAnimatedValue: progress,
  dragAnimatedValue: dragX,
  isMuted,
  onMute,
}: MuteActionProps) => {
  const scale = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.5, 1],
    extrapolate: "clamp",
  });

  const opacity = progress.interpolate({
    inputRange: [0, 0.5, 1],
    outputRange: [0, 0.3, 1],
    extrapolate: "clamp",
  });

  const translateX = dragX.interpolate({
    inputRange: [-100, 0],
    outputRange: [0, 100],
    extrapolate: "clamp",
  });

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [{ translateX }, { scale }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity style={styles.button} onPress={onMute}>
        {isMuted ? (
          <BellOff color="white" size={24} />
        ) : (
          <Bell color="white" size={24} />
        )}
        <CustomText styles="text-white-default text-sm mt-1">
          {isMuted ? "Unmute" : "Mute"}
        </CustomText>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    height: "100%",
    backgroundColor: "#3b82f6", // Tailwind's blue-500
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
});
export default MuteAction;

import { useEffect } from "react";
import { ViewProps } from "react-native";
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

const duration = 2000;

export function AnimatedRotation({ rad, children, ...props }: ViewProps & { rad: number }) {
  const sharedRad = useSharedValue(rad);

  useEffect(() => {
    sharedRad.value = withTiming(rad, { duration });
  }, [rad]);

  const animationStyle = useAnimatedStyle(() => ({ transform: [{rotate: `${sharedRad.value}rad`}] }));

  return <Animated.View {...props} style={animationStyle}>{ children }</Animated.View>;
}

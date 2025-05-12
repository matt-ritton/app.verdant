import React, { useEffect, useRef } from 'react';
import { Animated, ViewStyle, StyleProp } from 'react-native';

type FadeLoopProps = {
  children: React.ReactNode;
  duration?: number; // duração de cada fade in/out
  style?: StyleProp<ViewStyle>;
};

export const FadeLoop: React.FC<FadeLoopProps> = ({
  children,
  duration = 1000,
  style,
}) => {
  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration,
          useNativeDriver: true,
        }),
      ])
    );

    loop.start();

    return () => loop.stop(); // limpa ao desmontar
  }, []);

  return (
    <Animated.View style={[{ opacity }, style]}>
      {children}
    </Animated.View>
  );
};

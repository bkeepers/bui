import { cssInterop } from "nativewind";
import { Svg, Text, Circle, Path, Rect, G, Line } from "react-native-svg"

export * from "react-native-svg";

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true, color: true }
  },
});

[Circle, Rect, Path, G, Line].forEach((Component) => {
  cssInterop(Component, {
    className: {
      target: "style",
      nativeStyleToProp: { fill: true, stroke: true, strokeWidth: true }
    },
  });
});

cssInterop(Text, {
  className: {
    target: "style",
    nativeStyleToProp: {
      fontSize: true,
      color: true,
      fill: true,
    },
  }
});

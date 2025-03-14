import { cssInterop } from "nativewind";
import { Svg, Text, Circle, Path, Rect, G } from "react-native-svg"

export * from "react-native-svg";

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true }
  },
});

[Circle, Rect, Path, G].forEach((Component) => {
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
      color: true
    },
  }
});

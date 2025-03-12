import { CardinalDirection } from "cardinal-direction";
import { cssInterop } from "nativewind";
import * as React from "react"
import { Svg, SvgProps, Text, Circle, Path, Rect, Defs, Mask, G, Polygon } from "react-native-svg"

export type CompassProps = SvgProps & {
  rad: number
}

cssInterop(Svg, {
  className: {
    target: "style",
    nativeStyleToProp: { width: true, height: true }
  },
});

[Circle, Rect, Path].forEach((Component) => {
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
})

export function Compass({ rad, fill, ...props }: CompassProps) {
  const ticks = 32;
  const size = 200;
  const stroke = "rgba(0,0,0,0.6)"
  const deg = rad * 180 / Math.PI;

  return (
    <Svg viewBox={`0 0 ${size} ${size}`} {...props} strokeWidth={1} strokeLinecap="round">
      {
        Array.from(Array(ticks)).map ((_, i) => {
          const deg = i * 360 / ticks;

          if(deg % 45 === 0) return;

          return (
            <Circle
              key={i}
              cx="50%"
              cy="6.5%"
              r="1"
              fill={stroke}
              className="fill-foreground opacity-40"
              transform={`rotate(${deg} ${size/2} ${size/2})`}
            />
          )
        })
      }

      {
        Array.from(Array(32)).map((_, i) => {
          if (i % 4 !== 0) return null
          const deg = 360 / 32 * i;
          const direction = CardinalDirection[i];
          const cardinal = deg % 90 === 0
          return (
            <Text
              key={i}
              x={size / 2}
              y={size * 0.0725}
              textAnchor="middle"
              fontSize={cardinal ? 14 : 10}
              className={`fill-muted-foreground opacity-80`}
              alignmentBaseline="middle"
              transform={`rotate(${deg} ${size/2} ${size/2})`}
            >
              {direction}
            </Text>
          )
        })
      }

      <G transform={`rotate(${deg} ${size/2} ${size/2})`}>
        <Polygon
          fill={fill}
          transform={`translate(${(size/2 - 5)}, ${size*.1})` }
          points="5 0, 9 14, 0 14"
        />
      </G>
    </Svg>
  )
}

import { Svg, SvgProps, Text, Circle, Path, Rect, G, Polygon, Line } from "~/components/ui/svg";
import { arc } from "d3-shape";
import Animated, { Extrapolation, interpolate, useAnimatedProps, useAnimatedStyle, useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

const AnimatedG = Animated.createAnimatedComponent(G);

export type WindGaugeProps = SvgProps & {
  size?: number;
}

export function WindGauge({ size = 200, children, ...props }: WindGaugeProps) {
  const ticks = 36;

  const arcs = [
    {
      className: 'fill-red-700/70',
      path: arc<void, void>()
        .innerRadius((size / 2)* .87)
        .outerRadius(size / 2)
        .startAngle(-20 * Math.PI / 180)
        .endAngle(-60 * Math.PI / 180)
        .cornerRadius(1)()
    },
  {
      className: 'fill-green-700/70',
      path: arc<void, void>()
        .innerRadius((size / 2)* .87)
        .outerRadius(size / 2)
        .startAngle(20 * Math.PI / 180)
        .endAngle(60 * Math.PI / 180)
        .cornerRadius(1)()
    },
  ]

  return (
    <Svg viewBox={`0 0 ${size} ${size}`} {...props} strokeWidth={1} strokeLinecap="round">
      <G x={size / 2} y={size / 2}>
        {
          arcs.map((shape, index) => {
              return (
                  <Path
                      className={shape.className}
                      key={index}
                      d={shape.path}
                  />
              )
          })
        }
      </G>

      <G>
        {
          Array.from(Array(ticks)).map ((_, i) => {
            const deg = i * 360 / ticks;
            const major = deg % 30 === 0;
            const minor = deg % 10 === 0;

            // if(deg < 20 || deg > 340) return;

            return (
              <Line
                key={i}
                x1={size/2}
                y1={0}
                x2={size/2}
                y2={size * (major ? .06 : (minor ? .04 : 0.01))}
                strokeWidth={major ? 1 : 0.5}
                className={major ? "stroke-foreground" : "stroke-muted-foreground"}
                transform={`rotate(${deg} ${size/2} ${size/2})`}
              />
            )
          })
        }
      </G>

      <G>
      {
        Array.from(Array(12)).map((_, i) => {
          const deg = 360 / 12 * i;
          if(deg === 0) return;

          return (
            <Text
              key={i}
              x={size / 2}
              y={size * 0.125}
              textAnchor="middle"
              className={`fill-foreground opacity-80 leading-tight text-xs`}
              alignmentBaseline="middle"
              transform={`rotate(${deg} ${size/2} ${size/2})`}
            >
              {deg > 180 ? 360 - deg : deg}
            </Text>
          )
        })
      }
      </G>

      {children}
    </Svg>
  )
}

export function Needle({ rad, size = 200, duration = 2000, ...props }) {
  const deg = useSharedValue(0);

  useEffect(() => { deg.value = withTiming(rad * 180 / Math.PI, { duration }) }, [rad]);

  const animatedProps = useAnimatedProps(() => ({
    transform: `rotate(${deg.value}deg, ${size/2}, ${size/2})`
  }))
  return (
    <G transform={`rotate(${deg.value}, ${size/2}, ${size/2})`}>
      <Polygon
        className="fill-foreground"
        transform={`translate(${(size/2 - 7)}, ${size*.06})` }
        points="7 0, 13 18, 7 14, 0 18"
      />
    </G>
  )
}

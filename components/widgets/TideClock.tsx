import { useSignalKResource } from "~/hooks/useSignalK";
import { Widget } from "../Widget";
import { Circle, Defs, G, Line, Path, Svg, Text, TextPath, Use } from "~/components/ui/svg";
import { View } from "react-native";
import { MeasurementValue } from "../MeasurementValue";
import { DateTime } from "~/components/DateTime";
import { useState } from "react";
import { useInterval } from "usehooks-ts";

type TideResource = {
  extremes: {
    time: string;
    value: number;
    type: "High" | "Low";
  }[]
}

export function TideClockWidget({ size = 200 }) {
  const data = useSignalKResource<TideResource>("tides");
  const tides = data?.extremes || [];
  const now = useClock();

  const nextIndex = tides.findIndex(({ time }) => new Date(time) > now);

  // TODO: render loading UI if no data yet
  if(nextIndex === -1) return null;

  const [high, low] = tides.slice(nextIndex, nextIndex + 2).sort(({type}) => type === "High" ? -1 : 1) || [];
  const lastTime = new Date(tides[nextIndex - 1].time);
  const nextTime = new Date(tides[nextIndex].time);
  let progress = (now.getTime() - lastTime.getTime()) / (nextTime.getTime() - lastTime.getTime()) / 2;
  if(tides[nextIndex].type === "High") progress += 0.5;

  let deg = 360 * progress;

  const radius = size / 2;
  const textRadius = radius * .85;

  return (
    <Widget className="rounded-full aspect-square p-0 bg-transparent">
      <Svg viewBox={`0 0 ${size} ${size}`} className="bg-[rgba(107,180,184)]">
        <Defs>
          <Path
            id="highCurve"
            d={`M -${textRadius} 0 A ${textRadius} ${textRadius} 0 1 1 ${textRadius} 0`}
          />
          <Path
            id="lowCurve"
            d={`M -${textRadius} 0 A ${textRadius} ${textRadius} 0 0 0 ${textRadius} 0`}
          />
          <Path id="sand" d="M0,180 C100,200 100,155 200,180 C200,180 200,185 200,200 L0,200 C0,183 0,180 0,175 Z" />
        </Defs>

        <Path
          d={wavePath({ size, progress })}
          className="fill-[rgba(154,197,192)]"
          transform={`translate(0,${radius/2})`}
        />

        <G>
          <Line
            strokeWidth={4}
            x1={radius}
            y1={radius * 0.2}
            x2={radius}
            y2={radius}
            className="stroke-background"
            originX={radius}
            originY={radius}
            rotation={deg}
          />
          <Circle cx={radius} cy={radius} r={5} className="fill-background" />
        </G>
{/*
        <G>
          <Use href="#sand" fill="#CBBD93" scaleX={-1} translateX={200} translateY={-5}  />
          <Use href="#sand" fill="#f3dfc1" />
        </G>
 */}
        <G transform={`translate(${radius}, ${radius})`}>
          <Text className="fill-background uppercase font-medium tracking-widest opacity-75" fontSize={size*.05} textAnchor="middle">
            <TextPath href="#highCurve" startOffset="50%" alignmentBaseline="middle">
              High Tide
            </TextPath>
            <TextPath href="#lowCurve" startOffset="50%" alignmentBaseline="middle">
              Low Tide
            </TextPath>
          </Text>
        </G>
        <Circle cx={radius} cy={radius} r={radius} className="stroke-background fill-none" strokeWidth={radius*.1} />
      </Svg>

      <View className="absolute inset-0 items-center justify-between p-12">
        <View className="items-center ">
          <MeasurementValue variant="inverse" size="3xl" value={high?.value} meta={{units: "m"}} />
          <DateTime className="text-xl text-background" value={high?.time} timeStyle="short"></DateTime>
        </View>

        <View>
          {/* <Text className="text-xl text-background font-semibold text-muted">Tide</Text> */}
        </View>

        <View className="items-center">
          <DateTime className="text-xl text-background" value={low?.time} timeStyle="short"></DateTime>
          <MeasurementValue variant="inverse" size="3xl" value={low?.value} meta={{units: "m"}} />
        </View>
      </View>
    </Widget>
  )
}

function useClock() {
  const [time, setTime] = useState(new Date());
  useInterval(() => { setTime(new Date()) }, 60 * 1000);
  return time;
}

function wavePath({ size, progress }: { size: number, progress: number }) {
  const YMAX = size / 4;

  // Create wave path
  const path = [];
  for (let x = 0; x <= size; x++) {
    const angle = (((x / size) + progress + 0.25) % 1) * Math.PI * 2;  // angle = 0 -> 2π
    const y = Math.sin(angle) * (YMAX / 2) + (YMAX / 2) + (size / 2 - YMAX) / 2;
    path.push((x == 0 ? 'M' : 'L') + x.toFixed(2) + ',' + y.toFixed(2));
  }

  // Move the path to the bottom right and bottom left corners
  path.push(`L ${size} ${size} L 0 ${size}`)

  return path.join(' ');
}

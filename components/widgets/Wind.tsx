import { useSignalK } from "~/hooks/useSignalK";
import { Widget, WidgetLabel, WidgetTitle } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";
import { CardinalDirection } from "../CardinalDirection";
import { Compass } from "../Compass";
import { View } from "react-native";
import { Text } from "~/components/ui/text";
import { useInterval } from "usehooks-ts";
import { useState } from "react";

export function WindWidget() {
  const forecast = useSignalK().environment?.forecast;
  const [v, setV] = useState(0);

  useInterval(() => setV(v => {
    return (v + 0.05) % 15
  }), 100);

  return (
    <Widget className="rounded-full aspect-square p-0">
      <Compass
        className="w-full aspect-square"
        rad={forecast?.wind?.direction?.value}
        fill={colorForValue(forecast?.wind?.speed?.value)}
      />

      <View className="absolute inset-0 items-center justify-center">
        <WidgetTitle>Wind</WidgetTitle>
        <View className="mt-4 flex flex-row items-baseline gap-1">
        </View>
          <CardinalDirection className="text-6xl" rad={forecast?.wind?.direction?.value } />
          <View className="ml-4">
            <MeasurementValue size="6xl" className="ml-8" {...{...forecast?.wind?.speed} } decimals={0} />
          </View>
          <View className="flex flex-row items-baseline gap-1">
            <Text className="text-muted-foreground">Gusting</Text>
            <MeasurementValue variant="muted" {...forecast?.wind?.gust } decimals={0} />
          </View>
      </View>
    </Widget>
  )
}

// max = 15 m/s = 29.16 knots
function colorForValue(value: number, max = 15) {
  var h = Math.max(0, (1.0 - (value / max)) * 240)
  return "hsl(" + h + ", 80%, 45%)";
}

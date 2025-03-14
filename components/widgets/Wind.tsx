import { useSignalK } from "~/hooks/useSignalK";
import { Widget, WidgetLabel, WidgetTitle } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";
import { CardinalDirection } from "../CardinalDirection";
import { Compass, CompassNeedle } from "../Compass";
import { View } from "react-native";
import { Text } from "~/components/ui/text";

export function WindWidget() {
  const forecast = useSignalK()?.environment?.forecast;

  return (
    <Widget className="rounded-full aspect-square p-0">
      <Compass className="w-full aspect-square">
        <CompassNeedle
          rad={forecast?.wind?.direction?.value}
          fill={colorForValue(forecast?.wind?.speed?.value)}
        />
      </Compass>

      <View className="absolute inset-0 items-center justify-center">
        <CardinalDirection className="text-2xl" rad={forecast?.wind?.direction?.value } />
        <View>
          <MeasurementValue size="6xl" variant="centered" {...{...forecast?.wind?.speed} } decimals={0} />
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

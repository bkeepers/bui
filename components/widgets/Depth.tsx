import { useSignalK } from "~/hooks/useSignalK";
import { Widget, WidgetTitle } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";
import { View } from "react-native";

export function DepthWidget() {
  const data = useSignalK()?.environment?.depth;

  const value = data?.belowTransducer || data?.belowKeel || data?.belowSurface;

  return (
    <Widget>
      <WidgetTitle>Depth</WidgetTitle>
      <View className="items-end">
        <MeasurementValue size="8xl" {...value} />
      </View>
    </Widget>
  )
}

import { useSignalK } from "~/hooks/useSignalK";
import { Widget, WidgetLabel } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";

export function SpeedWidget() {
  const data = useSignalK();

  return (
    <Widget>
      <WidgetLabel>Speed Over Ground</WidgetLabel>
      <MeasurementValue size="4xl" {...data?.navigation?.speedOverGround} />

      <WidgetLabel>Speed Through Water</WidgetLabel>
      <MeasurementValue size="4xl" {...data?.navigation?.speedThroughWater} />
    </Widget>
  )
}

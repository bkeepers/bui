import { Solar } from "~/types/signalk";
import { Widget } from "../Widget";
import { Text } from "../ui/text";
import { MeasurementValue } from "../MeasurementValue";

type Props = {
  name: string;
  data: Solar;
}

export function SolarWidget({name, data}: Props) {
  return (
    <Widget title={name} status={data.chargingMode?.value}>
      <Text>Voltage</Text>
      <MeasurementValue {...data.voltage} />
      <Text>Current</Text>
      <MeasurementValue {...data.current} />
      <Text>Power</Text>
      <MeasurementValue {...data.panelPower} />
      <Text>Yield Today</Text>
      <MeasurementValue {...data.yieldToday} />
    </Widget>
  )
}

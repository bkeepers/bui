import { Inverter } from "~/types/signalk";
import { Widget } from "../Widget";
import { Text } from "../ui/text";
import { MeasurementValue } from "../MeasurementValue";

type Props = {
  name: string;
  data: Inverter;
}

export function InverterWidget({name, data}: Props) {
  if(name === 'meta') return null;

  return (
    <Widget title={name} status={data.inverterMode?.value}>
      <Text>Voltage</Text>
      <MeasurementValue {...data.dc?.voltage} />
      <Text>Current</Text>
      <MeasurementValue {...data.dc?.current} />
      <Text>Temperature</Text>
      <MeasurementValue {...data.dc?.temperature} />


      <Text>Apparent Power</Text>
      <MeasurementValue {...data.ac?.apparentPower} />
      {/* <Text>Power</Text>
      <MeasurementValue {...data.panelPower} />
      <Text>Yield Today</Text>
      <MeasurementValue {...data.yieldToday} /> */}
    </Widget>
  )
}

import { Converter } from "~/types/signalk";
import { Widget } from "../Widget";
import { Text } from "../ui/text";
import { MeasurementValue } from "../MeasurementValue";

type Props = {
  name: string;
  data: Converter;
}

export function ConverterWidget({name, data}: Props) {
  return (
    <Widget title={name} status={data.chargingMode?.value}>
      <Text>Input Voltage</Text>
      <MeasurementValue {...data.input?.voltage} defaultUnits="V" />
      <Text>Output Voltage</Text>
      <MeasurementValue {...data.output?.voltage} defaultUnits="V" />
    </Widget>
  )
}

import { Solar } from "~/types/signalk";
import { Widget } from "../Widget";
import { Text } from "../ui/text";
import { MeasurementValue } from "../MeasurementValue";
import { Stat } from "./Stat";

type Props = {
  name: string;
  data: Solar;
}

export function BatteryWidget({name, data}: Props) {
  return (
    <Widget title={name}>
      <MeasurementValue {...data?.voltage} />
      { data?.capacity ? <MeasurementValue {...data?.capacity?.stateOfCharge} /> : null }
    </Widget>
  )
}

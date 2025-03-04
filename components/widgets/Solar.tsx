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


//   "yieldToday": {
//     "meta": {
//       "units": "J",
//       "description": "Data should be of type number."
//     },
//     "value": 3744000,
//     "$source": "signalk-victron-ble.E7:22:A6:22:9B:94",
//     "timestamp": "2025-03-03T19:36:19.652427Z"
//   }
// }

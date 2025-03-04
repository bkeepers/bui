import { BatteryKeyedByInstanceId } from "~/types/signalk";
import { Widget } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";
import { View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProgressCircle } from 'react-native-svg-charts'

type Props = {
  name: string;
  data: BatteryKeyedByInstanceId;
}

export function BatteryWidget({name, data}: Props) {
  if(name === "meta") return null;
  const stateOfCharge = data?.capacity?.stateOfCharge?.value ?? 0;

  const chartData = [
    {value: stateOfCharge * 100, color: '#33CC33', focused: true, text: `${(stateOfCharge * 100).toFixed(1)}%`},
    {value: (1 - stateOfCharge) * 100, color: '#EEEEEE'},
  ];

  const icon = [
    'battery-dead',
    'battery-half',
    'battery-full',
  ][Math.round(stateOfCharge * 3)];

  return (
    <Widget title={name}>
      {/* <View style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
      <ProgressCircle style={{ height: 60, width: 60 }} progress={stateOfCharge} progressColor='#33CC33' />
      </View> */}

      <View className="flex flex-col justify-center">
        <Ionicons name={icon} size={24} className="text-foreground" />
        <MeasurementValue {...data?.capacity?.stateOfCharge} />
        <MeasurementValue {...data?.voltage} className="text-sm" />
        <MeasurementValue {...data?.current} className="text-sm" />
        <MeasurementValue {...data?.power} className="text-sm" defaultUnits="w" />
      </View>
    </Widget>
  )
}

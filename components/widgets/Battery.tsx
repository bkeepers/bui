import { BatteryKeyedByInstanceId } from "~/types/signalk";
import { Widget, WidgetData } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";
import { View, ViewProps } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProgressCircle } from 'react-native-svg-charts'
import { Text } from '../ui/text';
import { iconWithClassName } from "../icons/iconWithClassName";

iconWithClassName(Ionicons)

export type BatteryWidgetProps = ViewProps & {
  data: { [key: string]: BatteryKeyedByInstanceId }
}

export function BatteryWidget({data, ...props}: BatteryWidgetProps) {
  const stateOfCharge = Object.values(data).map(battery => battery.capacity?.stateOfCharge?.value).filter(Boolean)[0] ?? .5;

  const icon = [
    'battery-dead',
    'battery-half',
    'battery-full',
  ][Math.round(stateOfCharge * 3)];

  return (
    <Widget title="Batteries" icon={<Ionicons name={icon} size={20} className="text-foreground" />} {...props}>
      { Object.entries(data ?? {}).map(([key, value]) => <BatteryPane key={key} name={key} data={value} />) }
    </Widget>
  );
}

type Props = {
  name: string;
  data: BatteryKeyedByInstanceId;
}

export function BatteryPane({name, data}: Props) {
  if(name === "meta") return null;

  const stateOfCharge = data.capacity?.stateOfCharge?.value

  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Text className="text-2xl flex-1">{ name }</Text>
        {stateOfCharge && <MeasurementValue {...data?.capacity?.stateOfCharge} size="xl" />}
      </View>
      {stateOfCharge && <ProgressCircle style={{ height: 30, width: 30 }} progress={stateOfCharge ?? 0} progressColor='#10b981' />}

      <WidgetData data={[
        { name: 'Voltage', value: data.voltage },
        { name: 'Power', value: { ...data.power, fromUnit: "w" } },
        { name: 'Current', value: data.current },
      ]} />

    </View>
  )
}

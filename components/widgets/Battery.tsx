import { BatteryKeyedByInstanceId } from "~/types/signalk";
import { Widget, WidgetData } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";
import { View, ViewProps } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import { ProgressCircle } from '~/components/ui/charts';
import { Text } from '../ui/text';
import { iconWithClassName } from "../icons/iconWithClassName";
import { useSignalK } from "~/hooks/useSignalK";

iconWithClassName(Ionicons)

export function BatteryWidget(props: ViewProps) {
  const data = useSignalK()?.electrical?.batteries ?? {};

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

  const stateOfCharge = data?.capacity?.stateOfCharge?.value

  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Text className="text-2xl flex-1">{ name }</Text>
        {stateOfCharge && <MeasurementValue {...data?.capacity?.stateOfCharge} size="xl" />}
      </View>

      <WidgetData data={[
        { name: 'Voltage', value: data.voltage },
        { name: 'Power', value: { ...data.power, fromUnit: "w" } },
        { name: 'Current', value: data.current },
      ]} />

    </View>
  )
}

import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { WidgetTitle } from "../Widget";
import { useState } from "react";
import { WidgetLabel } from "../Widget";

export function StateOfChargeWidget() {
  const data = useSignalK().electrical?.batteries?.house;
  const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 });

  function onLayout(e) {
    setDimensions(e.nativeEvent.layout);
  }

  const progress = data?.capacity?.stateOfCharge?.value;

  return (
    <Widget onLayout={onLayout} className="rounded-full aspect-square">
      <View className="absolute inset-0 items-center justify-center">
        <ProgressCircle
          className="text-accent bg-muted"
          strokeWidth={12}
          progress={progress || 0}
          startAngle={-Math.PI * 0.9}
          endAngle={Math.PI * 0.9}
          style={ { width: dimensions.width - 20, height: dimensions.height - 20 } }
        />
      </View>
      <View className="absolute inset-0 items-center justify-center">
        <View>
          <MeasurementValue size="8xl" variant="centered" {...data?.capacity?.stateOfCharge} decimals={0} />
          <View className="absolute left-0 right-0 top-full justify-center">
            <WidgetTitle>House</WidgetTitle>
          </View>
        </View>
      </View>

      <View className="items-center pt-10">
        {/* <View className="flex flex-row gap-2">
          <View className="items-center">
            <WidgetLabel>Humidity</WidgetLabel>
            <MeasurementValue {...forecast?.relativeHumidity } decimals={0} />
          </View>
          <View className="items-center">
            <WidgetLabel>Feels Like</WidgetLabel>
            <MeasurementValue {...temperature?.feelslike } decimals={0} />
          </View>
          <View className="items-center">
            <WidgetLabel>Dewpoint:</WidgetLabel>
            <MeasurementValue {...forecast?.temperature?.dewpoint } decimals={0} />
          </View>
        </View> */}
      </View>
    </Widget>
  )
}

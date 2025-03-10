import { Inverter } from "~/types/signalk";
import { Widget, WidgetData } from "../Widget";
import { MeasurementValue } from "../MeasurementValue";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View, ViewProps } from "react-native";
import { Text } from "../ui/text";
import { Badge } from "../ui/badge";
import { iconWithClassName } from "../icons/iconWithClassName";

iconWithClassName(MaterialCommunityIcons)

export type InverterProps = ViewProps & {
  data: { [key: string]: Inverter }
}

export function InverterWidget({data, ...props}: InverterProps) {
  return (
    <Widget title="Inverters" icon={<MaterialCommunityIcons name="tilde" size={20} className="text-foreground" />} {...props}>
      { Object.entries(data ?? {}).map(([key, value]) => <InverterPane key={key} name={key} data={value} />) }
    </Widget>
  );
}

type InverterPaneProps = {
  name: string;
  data: Inverter;
}

export function InverterPane({name, data}: InverterPaneProps) {
  if(name === 'meta') return null;

  return (
    <View>
      <View className="flex flex-row items-center gap-2">
        <Text>{name}</Text>
        <Badge variant="muted"><Text>{data?.inverterMode?.value}</Text></Badge>
        <View className="flex-1"></View>
        <MeasurementValue size="xl" {...data.dc?.current} />
      </View>
      <WidgetData data={[
        { name: 'Voltage', value: data.dc?.voltage },
        { name: 'Power', value: data.ac?.apparentPower },
        { name: 'Temperature', value: data.dc?.temperature }
      ]} />
    </View>
  )
}

import { Widget, WidgetData } from "../Widget";
import { Text } from "../ui/text";
import { View, ViewProps } from "react-native";
import { ArrowLeftRight } from "../icons/ArrowLeftRight";
import { Badge } from "../ui/badge";

export type ConverterProps = ViewProps & {
  data: { [key: string]: Converter }
}

export function ConverterWidget({data, ...props}: ConverterProps) {
  return (
    <Widget title="Converters" icon={<ArrowLeftRight size={24} className="text-foreground" />} {...props}>
      { Object.entries(data ?? {}).map(([key, value]) => <ConverterPane key={key} name={key} data={value} />) }
    </Widget>
  );
}

type Props = {
  name: string;
  data: Converter;
}

export function ConverterPane({name, data}: Props) {
  return (
    <View>
      <View className="flex flex-row gap-2">
        <Text>{name}</Text>
        <Badge variant="muted"><Text>{data?.chargingMode?.value}</Text></Badge>
      </View>
      <WidgetData data={[
        { name: 'Input Voltage', value: { ...data.input?.voltage, defaultUnits: "V" }},
        { name: 'Output Voltage', value: { ...data.output?.voltage, defaultUnits: "V"}},
      ]} />
    </View>
  )
}

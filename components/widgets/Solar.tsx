import { Solar } from "~/types/signalk";
import { Widget, WidgetData } from "../Widget";
import { Text } from "../ui/text";
import { MeasurementValue } from "../MeasurementValue";
import { Sun } from "../icons/Sun";
import { View, ViewProps } from "react-native";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { useSignalK } from "~/hooks/useSignalK";

export function SolarWidget(props: ViewProps) {
  const data = useSignalK()?.electrical?.solar;

  return (
    <Widget title="Solar" icon={<Sun size={20} className="text-foreground" />} {...props}>
      { Object.entries(data ?? {}).map(([key, value]) => <SolarPane key={key} name={key} data={value} />) }
    </Widget>
  )
}

export function SolarPane({name, data, ...props}: ViewProps & { name: string, data: Solar }) {
  if(name === "meta") return null;

  const status = data.chargingMode?.value

  return (
    <CardContent className="flex-1 flex gap-2">
      <View className="flex flex-row items-center gap-2">
        <Text className='text-3xl leading-none'>
          {name}
        </Text>
        { status ? <Badge variant="muted"><Text>{status}</Text></Badge> : null }
        <View className="flex-grow"></View>
        <View>
          <MeasurementValue size="lg" {...data.current} />
        </View>
      </View>

      <WidgetData data={[
        { name: 'Battery Voltage', value: data.voltage },
        { name: 'Power', value: data.panelPower },
        { name: 'Yield Today', value: data.yieldToday }
      ]} />
    </CardContent>
  )
}

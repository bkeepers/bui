import { ProgressCircle } from '~/components/ui/charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { Widget, WidgetTitle } from "../Widget";
import { useState } from "react";
import { LayoutChangeEvent, View } from 'react-native';
import { MeasurementValue } from '../MeasurementValue';
import { WidgetLabel } from "../Widget";
import { useSignalK } from '~/hooks/useSignalK';

export function ThermometerWidget() {
  const forecast = useSignalK().environment?.forecast;
  const temperature = forecast?.temperature;
  const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 });

  function onLayout(e: LayoutChangeEvent) {
    setDimensions(e.nativeEvent.layout);
  }

  const min = temperature?.minimum?.value; // ºk, too damn cold
  const max = temperature?.maximum?.value; // ºk, too damn hot
  const progress = (temperature?.value - min) / (max - min);

  return (
    <Widget onLayout={onLayout} className="rounded-full aspect-square">
      <View className="absolute inset-0 items-center justify-center">
        <ProgressCircle
          className="bg-muted"
          strokeWidth={12}
          progress={progress || 0}
          startAngle={-Math.PI * 0.6}
          endAngle={Math.PI * 0.6}
          style={ { width: dimensions.width - 20, height: dimensions.height - 20 } }
          progressColor="url(#gradient)">
          <Defs key={'gradient'}>
            <LinearGradient
              id={'gradient'}
              x1={'0%'}
              y={'0%'}
              x2={'100%'}
              y2={'0%'}>
              <Stop offset={'0%'} stopColor='#3b82f6' />
              <Stop offset={'100%'} stopColor='#ef4444' />
            </LinearGradient>
          </Defs>
        </ProgressCircle>

      </View>
      <View className="absolute inset-0 items-center justify-center">
        <View className="w-full items-center">
          <MeasurementValue size="6xl" variant="centered" {...temperature} decimals={0} />
          <View className="absolute left-0 right-0 top-full items-center">
            <WidgetTitle>Outdoor</WidgetTitle>
          </View>
        </View>
      </View>
      <View className="w-full h-full items-center justify-end gap-4 pb-3">
        <View className="flex flex-row gap-6 justify-between">
          <View className="items-center">
            <WidgetLabel>Hum</WidgetLabel>
            <MeasurementValue size="2xl" variant="centered" {...forecast?.relativeHumidity } decimals={0} />
          </View>
          <View className="items-center">
            <WidgetLabel>Feel</WidgetLabel>
            <MeasurementValue size="2xl" variant="centered" {...temperature?.feelslike } decimals={0} />
          </View>
          <View className="items-center">
            <WidgetLabel>Dew</WidgetLabel>
            <MeasurementValue size="2xl" variant="centered" {...forecast?.temperature?.dewpoint } decimals={0} />
          </View>
        </View>
      </View>
    </Widget>
  )
}

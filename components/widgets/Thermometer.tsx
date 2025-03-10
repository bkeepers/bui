import { ProgressCircle } from 'react-native-svg-charts';
import { Defs, LinearGradient, Stop } from 'react-native-svg';
import { Widget, WidgetTitle } from "../Widget";
import { useState } from "react";
import { View } from 'react-native';
import { MeasurementValue } from '../MeasurementValue';
import { WidgetLabel } from "../Widget";
import { useSignalK } from '~/hooks/useSignalK';
import { Thermometer } from "../icons";

export function ThermometerWidget() {
  const forecast = useSignalK().environment?.forecast;
  const temperature = forecast?.temperature;
  const [ dimensions, setDimensions ] = useState({ width: 0, height: 0 });

  function onLayout(e) {
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
          strokeWidth={4}
          progress={progress}
          startAngle={-Math.PI * 0.6}
          endAngle={Math.PI * 0.6}
          style={ { width: dimensions.width - 10, height: dimensions.height - 10 } }
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
      <View className="w-full h-full items-center justify-center gap-4">
        <WidgetTitle icon={<Thermometer size={20} className="text-foreground" />}>Outdoor</WidgetTitle>
        <View className="pl-4">
          <MeasurementValue size="8xl" {...temperature} decimals={0} />
        </View>
        <View className="flex flex-row gap-2">
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

        </View>
      </View>
    </Widget>
  )
}

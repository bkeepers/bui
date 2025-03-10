import { View, ViewProps } from "react-native";
import { Text } from "~/components/ui/text";
import { MeasurementValue } from "../MeasurementValue";
import { useSignalK } from "~/hooks/useSignalK";
import { DateTime } from "../DateTime";
import { Widget, WidgetLabel } from "../Widget";
import { CardinalDirection } from "../CardinalDirection";
import { ProgressCircle } from "react-native-svg-charts";
import { cssInterop } from "nativewind";

export function DataLabel({ children }: ViewProps) {
  return (
    <Text>{ children }</Text>
  )
}

const emoji = {
  "01d":"☀️" ,
  "02d":"⛅️" ,
  "03d":"☁️" ,
  "04d":"☁️" ,
  "09d":"\uD83C\uDF27" ,
  "10d":"\uD83C\uDF26" ,
  "11d":"⛈" ,
  "13d":"❄️" ,
  "50d":"\uD83C\uDF2B" ,
  "01n":"\uD83C\uDF11" ,
  "02n":"\uD83C\uDF11 ☁" ,
  "03n":"☁️" ,
  "04n":"️️☁☁" ,
  "09n":"\uD83C\uDF27" ,
  "10n":"☔️" ,
  "11n":"⛈" ,
  "13n":"❄️" ,
  "50n":"\uD83C\uDF2B"
}

export function ForecastWidget() {
  const forecast = useSignalK().environment?.forecast;

  return (
    <Widget title="Forecast">
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-3xl"></Text>
        <Text className="text-8xl">{ emoji[forecast?.weather?.icon?.value] }</Text>
        <Text className="text-3xl font-light">{ forecast?.weather?.value }</Text>
      </View>
      <View className="flex-1 justify-between">
        <View className="flex-row justify-between">
          <View>
            <WidgetLabel>Cloud Cover</WidgetLabel>
            <MeasurementValue size="xl" {...forecast?.weather?.clouds } decimals={0} />
          </View>

          <View className="items-end">
            <WidgetLabel>Precipitation</WidgetLabel>
            <MeasurementValue size="xl" {...forecast?.precipitation?.probability } decimals={0} />
          </View>
        </View>
        <View className="flex-row justify-between">
          <View>
            <WidgetLabel>UV</WidgetLabel>
            <MeasurementValue size="xl" {...forecast?.weather?.uvindex } decimals={0} />
          </View>

          <View className="items-end">
            <WidgetLabel>Visibility:</WidgetLabel>
            <MeasurementValue size="xl" {...forecast?.weather?.visibility } decimals={0} toUnit="mi" />
          </View>
        </View>

        <View className="flex-row justify-between">
          <View>
            <WidgetLabel>High</WidgetLabel>
            <MeasurementValue size="xl" {...forecast?.temperature?.maximum } fromUnit="K" decimals={0} />
          </View>
          <View className="items-end">
            <WidgetLabel>Low</WidgetLabel>
            <MeasurementValue size="xl" {...forecast?.temperature?.minimum } fromUnit="K" decimals={0} />
          </View>
        </View>
      </View>
    </Widget>
  )
}

export function BarometerWidget() {
  const data = useSignalK().environment;

  return (
    <Widget title="Barometer">
      <MeasurementValue size="4xl" {...(data?.outside?.pressure ?? data?.forecast?.pressure) } decimals={2} />

      <Text>{ data?.barometer?.description?.value }</Text>
    </Widget>
  )
}

export function WindWidget() {
  const forecast = useSignalK().environment?.forecast;

  return (
    <>
      {/* <DateTime className="text-xs text-muted-foreground" value={forecast?.time?.value } dateStyle="short" timeStyle="short" /> */}

      <Widget title="Wind">
        <Text>Wind Direction:</Text>
        <MeasurementValue {...forecast?.wind?.direction } decimals={0} />
        <CardinalDirection rad={forecast?.wind?.direction?.value } />
        <Text>Wind Speed:</Text>
        <MeasurementValue {...forecast?.wind?.speed } decimals={0} />
        <Text>Wind Gust:</Text>
        <MeasurementValue {...forecast?.wind?.gust } decimals={0} />
      </Widget>
    </>
  )
}

export function SunWidget() {
  const data = useSignalK().environment?.sunlight;

  const start = new Date(data?.times?.sunrise?.value).getTime()
  const end = new Date(data?.times?.sunset?.value).getTime()
  const progress = (new Date().getTime() - start) / (end - start);

  return (
    <Widget title="Sun">
      <View className="absolute inset-0 items-center justify-center">
        <ProgressCircle
          className="bg-muted text-yellow-500"
          strokeWidth={8}
          progress={progress}
          startAngle={-Math.PI * 0.5}
          endAngle={Math.PI * 0.5}
          style={ { width: 140, height: 140, marginBottom: -80 } }>
        </ProgressCircle>
      </View>

      <View className="flex flex-row justify-between">
        <View>
          <WidgetLabel>Dawn</WidgetLabel>
          <DateTime className="text-3xl tracking-tigher" {...data?.times.nauticalDawn } timeStyle="short" />
        </View>
        <View className="items-end">
          <WidgetLabel>Dusk</WidgetLabel>
          <DateTime className="text-3xl tracking-tigher" {...data?.times.nauticalDusk } timeStyle="short" />
        </View>
      </View>
      <View className="flex flex-row justify-between mt-auto">
        <View>
          <WidgetLabel>Rise</WidgetLabel>
          <DateTime className="text-3xl tracking-tigher" {...data?.times.sunrise } timeStyle="short" />
        </View>
        <View className="items-end">
          <WidgetLabel>Set</WidgetLabel>
          <DateTime className="text-3xl tracking-tigher" {...data?.times.sunset } timeStyle="short" />
        </View>
      </View>
    </Widget>
  )
}

const moonPhases = [ "🌑", "🌒", "🌓", "🌔", "🌕", "🌖", "🌗", "🌘" ];

cssInterop(ProgressCircle, {
  className: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: "backgroundColor",
      color: "progressColor",
    }
  }
})

export function MoonWidget() {
  const data = useSignalK().environment?.moon;

  const selectedPhase = Math.round(data?.phase?.value * 8);
  return (
    <Widget title="Moon">
      <View className="absolute inset-0 items-center justify-center">
        <Text className="text-center text-8xl leading-tight">{moonPhases[selectedPhase]}</Text>
      </View>
      <View className="absolute inset-0 items-center justify-center">
        <ProgressCircle
          className="text-muted bg-muted"
          strokeWidth={4}
          progress={data?.fraction?.value}
          startAngle={-Math.PI * 0.8}
          endAngle={Math.PI * 0.8}
          style={ { width: 100, height: 100 } }
        >
        </ProgressCircle>
      </View>

      <Text className="text-center text-2xl text-muted-foreground">{data?.phaseName?.value}</Text>

      <View className="flex flex-row items-center justify-between mt-auto">
        <View>
          <WidgetLabel>Rise</WidgetLabel>
          <DateTime className="text-3xl tracking-tigher" {...data?.times.rise } timeStyle="short" />
        </View>
        <View className="items-end">
          <WidgetLabel>Set</WidgetLabel>
          <DateTime className="text-3xl tracking-tigher" {...data?.times.set } timeStyle="short" />
        </View>
      </View>
    </Widget>
  )
}

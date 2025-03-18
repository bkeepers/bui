import { useSignalK } from "~/hooks/useSignalK";
import { Widget, WidgetTitle } from "../Widget";
import { Text } from "~/components/ui/text";
import { View, StyleSheet } from "react-native";

export function PositionWidget() {
  const position = useSignalK()?.navigation?.position;
  const lat = Coordinate.lat(position?.value?.latitude ?? NaN);
  const lon = Coordinate.lon(position?.value?.longitude ?? NaN);

  return (
    <Widget>
      <WidgetTitle className="text-center">Position</WidgetTitle>
      <View className="flex-1 items-center justify-center">
        <View className="flex-row gap-2">
          <Text style={styles.coordinate} className="text-4xl font-semibold tracking-tighter">{ lat.format('DD mm') }</Text>
          <Text className="text-2xl w-8">{ lat.format('X') }</Text>
        </View>
        <View className="flex-row gap-2">
          <Text style={styles.coordinate} className="text-4xl font-semibold tracking-tighter">{ lon.format('DD mm') }</Text>
          <Text className="text-2xl w-8">{ lon.format('X') }</Text>
        </View>
      </View>
    </Widget>
  )
}

const styles = StyleSheet.create({
  coordinate: {
   fontVariant: ['tabular-nums']
  }
})

type CoordinateFormatOptions = {
  precision: number,
  units: { degrees: string, minutes: string, seconds: string }
}

// Adapted from https://github.com/nerik/formatcoords
class Coordinate {
  static lat(value: number) {
    return new Coordinate(value, ['N', 'S']);
  }

  static lon(value: number) {
    return new Coordinate(value, ['E', 'W']);
  }

  constructor(public value: number, public directions: [string, string]) {
  }

  get degrees() {
    return Math.abs(this.value);
  }

  get minutes() {
    return (this.degrees % 1) * 60;
  }

  get seconds() {
    return (this.minutes % 1) * 60;
  }

  get direction() {
    return this.directions[this.value > 0 ? 0 : 1];
  }

  format(format: string, options?: CoordinateFormatOptions) {
    if(isNaN(this.value)) return;

    const {
      precision = 3,
      units = { degrees: '°', minutes: '′', seconds: '″' }
    } = options ?? {};

    const formats: [RegExp, () => string][] = [
      [/DD/g, () => [Math.floor(this.degrees), units.degrees].join('') ],
      [/dd/g, () => [this.degrees.toFixed(precision), units.degrees].join('') ],
      [/D/g, () => Math.floor(this.degrees).toString()],
      [/d/g, () => this.degrees.toFixed(precision)],
      [/MM/g, () => [Math.floor(this.minutes), units.minutes].join('') ],
      [/mm/g, () => [this.minutes.toFixed(precision), units.minutes].join('') ],
      [/M/g, () => Math.floor(this.minutes).toString()],
      [/m/g, () => this.minutes.toFixed(precision)],
      [/ss/g, () => [this.seconds.toFixed(precision), units.seconds].join('') ],
      [/s/g, () => this.seconds.toFixed(precision)],
      [/-/g, () => this.value <0  ? '-' : ''],
      [/X/g, () => this.direction],
    ]

    return formats.reduce((result, [regex, replacer]) => {
      return result.replace(regex, replacer);
    }, format);
  }
}

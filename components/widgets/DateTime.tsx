import { View, ViewProps } from "react-native";
import { Text } from "../ui/text";
import moment from "moment";
import { useState } from "react";
import { useInterval } from 'usehooks-ts'
import { Widget } from "../Widget";

const formats = {
  weekday: "dddd",
  year: "YYYY",
  month: "MMM",
  day: "D",
  hour: "h",
  minute: "mm",
  dayPeriod: "A",
  timeZone: "z",
}

export function DateTimeWidget(props?: ViewProps) {
  const [date, setDate] = useState(moment());
  useInterval(() => { setDate(moment()) }, 1000)

  const {
    weekday,
    year,
    month,
    day,
    hour,
    minute,
    dayPeriod,
  } = Object.fromEntries(Object.entries(formats).map(([key, value]) => [key, date.format(value)]));

  const timeZone = new Intl.DateTimeFormat().resolvedOptions().timeZone;

  return (
    <Widget {...props}>
      <View className="flex-1 flex flex-row px-4 items-center justify-evenly">
        <View>
          <View className="flex flex-row items-baseline">
            <Text className="tracking-tighter text-8xl font-medium">{hour}</Text>
            <Text className={`text-8xl ${date.get('seconds') % 2 === 0 ? 'invisible' : ''} `}>:</Text>
            <Text className="tracking-tighter text-8xl font-medium">{minute}</Text>
            <Text className="tracking-tighter text-3xl uppercase">{dayPeriod}</Text>
          </View>
          <Text className="tracking-tighter text-5xl font-light uppercase">{weekday}</Text>
          <Text className="tracking-tighter text-2xl font-light uppercase">{timeZone}</Text>
        </View>

        <View className="items-end">
          <Text className="tracking-tighter text-8xl font-medium">{day}</Text>
          <Text className="tracking-tighter text-5xl font-light uppercase">{month}</Text>
          <Text className="tracking-tighter text-2xl font-light">{year}</Text>
        </View>
      </View>
    </Widget>
  );
}

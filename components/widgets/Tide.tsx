/*
environment.tide.heightHigh 2.9670000076293945 m	03/01 20:01:00	signalk-tide-watch.XX
environment.tide.heightLow 1.9830000400543213 m	03/01 20:01:00	signalk-tide-watch.XX
environment.tide.heightNow null m	03/01 21:15:45	signalk-tide-watch.XX
environment.tide.phaseNow "flood" 03/01 21:15:45	signalk-tide-watch.XX
environment.tide.timeHigh "2025-03-02T02:47:16.830Z" RFC 3339 (UTC)	03/01 20:01:00	signalk-tide-watch.XX
environment.tide.timeLow "2025-03-02T08:02:17.336Z" RFC 3339 (UTC)	03/01 20:01:00	signalk-tide-watch.XX
*/

import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useSignalK } from '~/hooks/useSignalK';
import type { Tide } from "~/types/signalk";
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export type Props = Tide;

const format = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'short'
});

function formatDate(date: string) {
  if (!date) return "-";
  return format.format(new Date(date));
}

export function TideWidget(props: Tide) {
  const data = useSignalK();
  const { heightHigh, heightLow, phaseNow, timeHigh, timeLow } = data?.environment?.tide ?? {};

  return (
    <Card className='w-full max-w-sm rounded-xl'>
      <CardHeader>
        <CardTitle className='pb-2'>Tides</CardTitle>
      </CardHeader>
      <CardContent>
        <View className='flex-row justify-around gap-3'>
          <View className='items-center'>
            <Text className='text-muted-foreground'>High</Text>
            <Text className='text-xl font-semibold'>{heightHigh?.value?.toFixed(2) ?? '-'}</Text>
            <Text className=''>{formatDate(timeHigh?.value)}</Text>
          </View>
          <View >
            <Text className='text-3xl'>{ phaseNow?.value === "flood" ? '⬆' :  '⬇' }</Text>
          </View>
          <View className='items-center'>
            <Text className='text-sm text-muted-foreground'>Low</Text>
            <Text className='text-xl font-semibold'>{ heightLow?.value?.toFixed(2) ?? '-' }</Text>
            <Text className=''>{formatDate(timeLow?.value)}</Text>
          </View>
        </View>
      </CardContent>
    </Card>
  );
}

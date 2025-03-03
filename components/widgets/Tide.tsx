import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useSignalK } from '~/hooks/useSignalK';
import type { Tide } from "~/types/signalk";
import { Widget } from '../Widget';
import { MeasurementValue } from '../MeasurementValue';
import { DateTime } from '../DateTime';

export type Props = Tide;

export function TideWidget(props: Tide) {
  const data = useSignalK();
  const { heightHigh, heightLow, phaseNow, timeHigh, timeLow } = data?.environment?.tide ?? {};

  return (
    <Widget title='Tides'>
      <View className='flex-row justify-around gap-3'>
        <View className='items-center'>
          <Text className='text-muted-foreground'>High</Text>
          <MeasurementValue {...heightHigh} />
          <DateTime value={timeHigh?.value} timeStyle="short" />
        </View>
        <View >
          <Text className='text-3xl'>{ phaseNow?.value === "flood" ? '⬆' :  '⬇' }</Text>
        </View>
        <View className='items-center'>
          <Text className='text-sm text-muted-foreground'>Low</Text>
          <MeasurementValue {...heightLow} />
          <DateTime value={timeHigh?.value} timeStyle="short" />
        </View>
      </View>
    </Widget>
  );
}

import * as React from 'react';
import { View } from 'react-native';
import { TideWidget } from '~/components/widgets/Tide';
import { useSignalK } from '~/hooks/useSignalK';
import { Text } from '~/components/ui/text';
import { DateTime } from '~/components/DateTime';

export default function Screen() {
  const data = useSignalK();

  return (
    <View className='gap-3 p-6 bg-secondary/30'>
      <View>
        <View className='flex-row gap-3'>
          <Text className="text-lg font-semibold m-0 p-0 flex-1">
            {data?.name}
          </Text>
          <DateTime value={data?.navigation?.datetime?.value} dateStyle="long" timeStyle="short" />
        </View>

        { data?.mmsi ? (
          <Text className='text-sm text-muted-foreground/60 m-0 p-0'>
            MMSI: {data?.mmsi}
          </Text>
        ) : null }
      </View>
      <TideWidget />
    </View>
  );
}

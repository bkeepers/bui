import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useSignalK } from '~/hooks/useSignalK';

export function VesselHeader() {
  const data = useSignalK();

  return (
    <View>
      <View className='flex-row gap-4'>
        <Text className="text-lg font-semibold m-0 p-0 flex-1 leading-none">
          {data?.name}
        </Text>
        {/* <DateTime value={data?.navigation?.datetime?.value} dateStyle="long" timeStyle="short" /> */}
      </View>

      { data?.mmsi ? (
        <Text className='text-sm text-muted-foreground m-0 p-0'>
          MMSI: {data?.mmsi}
        </Text>
      ) : null }
    </View>
  );
}

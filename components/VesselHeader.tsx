import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useSignalK } from '~/hooks/useSignalK';
import { Badge } from './ui/badge';

export function VesselHeader() {
  const data = useSignalK();

  return (
    <View>
      <View className='flex-row'>
        <Text className="text-lg font-semibold m-0 p-0 flex-1 leading-none">
          {data?.name}
        </Text>
        <Badge className="text-4xl" variant="muted"><Text>{ data?.navigation?.state?.value }</Text></Badge>
      </View>

      { data?.mmsi ? (
        <Text className='text-sm text-muted-foreground m-0 p-0'>
          MMSI: {data?.mmsi}
        </Text>
      ) : null }
    </View>
  );
}

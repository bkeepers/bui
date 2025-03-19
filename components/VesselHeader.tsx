import { View } from 'react-native';
import { Text } from '~/components/ui/text';
import { useSignalK } from '~/hooks/useSignalK';
import { Badge } from './ui/badge';

export function VesselHeader() {
  const data = useSignalK();

  return (
    <View className='flex-row items-center gap-4'>
      <Text className="text-xl font-semibold leading-none">
        {data?.name}
      </Text>
      <Badge className="text-4xl" variant="muted"><Text>{data?.navigation?.state?.value}</Text></Badge>
    </View>
  );
}

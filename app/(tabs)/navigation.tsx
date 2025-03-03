import { View } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { Text } from '~/components/ui/text';
import { useSignalK } from '~/hooks/useSignalK';

export default function Navigation() {
  const data = useSignalK();

  return (
    <View>
      <JSONTree data={data?.navigation} />
    </View>
  )
}

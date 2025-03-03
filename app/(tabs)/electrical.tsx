import { View } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { Text } from '~/components/ui/text';
import { useSignalK } from '~/hooks/useSignalK';

export default function Electrical() {
  const data = useSignalK();

  return (
    <View>
      <Text>Electrical</Text>

      <JSONTree data={data?.electrical} />
    </View>
  )
}

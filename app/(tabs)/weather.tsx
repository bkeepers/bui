import { View } from 'react-native';
import JSONTree from 'react-native-json-tree';
import { useSignalK } from '~/hooks/useSignalK';

export default function Weather() {
  const data = useSignalK();

  return (
    <View>
      <JSONTree data={data?.environment} />
    </View>
  )
}

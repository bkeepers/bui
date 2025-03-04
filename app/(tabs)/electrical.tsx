import JSONTree from 'react-native-json-tree';
import { Dashboard } from '~/components/Dashboard';
import { useSignalK } from '~/hooks/useSignalK';
import { Text } from '~/components/ui/text';
import { SolarWidget } from '~/components/widgets/Solar';
import { BatteryWidget } from '~/components/widgets/Battery';
import { View } from 'react-native';

export default function Electrical() {
  const data = useSignalK();

  return (
    <Dashboard>
      <Text className="text-xl">Batteries</Text>
      <View className="grid grid-cols-3 gap-4">
        {
          Object.entries(data.electrical?.batteries ?? {}).map(([key, data]) => (
            <BatteryWidget key={key} name={key} data={data} />
          ))
        }
      </View>

      <Text className="text-xl">Solar</Text>
      <View className="grid grid-cols-3 gap-4">
        {
          Object.entries(data.electrical?.solar ?? {}).map(([key, data]) => (
            <SolarWidget key={key} name={key} data={data} />
          ))
        }
      </View>

      <JSONTree data={data?.electrical ?? {}} />
    </Dashboard>
  )
}

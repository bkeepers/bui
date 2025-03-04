import JSONTree from 'react-native-json-tree';
import { Dashboard } from '~/components/Dashboard';
import { useSignalK } from '~/hooks/useSignalK';
import { Text } from '~/components/ui/text';
import { SolarWidget } from '~/components/widgets/Solar';
import { BatteryWidget } from '~/components/widgets/Battery';
import { InverterWidget } from '~/components/widgets/Inverter';
import { View } from 'react-native';
import { ConverterWidget } from '~/components/widgets/Converter';

export default function Electrical() {
  const data = useSignalK();

  return (
    <Dashboard>
      <View>
        <Text className="text-xl leading-loose">Batteries</Text>
        <View className="grid grid-cols-4 gap-4">
          {
            Object.entries(data?.electrical?.batteries ?? {}).map(([key, data]) => (
              <BatteryWidget key={key} name={key} data={data} />
            ))
          }
        </View>
      </View>

      <View>
        <Text className="text-xl leading-loose">Solar</Text>
        <View className="grid grid-cols-4 gap-4">
          {
            Object.entries(data.electrical?.solar ?? {}).map(([key, data]) => (
              <SolarWidget key={key} name={key} data={data} />
            ))
          }
        </View>
      </View>

      <View>
        <Text className="text-xl leading-loose">Inverters</Text>
        <View className="grid grid-cols-4 gap-4">
          {
            Object.entries(data.electrical?.inverters ?? {}).map(([key, data]) => (
              <InverterWidget key={key} name={key} data={data} />
            ))
          }
        </View>

      </View>

      <View>
        <Text className="text-xl leading-loose">Converters</Text>
        <View className="grid grid-cols-4 gap-4">
          {
            Object.entries(data.electrical?.converters ?? {}).map(([key, data]) => (
              <ConverterWidget key={key} name={key} data={data} />
            ))
          }
        </View>
      </View>


      <JSONTree data={data?.electrical ?? {}} />
    </Dashboard>
  )
}

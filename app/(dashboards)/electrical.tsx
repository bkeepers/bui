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
    <Dashboard className="gap-4">
      <View className="flex flex-row gap-4">
        <BatteryWidget className="flex-1" data={data?.electrical?.batteries ?? {}} />
        <SolarWidget className="flex-1" data={data.electrical?.solar ?? {}} />
      </View>
      <View className="flex flex-row gap-4">
        <InverterWidget className="flex-1" data={data.electrical?.inverters ?? {}} />
        <ConverterWidget className="flex-1" data={data.electrical?.converters ?? {}} />
      </View>
    </Dashboard>
  )
}

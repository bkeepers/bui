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
      <View className="flex flex-row flex-wrap gap-4">
        <BatteryWidget className="w-1/3" data={data?.electrical?.batteries ?? {}} />
        <SolarWidget className="w-1/3" data={data.electrical?.solar ?? {}} />
        <InverterWidget className="w-1/3" data={data.electrical?.inverters ?? {}} />
        <ConverterWidget className="w-1/3" data={data.electrical?.converters ?? {}} />
      </View>
    </Dashboard>
  )
}

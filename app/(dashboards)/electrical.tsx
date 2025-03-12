import { Dashboard } from '~/components/Dashboard';
import { useSignalK } from '~/hooks/useSignalK';
import { Text } from '~/components/ui/text';
import { SolarWidget } from '~/components/widgets/Solar';
import { BatteryWidget, StateOfChargeWidget } from '~/components/widgets/Battery';
import { InverterWidget } from '~/components/widgets/Inverter';
import { View } from 'react-native';
import { ConverterWidget } from '~/components/widgets/Converter';
import { BentoGrid, GridItem } from '~/components/ui/bento';

export default function Electrical() {
  return (
    <View className="flex-1">
      <Dashboard>
        <BentoGrid columns={8} gap={16} width={0.9}>
          <GridItem widthSpan={3} heightSpan={2}>
            <BatteryWidget />
          </GridItem>
          <GridItem widthSpan={3} heightSpan={2}>
            <SolarWidget />
          </GridItem>
          <GridItem widthSpan={3} heightSpan={2}>
            <InverterWidget />
          </GridItem>
          <GridItem widthSpan={3} heightSpan={2}>
            <ConverterWidget />
          </GridItem>
          <GridItem widthSpan={2} heightSpan={2}>
            <StateOfChargeWidget />
          </GridItem>
        </BentoGrid>
      </Dashboard>
    </View>
  )
}

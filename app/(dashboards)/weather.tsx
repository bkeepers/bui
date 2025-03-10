import { View, Text } from 'react-native';
import { Dashboard } from '~/components/Dashboard';
import { DateTimeWidget } from '~/components/widgets/DateTime';
import { ForecastWidget, BarometerWidget, MoonWidget, SunWidget, WindWidget } from '~/components/widgets/Forecast';
import { ThermometerWidget } from "~/components/widgets/Thermometer";
import { BentoGrid, GridItem } from '~/components/ui/bento'; // Replace with your package import.

export default function Weather() {
  return (
    <View className="flex-1">
      <Dashboard className="flex flex-row flex-wrap">
        <BentoGrid columns={8} gap={16} width={0.9}>
          <GridItem widthSpan={4} heightSpan={2}>
            <DateTimeWidget className='w-full h-full' />
          </GridItem>
          <GridItem widthSpan={2} heightSpan={2}>
            <ThermometerWidget />
          </GridItem>
          <GridItem widthSpan={2} heightSpan={2}>
            <ForecastWidget />
          </GridItem>
          <GridItem widthSpan={2} heightSpan={2}>
            <BarometerWidget />
          </GridItem>
          <GridItem widthSpan={2} heightSpan={2}>
            <SunWidget />
          </GridItem>
          <GridItem widthSpan={2} heightSpan={2}>
            <MoonWidget />
          </GridItem>
          <GridItem widthSpan={2} heightSpan={2}>
            <WindWidget />
          </GridItem>
        </BentoGrid>
      </Dashboard>
    </View>
  )
}

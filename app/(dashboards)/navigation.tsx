import { Dashboard } from '~/components/Dashboard';
import { BentoGrid, GridItem } from '~/components/ui/bento';
import { WindAngleWidget } from '~/components/widgets/WindAngle';
import { Text } from '~/components/ui/text';
import { SpeedWidget } from '~/components/widgets/Speed';
import { DepthWidget } from '~/components/widgets/Depth';
import { PositionWidget } from '~/components/widgets/PositionWidget';

export default function Navigation() {
  return (
    <Dashboard className="flex-1 items-center justify-center">
      <BentoGrid columns={8} gap={16} width={0.9}>
        <GridItem widthSpan={2} heightSpan={2}>
          <WindAngleWidget />
        </GridItem>

        <GridItem widthSpan={2} heightSpan={2}>
          <SpeedWidget />
        </GridItem>

        <GridItem widthSpan={2} heightSpan={1}>
          <DepthWidget />
        </GridItem>

        <GridItem widthSpan={2} heightSpan={1}>
          <PositionWidget />
        </GridItem>
      </BentoGrid>
    </Dashboard>
  )
}

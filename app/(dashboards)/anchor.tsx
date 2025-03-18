import * as React from 'react';
import { TideClockWidget } from '~/components/widgets/TideClock';
import { Dashboard } from '~/components/Dashboard';
import { BentoGrid, GridItem } from '~/components/ui/bento';

export default function Screen() {
  return (
    <Dashboard>
      <BentoGrid columns={8} gap={16} width={0.9}>
        <GridItem widthSpan={2} heightSpan={2}>
          <TideClockWidget />
        </GridItem>
      </BentoGrid>
    </Dashboard>
  );
}

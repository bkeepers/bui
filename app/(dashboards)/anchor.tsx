import * as React from 'react';
import { TideWidget } from '~/components/widgets/Tide';
import { Dashboard } from '~/components/Dashboard';

export default function Screen() {
  return (
    <Dashboard>
      <TideWidget />
    </Dashboard>
  );
}

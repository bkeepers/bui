import * as React from 'react';
import { View } from 'react-native';
import { TideWidget } from '~/components/widgets/Tide';

export default function Screen() {
  return (
    <View className='flex-1 justify-center items-center gap-5 p-6 bg-secondary/30'>
      <TideWidget />
    </View>
  );
}

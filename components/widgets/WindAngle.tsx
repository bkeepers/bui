import { View, Text } from 'react-native';
import { AnimatedRotation } from '~/components/AnimatedRotation';
import { Compass } from '~/components/Compass';
import { MeasurementValue } from '~/components/MeasurementValue';
import { Widget } from '~/components/Widget';
import { WindGauge, Needle } from '~/components/WindGauge';
import { useSignalK } from '~/hooks/useSignalK';


export function WindAngleWidget() {
  const data = useSignalK();

  const heading = data?.navigation?.headingTrue?.value ?? 0;
  const windAngle = data?.environment?.wind?.angleApparent?.value ?? 0;

  return (
    <Widget className="rounded-full aspect-square p-0">
      <AnimatedRotation rad={-heading} className="absolute inset-0 flex items-center justify-center">
        <Compass className="w-full aspect-square"></Compass>
      </AnimatedRotation>

      <View className="absolute inset-10 flex items-center justify-center border rounded-full border-slate-500/30">
        <WindGauge size={200}>
          <Needle rad={windAngle} />
        </WindGauge>
      </View>


      <View className="absolute inset-0 flex items-center justify-center">
        <View className="bg-white/10 border border-slate-500/20 rounded-full w-32 aspect-square items-center justify-center">
          <Text className="text-lg text-muted-foreground absolute top-4 opacity-60 uppercase font-light tracking-tighter">AWS</Text>
          <MeasurementValue size="4xl" variant="centered" {...data?.environment?.wind?.speedApparent} hideLabel />
          <Text className="text-lg text-muted-foreground absolute bottom-4 opacity-60 uppercase font-light tracking-tighter">Kn</Text>
        </View>
      </View>
    </Widget>
  );
}

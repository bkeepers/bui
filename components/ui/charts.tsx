import { cssInterop } from 'nativewind';
import { ViewProps } from 'react-native';
import { ProgressCircleProps, ProgressCircle as ProgressCircleSvg } from 'react-native-svg-charts';

cssInterop(ProgressCircle, {
  className: {
    target: false,
    nativeStyleToProp: {
      backgroundColor: "backgroundColor",
      color: "progressColor",
    }
  }
})

export function ProgressCircle(props: ProgressCircleProps & ViewProps) {
  return <ProgressCircleSvg {...props} />
}

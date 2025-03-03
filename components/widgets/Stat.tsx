import { Widget } from '../Widget';
import { MeasurementValue, Props as MeasurementProps } from '../MeasurementValue';

type Props = {
  title?: string;
  value?: MeasurementProps
}

export function Stat(props: Props) {
  return(
    <Widget title={props.title}>
      <MeasurementValue {...props.value} />
    </Widget>
  )
}

import { Text } from './ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export type Props = {
  value?: number;
  meta?: {
    units?: string;
    description: string;
  };
}

export function MeasurementValue(props?: Props) {
  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger className='px-2 pb-0.5 active:opacity-50'>
        <Text className='text-xl font-semibold'>{toMeasurement(props)}</Text>
      </TooltipTrigger>
      <TooltipContent className='py-2 px-4 shadow'>
        <Text className='native:text-lg'>{props?.meta?.description}</Text>
      </TooltipContent>
    </Tooltip>
  )
}

function toMeasurement(props?: Props) {
  if(!props?.value) return "-";

  switch (props.meta?.units) {
    case 'm':
      // FIXME: make configurable
      const value = props.value * 3.28084;
      return `${value.toFixed(1)} ft`;
      // case "RFC 3339 (UTC)":
    default:
      return `${props.value} ${props.meta?.units}`;
  }
}

const format = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'short'
});

function formatDate(date: string) {
  if (!date) return "-";
  return format.format(new Date(date));
}

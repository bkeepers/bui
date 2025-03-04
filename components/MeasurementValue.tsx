import { View } from 'react-native';
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
  const [value, units] = convertToLocale(props?.value, props?.meta?.units);

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger>
        <View className='flex flex-row items-baseline'>
          <Text className='text-lg font-medium'>{value}</Text>
          {units ? <Text className='text-xs text-muted-foreground'>{units}</Text> : null}
        </View>
      </TooltipTrigger>
      <TooltipContent className='py-2 px-4 shadow-md'>
        <Text className='native:text-lg'>{props?.meta?.description}</Text>
      </TooltipContent>
    </Tooltip>
  )
}

function convertToLocale(value, units) {
  if(!value) return ["-"];

  switch (units) {
    case 'm':
      // FIXME: make configurable
      return [(value * 3.28084).toFixed(2), "ft"];
    case 'ratio':
      return [(value * 100).toFixed(2), "%"];
    case "J":
      return [(value / 3600000).toFixed(2), "kWh"];
    default:
      return [value, units];
  }
}

const format = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'short'
});

function formatDate(date: string) {
  if (!date) return "-";
  return format.format(new Date(date));
}

import { View, ViewProps } from 'react-native';
import { Text } from './ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cva, type VariantProps } from 'class-variance-authority';

const valueTextVariants = cva(
  'web:whitespace-nowrap font-medium text-foreground',
  {
    variants: {
      variant: {
        default: '',
        muted: 'text-muted-foreground',
      },
      size: {
        sm: 'native:text-xl',
        default: 'text-xl native:text-2xl',
        lg: 'text-2xl font-semibold',
        xl: 'text-3xl font-semibold',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const unitTextVariants = cva(
  'font-light',
  {
    variants: {
      variant: {
        default: '',
        muted: 'text-muted-foreground',
      },
      size: {
        sm: 'text-xs native:text-sm font-thin',
        default: 'text-sm',
        lg: 'text-sm',
        xl: '',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);


export type MeasurementValueProps = ViewProps & Parameters<typeof valueTextVariants>[0] & {
  value?: number;
  meta?: {
    units?: string;
    description: string;
  };
  defaultUnits?: string;
}

export function MeasurementValue({value, meta, defaultUnits, size, variant, ...props}: MeasurementValueProps = {}) {
  const [convertedValue, units] = toPreferredUnit(value, meta?.units ?? defaultUnits);

  return (
    <Tooltip delayDuration={150}>
      <TooltipTrigger>
        <View className='flex flex-row items-baseline'>
          <Text className={valueTextVariants({ size, variant })}>{convertedValue}</Text>
          {units ? <Text className={unitTextVariants({ size, variant })}>{units}</Text> : null}
        </View>
      </TooltipTrigger>
      { meta?.description ?
        <TooltipContent className='py-2 px-4 shadow-md'>
          <Text className='native:text-lg'>{meta?.description}</Text>
        </TooltipContent>
        : null
      }
    </Tooltip>
  )
}

function toPreferredUnit(value?: number, units?: string): [string, string | undefined] {
  if(!value) return ["-", undefined];

  switch (units) {
    case 'm':
      // FIXME: make configurable
      return [(value * 3.28084).toFixed(1), "ft"];
    case 'ratio':
      return [(value * 100).toFixed(1), "%"];
    case "J":
      return [(value / 3600000).toFixed(1), "kWh"];
    case "K":
      // (K − 273.15) × 9/5 + 32
      return [((value - 273.15) * 9/5 + 32).toFixed(1), "°F"];
    default:
      if(typeof value === 'number') {
        return [value.toFixed(1), units];
      }
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

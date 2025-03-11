import { View, ViewProps } from 'react-native';
import { Text } from './ui/text';
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { cva, type VariantProps } from 'class-variance-authority';
import convert, { Unit } from "convert-units";

// TODO: make configurable
const settings: Partial<Record<Unit, Unit>> = {
  m: "ft",
  J: "kWh",
  K: "F",
  Pa: "hPa",
  "m/s": "knot",
  "rad": "deg"
}

const labelAliases: Partial<Record<Unit, string>> = {
  "F": "°F",
  "knot": "kn",
  "deg": "°",
}

const valueTextVariants = cva(
  'web:whitespace-nowrap text-foreground leading-none tracking-tighter',
  {
    variants: {
      variant: {
        default: '',
        muted: 'text-muted-foreground'
      },
      size: {
        sm: 'native:text-xl',
        default: 'text-xl native:text-2xl',
        lg: 'text-2xl',
        xl: 'text-3xl',
        '4xl': 'text-4xl',
        '5xl': 'text-5xl',
        '6xl': 'text-6xl',
        '7xl': 'text-7xl',
        '8xl': 'text-8xl',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);

const unitTextVariants = cva(
  'font-ultralight',
  {
    variants: {
      variant: {
        default: '',
        muted: 'text-muted-foreground',
      },
      size: {
        sm: 'text-xs native:text-sm web:font-thin native:font-extralight',
        default: 'text-sm',
        lg: 'text-sm',
        xl: '',
        '4xl': 'text-lg web:font-thin native:font-extralight',
        '5xl': 'text-xl web:font-thin native:font-extralight',
        '6xl': 'text-2xl web:font-thin native:font-extralight',
        '7xl': 'text-3xl web:font-thin native:font-extralight',
        '8xl': 'text-4xl web:font-thin native:font-extralight',
      },
    },
    defaultVariants: {
      size: 'default',
    },
  }
);


export type MeasurementValueProps = ViewProps & VariantProps<typeof valueTextVariants> & {
  value?: number;
  meta?: {
    units?: string;
    description: string;
  };
  fromUnit?: Unit;
  decimals?: number;
  toUnit?: Unit;
}

export function MeasurementValue({value, meta, fromUnit, toUnit, size, variant, decimals = 1, ...props}: MeasurementValueProps = {}) {
  const [convertedValue, units] = toPreferredUnit(value, {
    from: (meta?.units ?? fromUnit) as Unit,
    to: toUnit,
    decimals
  });

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

export type PreferredUnitOptions = {
  from?: Unit | "ratio";
  to?: Unit;
  decimals?: number;
}

function toPreferredUnit(value?: number, { from, to, decimals = 1 }: PreferredUnitOptions = {}): [string, string | undefined] {
  if(typeof value !== "number") return ["-", undefined];
  if(!from) return [value.toFixed(decimals), undefined];

  switch (from) {
    case 'ratio':
      return [(value * 100).toFixed(decimals), "%"];
    case 'w':
      return [value.toFixed(decimals), "w"];
    default:
      if(!to) to = settings[from] ?? from;
      return [convert(value).from(from).to(to).toFixed(decimals), labelAliases[to] ?? to];
  }
}

const format = new Intl.DateTimeFormat('en-US', {
  timeStyle: 'short'
});

function formatDate(date: string) {
  if (!date) return "-";
  return format.format(new Date(date));
}

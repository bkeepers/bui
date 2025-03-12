import { TextProps, View, ViewProps } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Text } from './ui/text';
import { ReactNode } from 'react';
import { cn } from '~/lib/utils';
import { MeasurementValue, MeasurementValueProps } from './MeasurementValue';
import { Separator } from './ui/separator';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '~/hooks/useColorScheme';

export type WidgetProps = ViewProps & WidgetTitleProps & {
  children?: ReactNode;
}

export function Widget({ title, icon, children, className, ...props }: WidgetProps) {
  const { colorScheme } = useColorScheme();

  return (
    <Card className={cn('rounded-3xl bg-transparent flex-1 w-full h-full overflow-hidden', className)} {...props}>
      <BlurView className="absolute inset-0 shadow-lg" tint={colorScheme} intensity={75} />

      {title || icon ? (
        <>
          <WidgetTitle icon={icon}>{ title }</WidgetTitle>
        </>
      ) : null}
      <CardContent className="flex-1 text-muted">
        {children}
      </CardContent>
    </Card>
  );
}

export type WidgetDataProps = {
  data: ({ name: string; value: MeasurementValueProps})[];
}

export type WidgetTitleProps = {
  title?: string;
  icon?: ReactNode;
  children?: ReactNode;
}

export function WidgetTitle({ icon, title, children }: WidgetProps) {
  return(
    <CardHeader className='flex flex-row items-center gap-2'>
      {icon}
      <CardTitle className='text-lg leading-none uppercase'>
        {title ?? children}
      </CardTitle>
    </CardHeader>
  );
}

export function WidgetData({ data }: WidgetDataProps) {
  return (
    <View className="flex flex-row gap-2">
      {
        data.map(({ name, value }) => (
          <View className="flex-1" key={name}>
            <WidgetLabel>{ name }</WidgetLabel>
            <MeasurementValue size="sm" {...value} />
          </View>
        ))
      }
    </View>
  )
}

export function WidgetLabel({ children, ...props }: TextProps) {
  return (
    <Text {...props} className="text-sm font-light text-muted-foreground uppercase tracking-tight">{children}</Text>
  );
}

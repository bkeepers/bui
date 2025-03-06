import { View, ViewProps } from 'react-native';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Text } from './ui/text';
import { ReactNode } from 'react';
import { cn } from '~/lib/utils';
import { MeasurementValue, MeasurementValueProps } from './MeasurementValue';
import { Separator } from './ui/separator';

export type WidgetProps = ViewProps & {
  title?: string;
  children?: ReactNode;
  icon?: ReactNode;
}

export function Widget({ title, icon, children, className, ...props }: WidgetProps) {
  return (
    <Card className={cn('rounded-xl', className)} {...props}>
      {title || icon || status ? (
        <>
          <CardHeader className='flex flex-row items-center gap-3'>
            { icon }
            <CardTitle className='text-2xl flex-grow leading-none'>
              {title}
            </CardTitle>
          </CardHeader>
          <Separator />
        </>
      ) : null}
      <CardContent className="flex-1">
        {children}
      </CardContent>
    </Card>
  );
}

export type WidgetDataProps = {
  data: ({ name: string; value: MeasurementValueProps})[];
}

export function WidgetData({ data }: WidgetDataProps) {
  return (
    <View className="flex flex-row gap-2">
      {
        data.map(({ name, value }) => (
          <View className="flex-1" key={name}>
            <Text className="text-xs native:text-base text-muted-foreground font-thin">{ name }</Text>
            <MeasurementValue size="sm" {...value} />
          </View>
        ))
      }
    </View>
  )
}

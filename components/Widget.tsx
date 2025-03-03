import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

export type WidgetProps = {
  title?: string;
  children?: React.ReactNode;
}

export function Widget({ title, children }: WidgetProps) {
  return (
    <Card className='w-full max-w-sm rounded-xl'>
      <CardHeader>
        <CardTitle className='pb-2'>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

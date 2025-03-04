import { Badge } from './ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Text } from './ui/text';

export type WidgetProps = {
  title?: string;
  children?: React.ReactNode;
  status?: string;
}

export function Widget({ title, status, children }: WidgetProps) {
  return (
    <Card className='rounded-xl'>
      {title ? (
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle className='text-lg'>{title}</CardTitle>
          { status ? <Badge><Text>{status}</Text></Badge> : null }
        </CardHeader>

      ) : null}
      <CardContent>
        {children}
      </CardContent>
    </Card>
  );
}

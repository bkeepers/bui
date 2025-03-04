import JSONTree from 'react-native-json-tree';
import { Dashboard } from '~/components/Dashboard';
import { useSignalK } from '~/hooks/useSignalK';

export default function Navigation() {
  const data = useSignalK();

  return (
    <Dashboard>
      <JSONTree data={data?.navigation ?? {}} />
    </Dashboard>
  )
}

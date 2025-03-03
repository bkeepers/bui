import JSONTree from 'react-native-json-tree';
import { Dashboard } from '~/components/Dashboard';
import { Stat } from '~/components/widgets/Stat';
import { useSignalK } from '~/hooks/useSignalK';

export default function Electrical() {
  const data = useSignalK();

  return (
    <Dashboard>
      <Stat title="House" value={data.electrical?.batteries?.house?.voltage} />
      <Stat title="Starter" value={data.electrical?.batteries?.starter?.voltage} />

      <JSONTree data={data?.electrical ?? {}} />
    </Dashboard>
  )
}

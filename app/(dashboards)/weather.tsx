import { Dashboard } from '~/components/Dashboard';
import { useSignalK } from '~/hooks/useSignalK';

export default function Weather() {
  const data = useSignalK();

  return (
    <Dashboard>
    </Dashboard>
  )
}

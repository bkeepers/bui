import { useEffect, useState } from "react";
import type { Vessel } from '~/types/signalk';

export function useSignalK() {
  const [data, setData] = useState<Vessel>({});

  useEffect(() => {
    async function doFetch() {
      const res = await fetch("http://pi.local:3000/signalk/v1/api/vessels/self");
      if (!res.ok) throw new Error(res.statusText);

      const self = await res.json();
      setData(self);
    }

    doFetch();
  }, [])

  return data;
}

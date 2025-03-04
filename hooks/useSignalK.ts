import { useEffect, useState } from "react";
import Client from '@signalk/client'
import ObjectPath from 'object-path';
import type { Vessel } from '~/types/signalk';
import type { SignalKDeltaMessageSchema } from "~/types/signalk-delta";

const SIGNALK_SETTINGS = {
  hostname: "pi.local",
  port: 3000,
  useTLS: false,
  reconnect: true,
  autoConnect: true,
  sendMeta: "all",
  deltaStreamBehaviour: 'self',
  sendCachedValues: true,
};


export function useSignalK() {
  const [data, setData] = useState<Vessel>({});

  function processDelta(delta: SignalKDeltaMessageSchema) {
    setData(previousData => {
      delta.updates.forEach(update => {
        "meta" in update && update.meta.forEach(({ path, value }) => {
          ObjectPath.set(previousData, `${path}.meta`, value);
        });

        "values" in update && update.values.forEach(({ path, value }) => {
          const before = ObjectPath.get(previousData, path);
          ObjectPath.set(previousData, path, { ...before, value });
        });
      });

      return { ...previousData };
    });
  }

  useEffect(() => {
    const client = new Client(SIGNALK_SETTINGS)
    client.on('delta', processDelta);
    return () => { client.disconnect() }
  }, []);

  return data;
};

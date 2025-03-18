import { createContext, useContext, useEffect, useState } from "react";
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
  deltaStreamBehaviour: 'none',
  sendCachedValues: false,
  notifications: false,
};

export const SignalKContext = createContext<Vessel>({});

export function SignalKProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<Vessel>({});

  function processDelta(delta: SignalKDeltaMessageSchema) {
    setData(previousData => {
      delta.updates.forEach(update => {
        "meta" in update && update.meta.forEach(({ path, value }) => {
          ObjectPath.set(previousData, `${path}.meta`, value);
        });

        "values" in update && update.values.forEach(({ path, value }) => {
          const { $source, timestamp } = update;
          if(path === "") {
            Object.assign(previousData, value);
          } else {
            const before = ObjectPath.get(previousData, path);
            ObjectPath.set(previousData, path, { ...before, value, $source, timestamp });
          }
        });
      });

      // Use spread to create a new object, otherwise React won't detect the change.
      return { ...previousData };
    });
  }

  useEffect(() => {
    const client = new Client(SIGNALK_SETTINGS)
    client.on('delta', processDelta);

    async function load() {
      const api = await client.API()
      setData(await api.self())
      // TODO: Make components subscribe to the data they want.
      client.subscribe([ { context: "vessels.self", subscribe: [{ path: "*", policy: "instant" }] } ]);
    }

    load()

    return () => { client.disconnect() }
  }, []);

  return <SignalKContext.Provider value={ data }>{ children }</SignalKContext.Provider>;
}

export function useSignalK() {
  const context = useContext(SignalKContext);
  if (context === undefined) {
		throw new Error('useSignalK must be used within a SignalKProvider');
	}
	return context;
};


export function useSignalKResource<T>(path: string, defaultValue?: Partial<T>) {
  const [data, setData] = useState(defaultValue)

  useEffect(() => {
    (async () => {
      const res = await fetch(`http://pi.local:3000/signalk/v2/api/resources/${path}`)
      const json = await res.json()
      setData(json)
    })();
  }, [path])

  return data;
}

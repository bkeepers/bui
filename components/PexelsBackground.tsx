import { useEffect, useState } from "react";
import { ViewProps, ImageBackground, View, TouchableWithoutFeedback } from "react-native";
import { useInterval } from "usehooks-ts";
import { useColorScheme } from "~/hooks/useColorScheme";
import { useSignalK } from "~/hooks/useSignalK";

const PEXELS_API_KEY = "iXaUI4E7teFjgPlHyw7unEoDEVCcoOGBrha0PJdFw7rzgzXwQNIA1joC";
type WeatherBackgroundProps = ViewProps & {
  query: string;
};

export function PexelsBackground({ children, ...props }: WeatherBackgroundProps) {
  const { colorScheme } = useColorScheme()

  const sigk = useSignalK()
  const mode = sigk.environment?.mode?.value
  const forecast = sigk.environment?.forecast?.description?.value

  const query = [forecast, mode, "ocean"].filter(Boolean).join(" ")

  const [data, setData] = useState([]);
  const [selected, setSelected] = useState(0);

  function nextPhoto() {
    setSelected((selected + 1) % data.photos?.length)
  }

  async function refresh() {
    const params = new URLSearchParams({
      query,
      orientation: "landscape", // FIXME: use device orientation
    });

    const res = await fetch(`https://api.pexels.com/v1/search?${params.toString()}`, {
      headers: { Authorization: PEXELS_API_KEY }
    });

    setData(await res.json());
  }

  useEffect(() => { refresh() }, [query]);
  useInterval(nextPhoto, 60000)

  return (
    <ImageBackground className="bg-muted" {...props}
      resizeMode="cover"
      source={{ uri: data.photos?.[selected]?.src?.original }}
      style={{ backgroundColor: data.photos?.[selected]?.avg_color }}
    >
      <View className={`absolute inset-0 ${colorScheme === 'dark' ? 'bg-black/70' : 'bg-black/30'}`}></View>
      {children}
    </ImageBackground>
  );
}

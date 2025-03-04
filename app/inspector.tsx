import { View } from "react-native";
import JSONTree from "react-native-json-tree";
import { useSignalK } from "~/hooks/useSignalK";

export default function Inspector() {
  const data = useSignalK();

  return (
    <View className="flex-1">
      <JSONTree data={data} />
    </View>
  )
}

import { SafeAreaView, View } from "react-native";

export type Props = {
  children?: React.ReactNode;
}

export function Dashboard(props: Props) {
  return (
    <SafeAreaView className="flex-1">
      <View className='gap-2 p-4 flex-1'>
        {props.children}
      </View>
    </SafeAreaView>
  )
}

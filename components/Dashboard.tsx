import { SafeAreaView, ScrollView, View } from "react-native";

export type Props = {
  children?: React.ReactNode;
}

export function Dashboard(props: Props) {
  return (
    <ScrollView className='flex-1 bg-muted'>
      <SafeAreaView className="flex-1">
        <View className="flex-1 p-4 gap-4">
          {props.children}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

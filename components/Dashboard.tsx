import { View } from "react-native";

export type Props = {
  children?: React.ReactNode;
}

export function Dashboard(props: Props) {
  return (
    <View className='gap-3 p-6 bg-secondary flex-1'>
      {props.children}
    </View>
  )
}

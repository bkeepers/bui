import { SafeAreaView, ScrollView, View, ViewProps } from "react-native";
import { cn } from "~/lib/utils";

export function Dashboard({ children, className, ...props}: ViewProps) {
  return (
    <ScrollView className='flex-1'>
      <SafeAreaView className="flex-1">
        <View className={cn('flex-1 p-4 items-center justify-center', className)} {...props}>
          {children}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

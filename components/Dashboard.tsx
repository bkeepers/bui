import { SafeAreaView, ScrollView, View, ViewProps } from "react-native";
import { cn } from "~/lib/utils";
import { useHeaderHeight } from '@react-navigation/elements';

export function Dashboard({ children, className, ...props}: ViewProps) {
  const headerHeight = useHeaderHeight();

  return (
    <ScrollView className='flex-1' style={{ paddingTop: headerHeight}}>
      <SafeAreaView className="flex-1">
        <View className={cn('flex-1 p-4 items-center justify-center', className)} {...props}>
          {children}
        </View>
      </SafeAreaView>
    </ScrollView>
  )
}

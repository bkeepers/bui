import { ScrollView, View } from "react-native"
import { MeasurementValue } from "~/components/MeasurementValue"
import { Text } from "~/components/ui/text"

export default function Styleguide() {
  const data = {
    value: 3.8,
    meta: {
      description: 'This is a description',
      units: 'm/s'
    }
  }

  return (
    <ScrollView className="p-4">
      <Text className="text-xl">
        MeasurementValue
      </Text>


      { ['default', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'].map(size => (
        <View key={size} className="flex items-baseline gap-2">
          <Text>{size}</Text>
          <MeasurementValue size={size} {...data} />
        </View>
      ))}

      { ['default', 'lg', 'xl', '2xl', '3xl', '4xl', '5xl', '6xl', '7xl', '8xl'].map(size => (
        <View key={size} className="flex gap-3">
          <View className="flex-1 flex flex-row flex-wrap gap-4">
            <View className="border items-center w-52 aspect-square justify-center p-2 rounded-xl">
              <Text>Centered {size}</Text>
              <MeasurementValue size={size} variant="centered" {...data} />
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  )
}

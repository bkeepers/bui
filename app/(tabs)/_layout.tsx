import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen name="anchor" options={{
        title: 'Anchor',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="anchor" size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="electrical" options={{
        title: 'Electrical',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="bolt" size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="weather" options={{
        title: 'Weather',
        tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="weather-partly-cloudy" size={24} color={color} />
        ),
      }} />
      <Tabs.Screen name="navigation" options={{
        title: 'Navigation',
        tabBarIcon: ({ color }) => (
          <MaterialIcons name="route" size={24} color={color} />
        ),
      }} />
    </Tabs>
  );
}

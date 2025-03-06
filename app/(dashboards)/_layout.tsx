import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const tabs = [
    { title: 'Home', name: 'index', icon: 'home', IconComponent: MaterialIcons },
    { title: 'Electrical', name: 'electrical', icon: 'bolt', IconComponent: MaterialIcons },
    { title: 'Anchor', name: 'anchor', icon: 'anchor', IconComponent: MaterialIcons },
    { title: 'Weather', name: 'weather', icon: 'weather-partly-cloudy', IconComponent: MaterialCommunityIcons },
    { title: 'Navigation', name: 'navigation', icon: 'route', IconComponent: MaterialIcons },
  ]

  return (
    <Tabs>
      {
        tabs.map(({title, name, IconComponent, icon}) => (
          <Tabs.Screen name={name} options={{
            title,
            tabBarIcon: ({ color }) => (
              <IconComponent name={icon} size={24} color={color} />
            ),
            headerShown: false,
          }} />
        ))
      }
    </Tabs>
  );
}

// Override tabList styles
const styles = StyleSheet.create({
  tabList: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
});

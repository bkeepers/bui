import { Tabs } from 'expo-router';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { View } from 'react-native';
import { StyleSheet } from 'react-native';
import { PexelsBackground } from '~/components/PexelsBackground';
import { BlurView } from 'expo-blur';
import { useColorScheme } from '~/hooks/useColorScheme';
import { NAV_THEME } from '~/lib/constants';

export default function TabLayout() {
  const { colorScheme, theme } = useColorScheme();

  const tabs = [
    { title: 'Home', name: 'index', icon: 'home', IconComponent: MaterialIcons },
    { title: 'Electrical', name: 'electrical', icon: 'bolt', IconComponent: MaterialIcons },
    { title: 'Anchor', name: 'anchor', icon: 'anchor', IconComponent: MaterialIcons },
    { title: 'Weather', name: 'weather', icon: 'weather-partly-cloudy', IconComponent: MaterialCommunityIcons },
    { title: 'Navigation', name: 'navigation', icon: 'route', IconComponent: MaterialIcons },
  ]

  return (
    <View className="flex-1">
      <PexelsBackground className="absolute inset-0" query="clear sky ocean" />
      <Tabs screenOptions={{
        animation: 'fade'
      }}>
        {
          tabs.map(({title, name, IconComponent, icon}) => (
            <Tabs.Screen key={name} name={name} options={{
              title,
              tabBarInactiveTintColor: theme.muted,
              tabBarIcon: ({ color }) => (
                <IconComponent name={icon} size={24} color={color} />
              ),
              tabBarBackground: () => (
                <BlurView tint={colorScheme} intensity={75} style={StyleSheet.absoluteFill} />
              ),
              headerShown: false,
            }} />
          ))
        }
      </Tabs>
    </View>
  );
}

// Override tabList styles
const styles = StyleSheet.create({
  tabList: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
  }
});

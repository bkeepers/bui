import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { SafeAreaView } from 'react-native';
import { StyleSheet } from 'react-native';

export default function TabLayout() {
  const tabs = [
    { name: 'anchor', icon: 'anchor', IconComponent: MaterialIcons },
    { name: 'electrical', icon: 'bolt', IconComponent: MaterialIcons },
    { name: 'weather', icon: 'weather-partly-cloudy', IconComponent: MaterialCommunityIcons },
    { name: 'navigation', icon: 'route', IconComponent: MaterialIcons },
  ]

  return (
    <Tabs className='flex flex-row-reverse bg-muted'>
      <TabSlot />
      <TabList asChild>
        <SafeAreaView className='flex' style={styles.tabList}>
          {tabs.map(({ name, icon, IconComponent }) => (
            <TabTrigger className='p-2 bg-card rounded-lg m-4' key={name} name={name} href={`/${name}`}>
              <IconComponent name={icon} size={24} className="text-foreground" />
            </TabTrigger>
          ))}
        </SafeAreaView>
      </TabList>
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

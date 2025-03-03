import { Tabs, TabList, TabTrigger, TabSlot } from 'expo-router/ui';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function TabLayout() {
  const tabs = [
    { name: 'anchor', icon: 'anchor', IconComponent: MaterialIcons },
    { name: 'electrical', icon: 'bolt', IconComponent: MaterialIcons },
    { name: 'weather', icon: 'weather-partly-cloudy', IconComponent: MaterialCommunityIcons },
    { name: 'navigation', icon: 'route', IconComponent: MaterialIcons },
  ]

  return (
    <Tabs className='flex flex-row-reverse'>
      <TabSlot />
      <TabList className='flex flex-col justify-start bg-secondary/50 border-r border-border'>
        {tabs.map(({ name, icon, IconComponent }) => (
          <TabTrigger className='p-4' key={name} name={name} href={`/${name}`}>
            <IconComponent name={icon} size={24} />
          </TabTrigger>
        ))}
      </TabList>
    </Tabs>
  );
}

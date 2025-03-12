import { useColorScheme as useNativewindColorScheme } from 'nativewind';
import { NAV_THEME } from '~/lib/constants';

export function useColorScheme() {
  const { colorScheme, setColorScheme, toggleColorScheme } = useNativewindColorScheme();
  return {
    colorScheme: colorScheme ?? 'dark',
    isDarkColorScheme: colorScheme === 'dark',
    setColorScheme,
    toggleColorScheme,
    theme: NAV_THEME[colorScheme ?? 'dark'],
  };
}

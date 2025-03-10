import { DarkTheme, DefaultTheme, Theme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as React from 'react';
import { Platform, View } from 'react-native';
import { NAV_THEME } from '~/lib/constants';
import { useColorScheme } from '~/hooks/useColorScheme';
import { PortalHost } from '@rn-primitives/portal';
import { ThemeToggle } from '~/components/ThemeToggle';
import { setAndroidNavigationBar } from '~/lib/android-navigation-bar';
import { VesselHeader } from '~/components/VesselHeader';
import { SignalKProvider } from '~/hooks/useSignalK';
import { InspectLink } from '~/components/InspectLink';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';

const LIGHT_THEME: Theme = {
  ...DefaultTheme,
  colors: {
    ...NAV_THEME.light,
    background: "transparent",
  },
};
const DARK_THEME: Theme = {
  ...DarkTheme,
  colors: {
    ...NAV_THEME.dark,
    background: "transparent",
  }
};

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export default function RootLayout() {
  const hasMounted = React.useRef(false);
  const { colorScheme, isDarkColorScheme } = useColorScheme();
  const [isColorSchemeLoaded, setIsColorSchemeLoaded] = React.useState(false);

  useIsomorphicLayoutEffect(() => {
    if (hasMounted.current) {
      return;
    }

    if (Platform.OS === 'web') {
      // Adds the background color to the html element to prevent white background on overscroll.
      document.documentElement.classList.add('bg-background');
    }
    setAndroidNavigationBar(colorScheme);
    setIsColorSchemeLoaded(true);
    hasMounted.current = true;
  }, []);

  if (!isColorSchemeLoaded) {
    return null;
  }

  return (
    <ThemeProvider value={isDarkColorScheme ? DARK_THEME : LIGHT_THEME}>
      <SignalKProvider>
        <StatusBar style={colorScheme} />
        <Stack>
          <Stack.Screen name="(dashboards)" options={{
            headerTitle: () => <VesselHeader />,
            headerRight: () => (
              <>
                <InspectLink />
                <ThemeToggle />
              </>
            ),
            headerTransparent: true,
            headerBackground: () => (
              <BlurView tint={colorScheme} intensity={75} style={StyleSheet.absoluteFill} />
            )
          }} />
          <Stack.Screen
            name="inspector"
            options={{
              presentation: 'modal'
            }}
          />
        </Stack>
        <PortalHost />
      </SignalKProvider>
    </ThemeProvider>
  );
}

const useIsomorphicLayoutEffect =
  Platform.OS === 'web' && typeof window === 'undefined' ? React.useEffect : React.useLayoutEffect;

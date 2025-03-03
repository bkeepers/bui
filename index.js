import "@expo/metro-runtime";
import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { verifyInstallation } from "nativewind";
import "~/global.css";

// https://docs.expo.dev/router/reference/troubleshooting/#expo_router_app_root-not-defined

// Must be exported or Fast Refresh won't update the context
export function App() {
  verifyInstallation();
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);

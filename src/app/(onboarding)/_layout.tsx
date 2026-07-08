import { Stack } from 'expo-router';

export default function OnboardingLayout() {
  return <Stack initialRouteName="full-name" screenOptions={{ headerShown: false }} />;
}

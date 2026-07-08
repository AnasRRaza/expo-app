import { Drawer } from 'expo-router/drawer';

import { AppDrawerContent } from '@/components/drawer-content';

export default function DrawerLayout() {
  return (
    <Drawer screenOptions={{ headerShown: false }} drawerContent={AppDrawerContent}>
      <Drawer.Screen name="(tabs)" options={{ drawerLabel: 'Main' }} />
      <Drawer.Screen name="menu" options={{ drawerLabel: 'Menu' }} />
    </Drawer>
  );
}

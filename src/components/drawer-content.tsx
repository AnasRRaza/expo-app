import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from 'expo-router/drawer';

import { useAuthStore } from '@/stores/use-auth-store';

export function AppDrawerContent(props: DrawerContentComponentProps) {
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={signOut} />
    </DrawerContentScrollView>
  );
}

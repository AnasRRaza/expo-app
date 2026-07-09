import { useTranslation } from 'react-i18next';
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from 'expo-router/drawer';

import { useAuthStore } from '@/stores/use-auth-store';

export function AppDrawerContent(props: DrawerContentComponentProps) {
  const { t } = useTranslation();
  const signOut = useAuthStore((state) => state.signOut);

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label={t('menu.logout')} onPress={signOut} />
    </DrawerContentScrollView>
  );
}

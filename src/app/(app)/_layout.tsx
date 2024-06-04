/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import { useColorScheme } from 'nativewind';
import React, { useCallback, useEffect, useState } from 'react';

import { useAuth, useIsBaseURLSet } from '@/core';
import { Pressable, Text } from '@/ui';
import { text, text_dark } from '@/ui/colors';
import { Home, Plant, Settings } from '@/ui/icons';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [baseURL] = useIsBaseURLSet();

  const { colorScheme } = useColorScheme();
  const [iconColor, setIconColor] = useState<string>();

  const hideSplash = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);
  useEffect(() => {
    if (status !== 'idle') {
      setTimeout(() => {
        hideSplash();
      }, 1000);
    }
  }, [hideSplash, status]);

  useEffect(() => {
    if (colorScheme === 'dark') {
      setIconColor(text_dark);
    } else {
      setIconColor(text);
    }
  }, [colorScheme]);

  if (baseURL === undefined) {
    return <Redirect href="/onboarding" />;
  }
  if (status === 'signOut') {
    return <Redirect href="/login" />;
  }
  return (
    <>
      <Drawer>
        <Drawer.Screen
          name="index"
          options={{
            title: 'Home',
            drawerIcon: () => <Home color={iconColor} />,
            headerRight: () => <CreateNewPostLink />,
          }}
        />
        <Drawer.Screen
          name="my-plants"
          options={{
            title: 'My Plants',
            drawerIcon: ({ color }) => <Plant color={color} />,
          }}
        />
        <Drawer.Screen
          name="style"
          options={{
            title: 'Style',
            //headerShown: false,
            //tabBarIcon: ({ color }) => <StyleIcon color={color} />,
            // tabBarTestID: 'style-tab',
          }}
        />
        <Drawer.Screen
          name="settings"
          options={{
            title: 'Settings',
            drawerIcon: ({ color }) => <Settings color={color} />,
          }}
        />
      </Drawer>
    </>
  );
}

const CreateNewPostLink = () => {
  return (
    <Link href="/feed/add-post" asChild>
      <Pressable>
        <Text className="px-3 text-primary-300">Create</Text>
      </Pressable>
    </Link>
  );
};

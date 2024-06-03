/* eslint-disable react/no-unstable-nested-components */
import { Link, Redirect, SplashScreen } from 'expo-router';
import { Drawer } from 'expo-router/drawer';
import React, { useCallback, useEffect } from 'react';

import { useAuth, useIsFirstTime } from '@/core';
import { Pressable, Text } from '@/ui';

export default function TabLayout() {
  const status = useAuth.use.status();
  const [isFirstTime] = useIsFirstTime();
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

  if (isFirstTime) {
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
            title: 'Feed',
            //tabBarIcon: ({ color }) => <FeedIcon color={color} />,
            headerRight: () => <CreateNewPostLink />,
            //tabBarTestID: 'feed-tab',
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
            //headerShown: false,
            //tabBarIcon: ({ color }) => <SettingsIcon color={color} />,
            //tabBarTestID: 'settings-tab',
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

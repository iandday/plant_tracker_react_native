import { useRouter } from 'expo-router';
import React from 'react';
import { TextInput } from 'react-native';

import { Cover } from '@/components/cover';
import { useIsBaseURLSet } from '@/core/hooks';
import {
  Button,
  colors,
  FocusAwareStatusBar,
  SafeAreaView,
  Text,
  View,
} from '@/ui';

export default function Onboarding() {
  const [_, setBaseURL] = useIsBaseURLSet();
  const router = useRouter();
  return (
    <View className="flex h-full items-center  justify-center">
      <FocusAwareStatusBar />
      <View className="w-full flex-1">
        <Cover />
      </View>
      <View className="justify-end ">
        <Text className="my-3 text-center text-5xl font-bold">
          Plant Tracker
        </Text>
        <Text className="mb-2 text-center text-lg text-gray-600">
          Who can remember when you watered it last?
        </Text>

        <Text className="my-1 pt-6 text-center text-lg">
          Set your server's base URL below
        </Text>

        <TextInput
          autoCapitalize="none"
          autoCorrect={false}
          placeholder="https://plant.mydomain.com"
          onChange={(value) => setBaseURL(value.nativeEvent.text)}
          placeholderTextColor={colors.neutral[400]}
          className={
            'mt-0 rounded-xl border-[0.5px] border-neutral-300 bg-neutral-100 px-4 py-3 font-inter text-base  font-medium leading-5 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white'
          }
        />
      </View>
      <SafeAreaView className="mt-2">
        <Button
          label="Let's Get Started "
          onPress={() => {
            router.replace('/login');
          }}
        />
      </SafeAreaView>
    </View>
  );
}

import React from 'react';

import { getToken } from '@/core/auth/utils';
import { Text, View } from '@/ui';

export default function Feed() {
  const token = getToken();

  return (
    <View className="bg-background flex-1 px-4">
      <Text className="text-text">Home</Text>
      <Text>{token.access}</Text>
    </View>
  );
}

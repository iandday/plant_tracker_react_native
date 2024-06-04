import React from 'react';
import { Image } from 'react-native';

import type { PlantOut } from '@/api';
import { Text, View } from '@/ui';

interface plantCountProps {
  plantData: PlantOut[];
  graveyardData: PlantOut[];
}

export default function plantCount({
  plantData,
  graveyardData,
}: plantCountProps) {
  return (
    <View className="flex-row">
      <View className="items-center px-4">
        <Image
          style={{ width: 100, height: 92 }}
          source={require('../../../assets/alivePlant.png')}
        />
        <Text className="pt-2">{plantData.length} Healthy</Text>
      </View>

      <View className="items-center px-4">
        <Image
          style={{ width: 100, height: 92 }}
          source={require('../../../assets/alivePlant.png')}
          className="pt-2"
        />
        <Text className="pt-2">{graveyardData.length} Not So Healthy</Text>
      </View>
    </View>
  );
}

import { Link } from 'expo-router';
import React from 'react';

import type { PlantOut } from '@/api';
import { storage } from '@/core/storage';
import { Image, Pressable, Text, View } from '@/ui';

type Props = {
  plant: PlantOut;
};

export const PlantCard = ({ plant }: Props) => {
  const baseURL = storage.getString('base_url');
  console.log(plant.main_photo);
  return (
    <Link href={`/plant/${plant.id}`} asChild>
      <Pressable>
        <View className="m-2 overflow-hidden rounded-xl  border border-neutral-300 bg-white  dark:bg-neutral-900">
          {plant.main_photo ? (
            <Image
              className="h-56 w-full overflow-hidden rounded-t-xl"
              contentFit="cover"
              source={{
                uri: baseURL + '/' + plant.main_photo,
              }}
            />
          ) : null}

          <View className="p-2">
            <Text className="py-3 text-2xl ">{plant.name}</Text>
            <Text numberOfLines={3} className="leading-snug text-gray-600">
              {plant.common_name}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};

import React, { useEffect, useState } from 'react';

import type { AreaOut, PlantOut } from '@/api';
import { AreaApi, PlantApi } from '@/api';
import PlantCount from '@/components/index/plantCount';
import { getToken } from '@/core/auth/utils';
import axiosInstance from '@/provider/custom-axios';
import { FocusAwareStatusBar, Text, View } from '@/ui';

export default function Index() {
  const token = getToken();

  const [areaData, setAreaData] = useState<AreaOut[]>([]);
  const [plantData, setPlantData] = useState<PlantOut[]>([]);
  const [graveyardData, setGraveyardData] = useState<PlantOut[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const api = new PlantApi(undefined, undefined, axiosInstance);
      const areaApi = new AreaApi(undefined, undefined, axiosInstance);
      // get alive plants
      try {
        const response = await api.trackerApiViewPlantListPlants(true, false);
        if (response.status === 200) {
          setPlantData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      // get graveyard
      try {
        const response = await api.trackerApiViewPlantListPlants(false, true);
        if (response.status === 200) {
          setGraveyardData(response.data);
        }
      } catch (err) {
        console.error(err);
      }
      // get area data
      try {
        const areaResponse = await areaApi.trackerApiViewAreaListAreas();
        if (areaResponse.status === 200) {
          setAreaData(areaResponse.data);
        }
      } catch (err) {
        console.error(err);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Text>Loading</Text>;
  }
  return (
    <View className="bg-background dark:bg-backgroundDark flex-1 px-4">
      <FocusAwareStatusBar />
      <View className="flex h-full w-full items-center  justify-center">
        <View className="justify-end ">
          <Text className="my-3 text-center text-5xl font-bold">
            {token.first_name}'s Plants
          </Text>
          <PlantCount plantData={plantData} graveyardData={graveyardData} />
        </View>
      </View>
    </View>
  );
}

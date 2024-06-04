import type { Theme } from '@react-navigation/native';
import {
  DarkTheme as _DarkTheme,
  DefaultTheme,
} from '@react-navigation/native';
import { useColorScheme } from 'nativewind';

import colors from '@/ui/colors';

const DarkTheme: Theme = {
  ..._DarkTheme,
  colors: {
    ..._DarkTheme.colors,
    primary: '#f4c403',
    background: '#0c110e',
    text: '#f5f8fa',
    border: colors.charcoal[500],
    card: colors.charcoal[850],
    notification: '',
  },
};

const LightTheme: Theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#f4c403',
    background: '#f5f8fa',
    text: '#0c110e',
    border: colors.charcoal[500],
    card: colors.charcoal[850],
    notification: '',
  },
};

export function useThemeConfig() {
  const { colorScheme } = useColorScheme();

  if (colorScheme === 'dark') return DarkTheme;

  return LightTheme;
}

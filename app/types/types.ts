export type Place = {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  lat: number;
  lng: number;
};

import { Ionicons } from "@expo/vector-icons";

export type OutlineButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
  children: React.ReactNode;
};

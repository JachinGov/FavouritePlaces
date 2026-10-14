import { View, Image, Text, Pressable, StyleSheet } from "react-native";
import { Place } from "../../types/types";

type PlaceItemProps = {
  place: Place;
  onSelect: (id: string) => void;
};

function PlaceItem({ place, onSelect }: PlaceItemProps) {
  return (
    <Pressable onPress={() => onSelect(place.id)}>
      <Image source={{ uri: place.imageUri }} />
      <View>
        <Text>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({});

import { FlatList, StyleSheet, Text, View } from "react-native";
import PlaceItem from "./PlaceItem";
import { Colors } from "../../constants/colors";

function PlacesList({
  places,
  onSelectPlace,
  onDeletePlace,
}: {
  places: any[];
  onSelectPlace: (id: string) => void;
  onDeletePlace: (id: string) => void;
}) {
  if (!places || places.length === 0) {
    return (
      <View style={styles.fallbackContainer}>
        <Text style={styles.fallbackText}>
          No places added yet - start adding places!
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <PlaceItem
          place={item}
          onSelect={onSelectPlace}
          onDelete={onDeletePlace}
        />
      )}
    />
  );
}

export default PlacesList;
const styles = StyleSheet.create({
  list: {
    margin: 24,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },
  fallbackText: {
    fontSize: 16,
    color: Colors.primary200,
  },
});

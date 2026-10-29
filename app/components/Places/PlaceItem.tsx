import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons"; // Built-in with Expo
import { Colors } from "../../constants/colors";

function PlaceItem({
  place,
  onSelect,
  onDelete,
}: {
  place: any;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  return (
    <Pressable
      style={({ pressed }) => [styles.item, pressed && styles.pressed]}
      onPress={() => onSelect(place.id)}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.info}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address}>{place.address}</Text>
      </View>
      <Pressable
        style={({ pressed }) => [
          styles.deleteButton,
          pressed && styles.pressed,
        ]}
        onPress={() => onDelete(place.id)}
      >
        <Ionicons name="trash" size={24} color="#ff5252" />
      </Pressable>
    </Pressable>
  );
}

export default PlaceItem;

const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.primary500,
    marginVertical: 12,
    borderRadius: 6,
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.7,
  },
  image: {
    flex: 1,
    height: 100,
    borderBottomLeftRadius: 6,
    borderTopLeftRadius: 6,
  },
  info: {
    flex: 2,
    padding: 12,
  },
  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.gray700,
    marginBottom: 4,
  },
  address: {
    fontSize: 12,
    color: Colors.gray700,
  },
  deleteButton: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});

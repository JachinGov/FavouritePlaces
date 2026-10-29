import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import OutlinedButton from "../UI/OutlinedButton";
import { useCallback } from "react";
function PlaceForm({
  onCreatePlace,
}: {
  onCreatePlace: (placeData: {
    title: string;
    imageUri: string;
    lat: number;
    lng: number;
  }) => void;
}) {
  const [enteredTitle, setEnteredTitle] = useState("");
  const [selectedImage, setSelectedImage] = useState<string>();
  const [selectedLocation, setSelectedLocation] = useState<{
    lat: number;
    lng: number;
  }>();

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandler(imageUri: string) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback(
    (location: { lat: number; lng: number }) => {
      setSelectedLocation(location);
    },
    [],
  );

  function savePlaceHandler() {
    if (!enteredTitle || !selectedImage || !selectedLocation) {
      return;
    }

    onCreatePlace({
      title: enteredTitle,
      imageUri: selectedImage,
      lat: selectedLocation.lat,
      lng: selectedLocation.lng,
    });
  }

  return (
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.labels}>Title</Text>
        <TextInput
          style={styles.inputs}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <OutlinedButton icon="save" onPress={savePlaceHandler}>
        Add Place
      </OutlinedButton>
    </ScrollView>
  );
}

export default PlaceForm;

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  labels: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#ffffff",
  },
  inputs: {
    marginVertical: 8,
    backgroundColor: "#ffffff",
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    fontSize: 16,
  },
});

import { useState } from "react";
import { Alert, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
} from "expo-image-picker";

import OutlinedButton from "../UI/OutlinedButton";
import { Colors } from "../../constants/colors";

function ImagePicker({
  onTakeImage,
}: {
  onTakeImage: (imageUri: string) => void;
}) {
  const [pickedImageUri, setPickedImageUri] = useState<string>();
  const [cameraPermissionInformation, requestPermission] =
    useCameraPermissions();

  async function verifyPermissions() {
    if (cameraPermissionInformation?.granted) {
      return true;
    }

    const permissionResponse = await requestPermission();

    if (permissionResponse.granted) {
      return true;
    }

    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant camera permissions to use this feature.",
    );
    return false;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });

    if (!image.canceled) {
      setPickedImageUri(image.assets[0].uri);
      onTakeImage(image.assets[0].uri);
    }
  }

  let imagePreview = (
    <Text style={styles.fallbackText}>No image taken yet.</Text>
  );

  if (pickedImageUri) {
    imagePreview = (
      <Image source={{ uri: pickedImageUri }} style={styles.image} />
    );
  }

  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlinedButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlinedButton>
    </View>
  );
}

export default ImagePicker;

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 200,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    marginVertical: 8,
    overflow: "hidden",
  },
  fallbackText: {
    color: Colors.primary800,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

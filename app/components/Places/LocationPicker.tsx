import { useEffect, useState } from "react";
import { Alert, View, StyleSheet, Image, Text } from "react-native";
import {
  getCurrentPositionAsync,
  useForegroundPermissions,
} from "expo-location";
import {
  useNavigation,
  useRoute,
  useIsFocused,
} from "@react-navigation/native";

import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import { getMapPreview } from "../../util/Location";

function LocationPicker({
  onPickLocation,
}: {
  onPickLocation: (location: { lat: number; lng: number }) => void;
}) {
  const [pickedLocation, setPickedLocation] = useState<{
    lat: number;
    lng: number;
  }>();
  const isFocused = useIsFocused();

  const navigation = useNavigation<any>();
  const route = useRoute();

  const [locationPermissionInformation, requestPermission] =
    useForegroundPermissions();

  const mapParams = route.params as { pickedLat?: number; pickedLng?: number };

  useEffect(() => {
    if (isFocused && mapParams?.pickedLat && mapParams?.pickedLng) {
      const mapPickedLocation = {
        lat: mapParams.pickedLat,
        lng: mapParams.pickedLng,
      };
      setPickedLocation(mapPickedLocation);
      onPickLocation(mapPickedLocation);
    }
  }, [route, isFocused, onPickLocation]);

  async function verifyPermissions() {
    if (locationPermissionInformation?.granted) {
      return true;
    }

    const permissionResponse = await requestPermission();

    if (permissionResponse.granted) {
      return true;
    }

    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant location permissions to use this app.",
    );
    return false;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const location = await getCurrentPositionAsync();
    const locationData = {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    };

    setPickedLocation(locationData);
    onPickLocation(locationData);
  }

  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No location picked yet.</Text>;

  if (pickedLocation) {
    locationPreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(pickedLocation.lat, pickedLocation.lng),
        }}
      />
    );
  }

  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>
      <View style={styles.actions}>
        <OutlinedButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlinedButton>
        <OutlinedButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
}

export default LocationPicker;

const styles = StyleSheet.create({
  mapPreview: {
    width: "100%",
    height: 200,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: "hidden",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});

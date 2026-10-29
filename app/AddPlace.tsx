import { router } from "expo-router";
import PlaceForm from "./components/Places/PlaceForm";

function AddPlace() {
  function createPlaceHandler(placeData: {
    title: string;
    imageUri: string;
    lat: number;
    lng: number;
  }) {
    router.push({
      pathname: "/",
      params: {
        title: placeData.title,
        imageUri: placeData.imageUri,
        lat: placeData.lat,
        lng: placeData.lng,
      },
    });
  }

  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}

export default AddPlace;

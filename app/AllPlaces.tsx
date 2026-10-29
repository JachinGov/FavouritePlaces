import { useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import PlacesList from "./components/Places/PlacesList";

function AllPlaces() {
  const [loadedPlaces, setLoadedPlaces] = useState<any[]>([]);
  const route = useRoute();

  const params = route.params as {
    title?: string;
    imageUri?: string;
    lat?: number;
    lng?: number;
  };

  useEffect(() => {
    if (params?.title && params?.imageUri) {
      setLoadedPlaces((curPlaces) => [
        ...curPlaces,
        {
          id: new Date().toString() + Math.random(), // Unique ID
          title: params.title,
          imageUri: params.imageUri,
          address: "123 Street",
          location: { lat: params.lat, lng: params.lng },
        },
      ]);
    }
  }, [params]);

  // Function to filter out the deleted place by its ID
  function deletePlaceHandler(id: string) {
    setLoadedPlaces((currentPlaces) =>
      currentPlaces.filter((place) => place.id !== id),
    );
  }

  return (
    <PlacesList
      places={loadedPlaces}
      onSelectPlace={(id) => {
        /* Navigate to details or handle selection */
      }}
      onDeletePlace={deletePlaceHandler} // Pass down delete handler
    />
  );
}

export default AllPlaces;

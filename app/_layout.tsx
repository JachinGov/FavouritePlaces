import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import IconButton from "./components/UI/IconButton";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" />

      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: "#1aacf0" },
          headerTintColor: "#221c30",
          contentStyle: { backgroundColor: "#221c30" },
        }}
      >
        <Stack.Screen
          name="index"
          options={({ navigation }) => ({
            title: "Your Favorite Places",
            headerRight: ({ tintColor }) => (
              <IconButton
                icon="add"
                size={24}
                color={tintColor}
                onPress={() => navigation.navigate("AddPlace")}
              />
            ),
          })}
        />

        <Stack.Screen
          name="AddPlace"
          options={{
            title: "Add a new place",
          }}
        />

        <Stack.Screen name="Map" />
      </Stack>
    </>
  );
}

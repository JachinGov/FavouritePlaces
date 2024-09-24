import { StatusBar } from "expo-status-bar";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AllPlaces from "./screens/AllPlaces";
import AddPlace from "./screens/AddPlace";
import IconButton from "./components/UI/IconButton"
import { Colors } from "@/constants/Colors";
import Map from "./screens/Map";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
    <StatusBar style="dark"/>
    <NavigationContainer independent={true}>
      <Stack.Navigator
      screenOptions={{
        headerStyle: {backgroundColor: '#1aacf0'},
        headerTintColor: '#221c30',
        contentStyle: {backgroundColor: '#221c30' },
      }} >
        <Stack.Screen name="AllPlaces" 
        component={AllPlaces} 
        options={ ({navigation}) =>  ({
          title: 'Your Favorite Places', 
          headerRight: ({tintColor}) => (
          <IconButton icon='add' size={24} color={tintColor} onPress={() => navigation.navigate('AddPlace') }/> 
        ),
          
        })} />
        <Stack.Screen name="AddPlace" component={AddPlace} options={{
          title:'Add a new place',
        }} />
        <Stack.Screen name="Map" component={Map} />
      </Stack.Navigator>
    </NavigationContainer>
    </>
  );
}


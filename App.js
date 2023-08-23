import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllPlaces from "./src/screens/AllPlaces";
import AddPlace from "./src/screens/AddPlace";
import IconButton from "./src/components/UI/IconButton";
import {useNavigation} from "@react-navigation/native";
import COLORS from "./src/constants/colors";

const Stack = createNativeStackNavigator()

export default function App() {

  return (
      <>
        <StatusBar style={"light"}/>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: COLORS.primary },
                headerTintColor: COLORS.text1,
                contentStyle: {backgroundColor: COLORS.background},
            }}>
                <Stack.Screen name={'AllPlaces'} component={AllPlaces} options={({navigation}) => ({
                    headerRight: ({tintColor}) => <IconButton icon={'plus'} size={20} color={tintColor} action={() => {navigation.navigate('AddPlace')}}/>,
                    title: 'All Spots'
                })}/>
                <Stack.Screen name={'AddPlace'} component={AddPlace} options={{
                    title: 'Add a new Spot',
                }}/>
            </Stack.Navigator>
        </NavigationContainer>
      </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

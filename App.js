import {StatusBar} from 'expo-status-bar';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from "@react-navigation/native-stack";
import AllPlaces from "./src/screens/AllPlaces";
import AddPlace from "./src/screens/AddPlace";
import IconButton from "./src/components/UI/IconButton";
import COLORS from "./src/constants/colors";
import Map from './src/screens/Map'
import {init} from "./src/util/db";
import {useEffect, useState} from "react";
import AppLoading from "expo-app-loading";

const Stack = createNativeStackNavigator()

export default function App() {

    useEffect(() => {
        init()
    }, []);


  return (
      <>
        <StatusBar style={"light"}/>
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerStyle: {backgroundColor: COLORS.primary },
                headerTintColor: COLORS.text1,
                contentStyle: {backgroundColor: COLORS.background, paddingBottom: 25},
            }}>
                <Stack.Screen name={'AllPlaces'} component={AllPlaces} options={({navigation}) => ({
                    headerRight: ({tintColor}) => <IconButton icon={'plus'} size={20} color={tintColor} action={() => {navigation.navigate('AddPlace')}}/>,
                    title: 'All Spots',
                })}/>
                <Stack.Screen name={'AddPlace'} component={AddPlace} options={{
                    title: 'Add a new Spot',
                }}/>
                <Stack.Screen name={'Map'} component={Map}/>
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

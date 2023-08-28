import MapView, {Marker} from "react-native-maps";
import {StyleSheet, Alert, Text, View} from "react-native";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";
import {getCurrentPositionAsync} from "expo-location";

function Map({navigation, route}){

    const initialLocation = route.params && {
        lat: route.params.initialLat,
        lng: route.params.initialLng,
        mode: route.params.mode
    }

    const [selectedLocation, setSelectedLocation] = useState(initialLocation)

    const region = {
        latitude: initialLocation ? initialLocation.lat : 54.37,
        longitude: initialLocation ? initialLocation.lng : 18.63,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    function handleMapPress(event){
        if(initialLocation?.mode === 'preview'){
            return
        }
        const lat = event.nativeEvent.coordinate.latitude
        const lng = event.nativeEvent.coordinate.longitude

        setSelectedLocation({lat: lat, lng: lng})
    }

    const savePickedLocation = useCallback(() =>{
        if(!selectedLocation){
            Alert.alert('No location selected!', 'You have to pick a location to save it.')
            return
        }
        navigation.navigate('AddPlace', { pickedLat: selectedLocation.lat, pickedLng: selectedLocation.lng })
    },[navigation, selectedLocation])

    useLayoutEffect(() => {
        if(initialLocation?.mode === 'preview'){
            return
        }
        navigation.setOptions({
            headerRight: ({tintColor}) => {
                return <IconButton icon={'save'} size={20} color={tintColor} action={savePickedLocation}/>
            }
        })
    }, [navigation, savePickedLocation, initialLocation]);

    return(
        <MapView style={styles.map} initialRegion={region} onPress={handleMapPress}>
            {selectedLocation && <Marker coordinate={{latitude: selectedLocation.lat, longitude: selectedLocation.lng}}/>}
        </MapView>
    )
}

export default Map

const styles = StyleSheet.create({
    map:{
        flex: 1,
    }
})
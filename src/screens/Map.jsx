import MapView, {Marker} from "react-native-maps";
import {StyleSheet, Alert} from "react-native";
import {useCallback, useLayoutEffect, useState} from "react";
import IconButton from "../components/UI/IconButton";

function Map({navigation}){

    const [selectedLocation, setSelectedLocation] = useState()

    const region = {
        latitude: 37.78,
        longitude: -122.43,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
    }

    function handleMapPress(event){
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
        navigation.setOptions({
            headerRight: ({tintColor}) => {
                return <IconButton icon={'save'} size={20} color={tintColor} action={savePickedLocation}/>
            }
        })
    }, [navigation, savePickedLocation]);

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
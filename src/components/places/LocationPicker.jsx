import {Alert, Image, StyleSheet, View} from "react-native";
import CustomButton from "../UI/CustomButton";
import COLORS from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import {useEffect, useState} from "react";
import {getMapPreview, getAddress} from "../../util/location";
import {useNavigation, useRoute, useIsFocused} from "@react-navigation/native";

function LocationPicker({onLocationPicked}){

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [location, setLocation] = useState()
    const navigator = useNavigation()
    const route = useRoute()
    const isFocused = useIsFocused()

    useEffect(() => {
        if(isFocused && route.params){
            const mapPickedLocation = route.params && {lat: route.params.pickedLat, lng: route.params.pickedLng}
            setLocation(mapPickedLocation)
        }
    }, [route, isFocused]);

    useEffect(() => {
        async function handleLocation(){
            if(location){
               const address = await getAddress(
                   location.lat,
                   location.lng
               )
                onLocationPicked({...location, address})
            }
        }

        handleLocation()

    }, [location, onLocationPicked]);

    async function getPermissions(){
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient permissions.', 'You need to grant location permissions to use the app.');
            return false;
        }
        return true;
    }

    async function getLocationHandler(){

        const hasPermit = await getPermissions()

        if(!hasPermit){
            return
        }

        const location = await getCurrentPositionAsync()
        console.log(location)
        setLocation({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
        onLocationPicked({
            lat: location.coords.latitude,
            lng: location.coords.longitude,
        })
    }
    function pickOnMapHandler(){
        navigator.navigate('Map')
    }

    let mapPreview = (
        <View style={styles.buttonContainer}>
            <CustomButton icon={'location-arrow'} text={'Locate User'} onPress={getLocationHandler}/>
            <CustomButton icon={'search-location'} text={'Pick on a Map'} onPress={pickOnMapHandler}/>
        </View>
    )

    if(location){
        mapPreview = <Image style={styles.mapPreviewImage} source={{uri: getMapPreview(location.lat, location.lng)}}/>
    }

    return (
        <View>
            <View style={styles.mapPreview}>
                {mapPreview}
            </View>
            {location && <View style={[styles.buttonContainer, styles.buttonContainerHorizontal]}>
                <CustomButton style={styles.button} icon={'location-arrow'} text={'Locate User'} onPress={getLocationHandler}/>
                <CustomButton style={styles.button} icon={'search-location'} text={'Pick on a Map'} onPress={pickOnMapHandler}/>
            </View>}
        </View>
    )
}

export default LocationPicker

const styles = StyleSheet.create({
    mapPreview: {
        width: '100%',
        height: 220,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: COLORS.primary,
        borderRadius: 7,
        overflow: "hidden",
    },
    buttonContainer:{
        gap: 10,
    },
    buttonContainerHorizontal:{
        flexDirection: "row",
    },
    mapPreviewImage: {
        width: '100%',
        height: '100%'
    },
    button: {
        flex: 1,
        margin: 0,
    }
})
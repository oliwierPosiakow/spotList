import {Alert, Image, StyleSheet, View} from "react-native";
import CustomButton from "../UI/CustomButton";
import COLORS from "../../constants/colors";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import {useState} from "react";
import getMapPreview from "../../util/location";

function LocationPicker(){

    const [locationPermissionInformation, requestPermission] = useForegroundPermissions()
    const [location, setLocation] = useState()

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
    }
    function pickOnMapHandler(){

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
        height: 250,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: COLORS.primary
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
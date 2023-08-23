import {View, Alert, Image, Text, StyleSheet} from "react-native";
import {launchCameraAsync, useCameraPermissions, PermissionStatus} from "expo-image-picker";
import {useState} from "react";
import COLORS from "../../constants/colors";
import CustomButton from "../UI/CustomButton";

function ImagePicker() {

    const [cameraPermissionInformation, requestPermission] = useCameraPermissions()
    const [image, setImage] = useState()

    async function takeImageHandler(){
        const hasPermit = await getPermissions()
        if(!hasPermit){
            return
        }
        const photo = await launchCameraAsync({
            allowsEditing: true,
            aspect: [16,9],
            quality: 0.5,
        });
        setImage(photo.assets[0].uri)
    }

    async function getPermissions() {
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient permissions.', 'You need to grant camera permissions to use the app.');
            return false;
        }
        return true;
    }

    let imagePreview = <CustomButton icon={'camera'} onPress={takeImageHandler} text={'Take a photo'}/>

    if(image){
        imagePreview = <Image style={styles.imagePreviewImage} source={{uri: image}}/>
    }

    return (
        <View>
            <View style={styles.imagePreview}>
                {imagePreview}
            </View>
            {image && <CustomButton icon={'camera'} onPress={takeImageHandler} text={'Take a photo'}/> }
        </View>
    )
}

export default ImagePicker

const styles = StyleSheet.create({
    imagePreview:{
        width: '100%',
        height: 250,
        marginVertical: 10,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: COLORS.primary
    },
    imagePreviewImage:{
        width: '100%',
        height: '100%',
    },
    imagePreviewText:{
        color: COLORS.primary,
    }
})
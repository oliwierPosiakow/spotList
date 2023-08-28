import {View, Text, ScrollView, TextInput, StyleSheet, Alert} from "react-native";
import {useState, useCallback} from "react";
import COLORS from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";
import CustomButton from "../UI/CustomButton";
import {Place} from "../../models/Place";

function PlaceForm({createSpot}) {

    const [title, setTitle] = useState('')
    const [location, setLocation] = useState()
    const [image, setImage] = useState()
    const [desc, setDesc] = useState('')

    function changeTitle(enteredText){
        setTitle(enteredText)
    }

    function changeDesc(enteredText){
        setDesc(enteredText)
    }

    function saveSpotHandler(){
        if(!title || !location || !image){
            Alert.alert('Form not complete', 'You have to complete whole form to proceed.')
            return
        }
        const spotData = new Place(
            title,
            image,
            desc,
            location
        )
        createSpot(spotData)
    }

    function takeImageHandler(imageUri){
        setImage(imageUri)
    }

    const takeLocationHandler = useCallback((location) => {
        setLocation(location)
    },[])

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitle} value={title}/>
            </View>
            <View>
                <Text style={styles.label}>Description</Text>
                <TextInput style={styles.input} onChangeText={changeDesc} value={desc} multiline={true}/>
            </View>
            <ImagePicker onImagePicked={takeImageHandler}/>
            <LocationPicker onLocationPicked={takeLocationHandler}/>
            <CustomButton textStyle={styles.submitButtonText} style={styles.submitButton} text={'Save Spot'} onPress={saveSpotHandler}/>
        </ScrollView>
    )
}

export default  PlaceForm

const styles = StyleSheet.create({
    form: {
        flex: 1,
        padding: 10,
    },
    label: {
        fontWeight: "bold",
        marginBottom: 5,
        color: COLORS.primary,
        fontSize: 16
    },
    input: {
        marginVertical: 5,
        paddingVertical: 5,
        fontSize: 16,
        borderBottomColor: COLORS.primary,
        borderBottomWidth: 2,
    },
    submitButton:{
        backgroundColor: COLORS.primary,
        paddingVertical: 10,
        marginVertical: 10,
        marginHorizontal: 0,
    },
    submitButtonText:{
        color: COLORS.text1,
    }
})
import {View, Text, ScrollView, TextInput, StyleSheet} from "react-native";
import {useState} from "react";
import COLORS from "../../constants/colors";
import ImagePicker from "./ImagePicker";

function PlaceForm() {

    const [title, setTitle] = useState('')

    function changeTitle(enteredText){
        setTitle(enteredText)
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>Title</Text>
                <TextInput style={styles.input} onChangeText={changeTitle} value={title}/>
            </View>
            <ImagePicker/>
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
    }
})
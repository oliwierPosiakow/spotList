import {Image, Pressable, StyleSheet, Text, View} from "react-native";
import COLORS from "../../constants/colors";

function PlaceItem({place, onSelect}){

    return (
        <Pressable
            style={({pressed}) => [styles.spotContainer, pressed && styles.pressed]}
            onPress={onSelect.bind(this, place.id)}
        >
            <Image style={styles.spotImg} source={{uri: place.imageUri}}/>
            <View style={styles.spotDesc}>
                <Text style={styles.spotTitle}>
                    {place.title}
                </Text>
                <Text style={styles.spotAddress}>
                    {place.location.address}
                </Text>
            </View>
        </Pressable>
    )
}

export default  PlaceItem

const styles = StyleSheet.create({
    spotContainer:{
        borderBottomWidth: 2,
        borderBottomColor: COLORS.primary,
        paddingVertical: 10,
        flexDirection: "row",
        gap: 10,
        marginVertical: 5,
    },
    pressed: {
        opacity: .8
    },
    spotDesc:{
        flex: 3,
        justifyContent: "space-around",
        gap: 5,
    },
    spotTitle:{
        fontWeight: "bold",
        fontSize: 18,
    },
    spotImg:{
        flex: 2,
        height: 100,
        borderRadius: 7,
    },
    spotAddress:{
        fontSize: 16,
    }
})
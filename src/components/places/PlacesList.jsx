import {FlatList, View, Text, StyleSheet} from "react-native";
import PlaceItem from "./PlaceItem";

function PlacesList({places}) {

    if(!places || places.length === 0){
        return (
            <View style={styles.fallback}>
                <Text style={styles.fallbackText}>
                    No places added yet, lets add some!
                </Text>
            </View>
        )
    }

    return (
        <FlatList
            style={styles.list}
            data={places}
            keyExtractor={(item) => item.id}
            renderItem={({item}) => <PlaceItem place={item}/>}
        />
    )
}

export default PlacesList

const styles = StyleSheet.create({
    fallback: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    fallbackText: {
        fontSize: 20,
    },
    list: {
        padding: 10,
    }
})
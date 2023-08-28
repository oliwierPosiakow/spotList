import {FlatList, View, Text, StyleSheet} from "react-native";
import PlaceItem from "./PlaceItem";
import {useNavigation} from "@react-navigation/native";

function PlacesList({places}) {

    const navigation = useNavigation()

    function selectSpot(id){
        navigation.navigate('PlaceDetails', {
            spotId: id
        })
    }

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
            renderItem={({item}) => <PlaceItem place={item} onSelect={selectSpot}/>}
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
import React, {useEffect, useState, useLayoutEffect} from 'react';
import {ScrollView, Image, View, Text, StyleSheet, ActivityIndicator, Alert} from "react-native";
import CustomButton from "../components/UI/CustomButton";
import {fetchSpotDetails} from "../util/db";
import COLORS from "../constants/colors";
import IconButton from "../components/UI/IconButton";
import {deleteSpot} from "../util/db";

function PlaceDetails({route, navigation}) {

    const [spotDetails, setSpotDetails] = useState()

    const selectedSpotId = route.params.spotId

    useLayoutEffect(() => {
        async function loadDetails(){
            const spotDetails = await fetchSpotDetails(selectedSpotId)
            setSpotDetails(spotDetails)
            navigation.setOptions({
                title: spotDetails.title,
                headerRight: ({tintColor}) => {
                    return <IconButton icon={'trash'} size={20} color={tintColor} action={() => {removeSpotHandler(spotDetails.id)}}/>
                }
            })
        }

        loadDetails()
    }, [selectedSpotId]);

    function showOnMapHandler(){
        navigation.navigate('Map', {
            initialLat: spotDetails.location.lat,
            initialLng: spotDetails.location.lng,
            mode: 'preview'
        })
    }

    async function removeSpotHandler(id){
        Alert.alert(
            'Do You want to delete this Spot?',
            'Please confirm deleting Spot.',
            [
                {
                    text: 'Delete',
                    style: "destructive",
                    onPress: async () => {
                        await deleteSpot(id)
                        navigation.navigate('AllPlaces')
                    }},
                {
                    text: 'Cancel',
                    style: 'cancel',
                    onPress: () => {}}
            ]
        )
    }

    if(!spotDetails){
        return (
            <View style={styles.screen}>
                <ActivityIndicator size={"large"} color={COLORS.primary}/>
            </View>
        )
    }

    return (
        <ScrollView>
            <Image style={styles.image} source={{uri: spotDetails.imageUri}}/>
            <View style={styles.detailsContainer}>
                {spotDetails.desc && <View>
                    <Text style={styles.desc}>{spotDetails.desc}</Text>
                </View>}

                <View style={styles.location}>
                    <View style={styles.addressContainer}>
                        <Text style={styles.address}>{spotDetails.location.address}</Text>
                    </View>

                    <CustomButton icon={'map'} onPress={showOnMapHandler} text={'View on map'}/>
                </View>
            </View>
        </ScrollView>
    );
}

export default PlaceDetails;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center"
    },
    detailsContainer:{
      padding: 10,
    },
    image:{
        height: '40%',
        minHeight: 300,
        width: '100%',
    },
    location: {
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 20,
        gap: 10,
        paddingHorizontal: 10,
    },
    addressContainer: {
        alignItems: "center",
    },
    address: {
        fontSize: 16,
        fontWeight: "bold",
        textAlign: "center"
    },
    desc: {
        textAlign: "center",
        fontSize: 16,
    }
})
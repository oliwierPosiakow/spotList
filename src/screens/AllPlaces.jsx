import PlacesList from "../components/places/PlacesList";
import {useEffect, useState} from "react";
import {useIsFocused} from "@react-navigation/native";
import {fetchSpots} from "../util/db";


function AllPlaces({route}) {
    const [spots, setSpots] = useState([])
    const focus = useIsFocused()

    useEffect(() => {
        async function loadSpots() {
            const spots = await fetchSpots()
            setSpots(spots)
        }
        if(focus){
            loadSpots()
        }
    }, [focus]);

    return (
        <PlacesList places={spots}/>
    );
}

export default AllPlaces;
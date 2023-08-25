import PlaceForm from "../components/places/PlaceForm";
import {insertSpot} from "../util/db";

function AddPlace({navigation}) {

    async function createSpotHandler(spot) {
        await insertSpot(spot)
        navigation.navigate('AllPlaces')
    }

    return (
        <PlaceForm createSpot={createSpotHandler}/>
    )
}

export default  AddPlace
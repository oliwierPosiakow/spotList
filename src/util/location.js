const apiKey = process.env.EXPO_PUBLIC_API_KEY

function getMapPreview(lat,lng){
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=300x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=` + apiKey
}

export default getMapPreview
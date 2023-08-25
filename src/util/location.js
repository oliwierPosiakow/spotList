const apiKey = process.env.EXPO_PUBLIC_API_KEY

export function getMapPreview(lat,lng){
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=300x200&maptype=roadmap&markers=color:red%7C${lat},${lng}&key=` + apiKey
}

export async function getAddress(lat,lng) {
    const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=` + apiKey
    const res = await fetch(url)

    if(!res.ok){
        throw new Error('Failed to fetch address.')
    }

    const data = await res.json()
    return data.results[0].formatted_address
}
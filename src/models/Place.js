export class Place{
    constructor(title, imageUri,desc, location, id) {
        this.title = title;
        this.imageUri = imageUri;
        this.desc = desc;
        this.location = {
            address: location.address,
            lat: location.lat,
            lng: location.lng
        };
        this.id = id
    }
}


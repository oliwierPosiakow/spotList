import * as SQLite from 'expo-sqlite'
import {Place} from "../models/Place";

const database = SQLite.openDatabase('spots.db')

export function init(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(`
            CREATE TABLE IF NOT EXISTS spots (
                id INTEGER PRIMARY KEY NOT NULL,
                title TEXT NOT NULL,
                imageUri TEXT NOT NULL,
                address TEXT NOT NULL,
                lat REAL NOT NULL,
                lng REAL NOT NULL
            )`,
                [],
                () => {
                    resolve()
                },
                (_, error) => {
                    reject(error)
                }
            )
        })
    })

    return promise
}

export function insertSpot(spot){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                ` INSERT INTO spots (title, imageUri, address, lat, lng) VALUES (?, ?, ?, ?, ?)`,
                [
                    spot.title,
                    spot.imageUri,
                    spot.location.address,
                    spot.location.lat,
                    spot.location.lng
                ],
                (_, result) => {
                    resolve(result)
                },
                (_, e) => {
                    reject(e)
                }
            )
        })
    })

    return promise
}

export function fetchSpots(){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                `SELECT * FROM spots`,
                [],
                (_, result) => {
                    const spots = []

                    for(const item of result.rows._array ){
                        spots.push(
                            new Place (
                                item.title,
                                item.imageUri,
                                {
                                    address: item.address,
                                    lat: item.lat,
                                    lng: item.lng
                                },
                                item.id
                            )
                        )
                    }
                    resolve(spots.reverse())
                },
                (e) => {
                    reject(e)
                }
                )
        })
    })
    return promise
}

export function fetchSpotDetails(id){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'SELECT * FROM spots WHERE id = ?',
                [id],
                (_, result) => {
                    const dbPlace = result.rows._array[0]
                    const place = new Place(
                        dbPlace.title,
                        dbPlace.imageUri,
                        {address: dbPlace.address, lat: dbPlace.lat, lng: dbPlace.lng},
                        dbPlace.id
                    )
                    resolve(place)
                },
                (_, e) => {
                    reject(e)
                }
            )
        })
    })
    return promise
}

export function deleteSpot(id){
    const promise = new Promise((resolve, reject) => {
        database.transaction((tx) => {
            tx.executeSql(
                'DELETE FROM spots WHERE id = ?',
                [id],
                (_, result) => {
                    resolve(result)
                },
                (e) => {
                    reject(e)
                }
                )
        })
    })
    return promise
}
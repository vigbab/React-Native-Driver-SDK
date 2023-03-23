import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
// import getLocationName from "./utils/findlocation.js"
import axios from 'axios';






const MapScreen = () => {
    const [location, setLocation] = useState({ latitude: 0, longitude: 0 });
    const [mylocation, setmylocation] = useState(null)
    const mapViewRef = useRef()


    const getLocationName = async (latitude, longitude) => {
        console.log(longitude, latitude)
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7b483ce86cff4b878e10e62c449e0619&no_annotations=1`
            );

            if (response.data.results.length > 0) {
                setmylocation(response.data.results[0].formatted)
                return response.data.results[0].formatted;
            } else {
                return null;
            }
        } catch (error) {
            console.error(error);
            return null;
        }
    };


    useEffect(() => {
        // get current location and update it every 3 seconds
        const interval = setInterval(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }

            let { coords } = await Location.getCurrentPositionAsync({});
            setLocation({
                latitude: coords.latitude,
                longitude: coords.longitude,


                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            })
            const data = getLocationName(location?.latitude, location.longitude)
            //   alert(data)
            // setmylocation(data)
            // console.log("data", data)


            console.log("mylocation",mylocation)



        }, 1000);


        // console.log(location.latitude,location.longitude)


        // cleanup function to clear the interval
        return () => clearInterval(interval);
    }, []);

    return (
        <View style={styles.container}>
            {location && (
                // <MapView
                //     style={{ flex: 1 }}
                //     ref={mapViewRef}
                //     onLayout={() => {
                //         mapViewRef.current.fitToCoordinates(coordinates, {
                //             edgePadding: { top: 10, right: 10, bottom: 10, left: 10 },
                //             animated: true,
                //         });
                //     }}
                // >


                //     <Marker
                //         coordinate={location}
                //         title="Your location"
                //         description="You are here"
                //     />
                // </MapView>
                // console.log(location)
                <View style={{
                    marginTop: 50, width:200
                }}>
                    <Text style={{ fontWeight: 800 }}>Latitude: {location.latitude}</Text>
                    <Text style={{ fontWeight: 800 }}> Longitude: {location.longitude}</Text>

                    <Text >{mylocation}</Text>
                </View>

            )}
            {!location && (
                <View style={styles.textContainer}>
                    <Text>Please enable location services</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    map: {
        flex: 1,
    },
    textContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default MapScreen;

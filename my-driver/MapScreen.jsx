import React, { useEffect, useRef, useState } from "react";
import { StyleSheet, View, Text, Pressable, TouchableHighlight, TouchableOpacity } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { createClient } from "@supabase/supabase-js";
import url from "url";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from '@react-navigation/native';


const MapScreen = ({userId}) => {
    const navigation = useNavigation();

    const previousLocationRef = useRef(null);

  const supabaseUrl = "https://yrljbdsdwdffgtddieyy.supabase.co";
  const supabaseKey =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlybGpiZHNkd2RmZmd0ZGRpZXl5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODAxMTA0NTEsImV4cCI6MTk5NTY4NjQ1MX0.sy-cBRj5In39YaNBon4gUfXsplvvovPHoYdjjrh33Bw";

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
  const mapViewRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [mylocation, setMyLocation] = useState(null);

  const getLocationName = async (latitude, longitude) => {
    try {
      const response = await axios.get(
        `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=7b483ce86cff4b878e10e62c449e0619&no_annotations=1`
      );

      if (response.data.results.length > 0) {
        setMyLocation(response.data.results[0].formatted);
        return response.data.results[0].formatted;
      }
    } catch (error) {
      console.error(error);
    }
    return null;
  };

  useEffect(() => {
    const interval = setInterval(async () => {
        getLocationName(location.latitude,location.longitude)
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      const { coords } = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

//   useEffect(() => {
//     if (location && location !== previousLocationRef.current) {
//       getLocationName(location.latitude, location.longitude);
//       supabase
//         .from("user_locations")
//         .upsert({user_id: userId, lat: location.latitude, long: location.longitude })
//         .then((res) => console.log(res));
//       previousLocationRef.current = location;
//     }
//   }, [location]);
// useEffect(() => {
//     if (location) {
//       // Fetch the previous location data for the user ID
//       supabase
//         .from("user_locations")
//         .select("lat, long")
//         .eq("user_id", userId)
//         .limit(1)
//         .single()
//         .then(({ data: previousLocationData, error }) => {
//           if (error) {
//             // Handle error when fetching previous location data
//             console.log("Error fetching previous location data:", error);
//           } else {
//             // Compare the new location data with the previous location data
//             const { latitude, longitude } = location;
//             const { lat: previousLatitude, long: previousLongitude } = previousLocationData || {};
    
//             if (latitude !== previousLatitude || longitude !== previousLongitude) {
//               // Update the location data in the user_locations table
//               supabase
//                 .from("user_locations")
//                 .upsert({ user_id: userId, lat: latitude, long: longitude })
//                 .then((res) => console.log(res));
//             } else {
//               console.log("New location data is the same as previous data. Skipping update.");
//             }
//           }
//         });
//     }
//   }, [location]);


useEffect(() => {
    if (location) {
      // Remove the previous location data for the user ID
      supabase
        .from("user_locations")
        .delete()
        .eq("user_id", userId)
        .then(() => {
          // Insert the current location data in the user_locations table
          const { latitude, longitude } = location;
          supabase
            .from("user_locations")
            .upsert({ user_id: userId, lat: latitude, long: longitude })
            .then((res) => console.log(res));
        })
        .catch((error) => {
          // Handle error when removing previous location data
          console.log("Error removing previous location data:", error);
        });
    }
  }, [location]);
  
    

  return (
    <View style={styles.container}>
      {location && (
        <View style={styles.textContainer}>
          <Text style={{ fontWeight: "800" }}>
            Your Latitude: {location.latitude}
          </Text>
          <Text style={{ fontWeight: "800" }}>
            Your Longitude: {location.longitude}
          </Text>
          <Text>You are at {mylocation}</Text>
          <TouchableOpacity onPress={()=>navigation.navigate("App")}><Text>
          {/* Return to Back! */}
            </Text></TouchableOpacity>
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
  textContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
    width: 200,
  },
});

export default MapScreen;

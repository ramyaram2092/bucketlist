import { StyleSheet, View, TextInput, Button, Text, ImageBackground } from 'react-native';
import homepic from '../assets/home_2.jpg'
import React, { useEffect, useState } from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import HTML from 'react-native-render-html';



const API_KEY = "AIzaSyBElDk09KbzVFf9HHiK_nTram7eEXSgl2U"



export function SearchDestination() {
    const [place, setplace] = useState([])
    const [placedetails, setplacedetails] = useState([])
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();


    //get place details : no proper details
    const searchPlaces = (searchplace) => {
        const apiURL = "https://maps.googleapis.com/maps/api/place/details/json?key=" + API_KEY
        const searchURL = apiURL + "&place_id=" + searchplace + "&fields=name%2Crating%2Cformatted_address%2Cgeometry"
        console.log(searchURL)

        fetch(searchURL)
            .then(response => response.json())
            .then(results => {
                let placedetails = results
                console.log("PLACEDETAILS:" + placedetails.result.name)
                let searchplace = placedetails.result.name;
                // let placeArray = []


                // placedetails.forEach((item, index) => {
                //     let placeObject = {
                //         id: index,
                //         key: index,
                //         address: item.formatted_address,
                //         location: item.geometry.location,
                //         name:item.name
                //     }

                //     console.log("location name :"+placeObject.name) // This is what i need to add
                //     placeArray.push(placeObject)
                // })

                setplacedetails(searchplace)
                getContents()
            })
    }



    // get the wikipedia
    // const getinfo = async(place) => {


    //     // var params = {
    //     //     action: "opensearch",
    //     //     search: place,
    //     //     limit: "5",
    //     //     namespace: "0",
    //     //     format: "json"
    //     // };

    //     // url = url + "?origin=*";
    //     // Object.keys(params).forEach(function (key) { url += "&" + key + "=" + params[key]; });

    //     // fetch(url)
    //     //     .then(function (response) { return response.json(); })
    //     //     .then(function (response) { console.log("RESPONSE:"+response); })
    //     //     .catch(function (error) { console.log(error); });

    // }



    const extractAPIContents = (json) => {
        const { pages } = json.query;
        return Object.keys(pages).map((id) => pages[id].extract);
    };

    const getContents = async () => {
        let resp;
        let contents = [];
        setLoading(true);
        const url = "https://en.wikipedia.org/w/api.php?action=query&origin=*&prop=extracts&format=json&exintro=&titles=San_Diego";

        try {
            resp = await fetch(url);
            const json = await resp.json();
            contents = extractAPIContents(json);
            console.log("contents:" + contents)
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
        setContents(contents);
    };


    // const contentWidth = useWindowDimensions().width;


    return (
        <View style={styles.container}>
            <ImageBackground source={homepic} resizeMode="cover" style={styles.image}>

                <View style={styles.SearchDestination}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            console.log(details);
                            setplace(data.place_id)

                        }}
                        query={{
                            key: API_KEY,
                            language: 'en',
                        }}
                    />

                    {/* <TextInput
                        placeholder="Search Keywords"
                        onChangeText={(value) => setplace(value)}
                        value={place}
                    /> */}
                    <Button
                        style={styles.button}
                        title="Search"
                        onPress={() => searchPlaces(place)}
                    />
                    <View>
                    <HTML source={{ html: contents }} />

                    
                    </View>
                </View>
                <View>
                    <Text styles={styles.text}>A description of the place comes here </Text>
                </View>
                <View>
                    <Button
                        style={styles.button}
                        title="Add to Monthly Goals"
                        onPress={() => { }}
                    />
                    <Button
                        style={styles.button}
                        title="Add to yearly Goals"
                        onPress={() => { }}
                    />

                </View>
            </ImageBackground>
        </View>

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50
    },

    image: {
        flex: 1,
        justifyContent: "center",
        opacity: 2.0,

    },
    text: {
        color: "white",
        fontSize: 50,
        lineHeight: 84,
        fontWeight: "bold",
        textAlign: "center",
        backgroundColor: "#000000c0",
    },
    destinations: {
        flex: 1,
        backgroundColor: '#E3112A',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
    },
    SearchDestination: {
        flexDirection: "row",
        justifyContent: 'center',
        color: 'gray',
        width: '80%',
        marginTop: 5,
        marginBottom: 5,
    },
    button: {
        flex: 1,
        padding: 3,
        margin: 5
    },

    header: {
        fontSize: 20,
        fontWeight: 'bold',
    }

});


// {"description": "San Diego, CA, USA", "matched_substrings": [{"length": 3, "offset": 0}], "place_id": "ChIJSx6SrQ9T2YARed8V_f0hOg0", "reference": "ChIJSx6SrQ9T2YARed8V_f0hOg0", "structured_formatting": {"main_text": "San Diego", "main_text_matched_substrings": [[Object]], "secondary_text": "CA, USA"}, "terms": [{"offset": 0, "value": "San Diego"}, {"offset": 11, "value": "CA"}, {"offset": 15, "value": "USA"}], "types": ["locality", "political", "geocode"]} {"description": "San Diego, CA, USA", "matched_substrings": [{"length": 3, "offset": 0}], "place_id": "ChIJSx6SrQ9T2YARed8V_f0hOg0", "reference": "ChIJSx6SrQ9T2YARed8V_f0hOg0", "structured_formatting": {"main_text": "San Diego", "main_text_matched_substrings": [[Object]], "secondary_text": "CA, USA"}, "terms": [{"offset": 0, "value": "San Diego"}, {"offset": 11, "value": "CA"}, {"offset": 15, "value": "USA"}], "types": ["locality", "political", "geocode"]}
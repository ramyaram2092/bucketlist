
import { StyleSheet, View, FlatList, Button, Text, ImageBackground } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react';
import homepic from '../assets/home_2.jpg'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { collection, addDoc, query, where, getDocs } from "firebase/firestore";



//firebase config 
const firebaseConfig = {
    apiKey: "AIzaSyBW3PwVuNmN72ubv4lAduvbLUEdXwnN6iU",
    authDomain: "myblist.firebaseapp.com",
    projectId: "myblist",
    storageBucket: "myblist.appspot.com",
    messagingSenderId: "671833919077",
    appId: "1:671833919077:web:3a02e8b8f6ba6facb8c08c"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//Google API key
const API_KEY = "AIzaSyBElDk09KbzVFf9HHiK_nTram7eEXSgl2U"

export function YearlyGoals(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('2022');
    const [open1, setOpen1] = useState(false);
    const [value1, setValue1] = useState('2022');
    const [items, setItems] = useState([
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
        { label: '2027', value: '2027' },
        { label: '2028', value: '2028' },
        { label: '2029', value: '2029' },
        { label: '2030', value: '2030' },
        { label: '2031', value: '2031' },
        { label: '2032', value: '2032' },

    ]);
    const [items1, setItems1] = useState([
        { label: '2022', value: '2022' },
        { label: '2023', value: '2023' },
        { label: '2024', value: '2024' },
        { label: '2025', value: '2025' },
        { label: '2026', value: '2026' },
        { label: '2027', value: '2027' },
        { label: '2028', value: '2028' },
        { label: '2029', value: '2029' },
        { label: '2030', value: '2030' },
        { label: '2031', value: '2031' },
        { label: '2032', value: '2032' },

    ]);
    const [placeid, setplaceid] = useState()
    const [placename, setplacename] = useState()
    const [category, setcategory] = useState()
    const [email, setemail] = useState()

    const [years, setyears] = useState()
    const [placedetails, setplacedetails] = useState([])
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [userdataM, setuserdataM] = useState([])


    useEffect(() => {
        setcategory(props.route.params.data.category)
        setemail(props.route.params.data.email)

        // let  maxOffset = 10;
        // let thisYear = (new Date()).getFullYear();
        // let allYears = [];
        // for (let x = 0; x <= maxOffset; x++) {
        //     let yr= {
        //         value:thisYear + x,
        //         label:thisYear+x
        //     }
        //     allYears.push(yr)
        // }
        // setyears[allYears]

    }, []);

    useEffect(() => {
        (async () => {
            let udata = await getData()
            if (udata.length != 0)
                setuserdataM([...udata])
        })()

    }, [value1]);
    useEffect(() => {
        (async () => {
            let udata = await getData()
            if (udata.length != 0)
                setuserdataM([...udata])
        })()

    }, []);




    /**********************************GOOGLE API********************************************/
    //get place details : no proper details
    const searchPlaces = (searchplace) => {
        const apiURL = "https://maps.googleapis.com/maps/api/place/details/json?key=" + API_KEY
        const searchURL = apiURL + "&place_id=" + searchplace + "&fields=name%2Crating%2Cformatted_address%2Cgeometry"
        console.log(searchURL)

        fetch(searchURL)
            .then(response => response.json())
            .then(results => {
                let placedetails = results
                // console.log("PLACEDETAILS:" + placedetails.result.name)
                let sp = placedetails.result.name;

                setplacename(sp)
                getContents()
            })
    }

    /**********************************WIKIPEDIA API********************************************/

    // wikipedia stuff
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
    }

    /****************************************FIREBASE********************************************/

    //save the goal in database 
    const saveData = async () => {
        // W11C2A1 TODO: save data to firestore0
        const docRef = await addDoc(collection(db, "goals"), {

            category: category,
            date: value,
            goaltype: "Y",
            id: props.route.params.data.email,
            todo: placename
        });
    }
    const getData = async () => {
        const docRef = collection(db, "goals");
        const queryString = query(docRef, where("date", "==", value1), where("goaltype", "==", "Y"), where("category", "==", category), where("id", "==", email))
        const docSnap = await getDocs(queryString)
        // console.log("No of records for " + email + " of goal type " + goaltype + " and category " + category + " is " + docSnap.size)

        let goalArray = []
        docSnap.forEach((doc) => {
            let goalObject = {
                id: doc.data().id,
                date: doc.data().date,
                todo: doc.data().todo,
                name: doc.data().name,
            }
            goalArray.push(goalObject)
        });
        return goalArray;

    }



    return (
        <View style={styles.container}>
            <ImageBackground source={homepic} resizeMode="cover" style={styles.image}>
                <Text style={styles.header1}> Add Goals </Text>
                <View style={styles.SearchDestination}>
                    <GooglePlacesAutocomplete
                        placeholder='Search'
                        onPress={(data, details = null) => {
                            console.log(details);
                            setplaceid(data.place_id)
                        }}
                        query={{
                            key: API_KEY,
                            language: 'en',
                        }}
                    />

                    <Button
                        style={styles.button}
                        title="Search"
                        onPress={() => searchPlaces(placeid)}
                    />
                    <View>
                        {/* <HTML source={{ html: contents }} /> */}

                    </View>
                </View>

                
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}

                    />
                    <Button
                        title="Add "
                        onPress={() => {
                            saveData()
                        }
                        } />
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>
                    <Text style={styles.header1}></Text>

                    <Text style={styles.header1}> View  goals </Text>
                    <DropDownPicker
                        open={open1}
                        value={value1}
                        items={items1}
                        setOpen={setOpen1}
                        setValue={setValue1}
                        setItems={setItems1}
                    />

                    {
                        userdataM &&
                        <FlatList
                            contentContainerStyle={styles.flatlist}
                            data={userdataM}
                            renderItem={({ item }) =>
                                <GoalsPanel
                                    {...item}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
            </ImageBackground>
        </View>

    )
}

function GoalsPanel(props) {
    return (
        <View style={styles.flatlist}>
            <Display todo={props.todo} />
        </View>
    )
}


function Display(props) {
    return (
        <Text style={styles.status}>{props.todo}</Text>
    )
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
        // paddingTop: 50
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
        flexDirection: "col",
        justifyContent: 'space-between',
        alignItems: 'top',
        color: 'gray',
        width: '80%',
        marginTop: 5,
        marginBottom: 5,
    },
    SearchDestination: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'top',
        color: 'gray',
        width: '70%',
        marginTop: 5,
        marginBottom: 5,
    },
    SearchDestination1: {
        flexDirection: "row",
        justifyContent: 'space-between',
        alignItems: 'top',
        color: 'gray',
        width: '52%',
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
    },

    header1: {
        lineHeight: 34,
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',

    },
    subheader: {
        lineHeight: 34,
        fontSize: 15,
        color: "white",
        fontWeight: 'bold',

    },
    goallist: {
        lineHeight: 34,

    },
    flatlist: {
        width: "80%",
        // backgroundColor:'pink',
        alignItems: 'left',

    },
    status: {
        lineHeight: 34,
        fontSize: 15,
        color: "white",
    }

});




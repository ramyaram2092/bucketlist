
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

export function MonthlyGoals(props) {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState('January');
    const [items, setItems] = useState([
        { label: 'January', value: 'January' },
        { label: 'February', value: 'February' },
        { label: 'March', value: 'March' },
        { label: 'April', value: 'April' },
        { label: 'May', value: 'May' },
        { label: 'June', value: 'June' },
        { label: 'July', value: 'July' },
        { label: 'September', value: 'September' },
        { label: 'October', value: 'October' },
        { label: 'November', value: 'November' },
        { label: 'December', value: 'December' },

    ]);
    const [placeid, setplaceid] = useState()
    const [placename, setplacename] = useState()
    const [category, setcategory] = useState()
    const [email,setemail]=useState()

    const [placedetails, setplacedetails] = useState([])
    const [contents, setContents] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [userdataM, setuserdataM] = useState([])


    useEffect(()=>{
        setcategory(props.route.params.data.category)
        setemail(props.route.params.data.email)


    },[])

    useEffect(() => {
        (async () => {
            let udata = await getData()
            if (udata.length != 0)
                setuserdataM([...udata])
        })()

    }, [value]);
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
                console.log("PLACEDETAILS:" + placedetails.result.name)
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
            goaltype: "M",
            id: props.route.params.data.email,
            todo: placename
        });
    }

    const getData = async () => {
        const docRef = collection(db, "goals");
        const queryString = query(docRef, where("date", "==", value), where("goaltype", "==", "M"), where("category", "==", category),where("id", "==", email))
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

                <View>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}

                        // theme="DARK"
                    // multiple={false}
                    // mode="BADGE"
                    // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                    />
                    <Button
                        title="Add to your Monthly goal "
                        onPress={() => {
                            // console.log("Place to add:"+placename)
                            // console.log("Month to add :"+value) 
                            saveData()
                        }
                        } />

                    <Text style={styles.header1}> Select the month to view your goals </Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={items}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setItems}

                        // theme="DARK"
                    // multiple={true}
                    // mode="BADGE"
                    // badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                    />

                    {/* <Text> Data is pulled from the database and displayed here </Text> */}
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
                </View>
            </ImageBackground>
        </View>

    )
}

function GoalsPanel(props) {
    return (
        <View style={styles.panelAdd}>
            <View style={styles.text1}>
                <Display todo={props.todo} />
            </View>

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
        justifyContent: 'space-between',
        alignItems: 'top',
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
    },

    header1: {
        lineHeight: 34,
        fontSize: 20,
        color: "white",
        fontWeight: 'bold',
        justifyContent: "center",
        textAlign: "center",


    },

});



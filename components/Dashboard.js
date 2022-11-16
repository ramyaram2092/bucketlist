
import { RefreshControl, SafeAreaView, ScrollView, StyleSheet, Text, View, ImageBackground, Button, FlatList, Linking } from 'react-native';
import homepic from '../assets/home_2.jpg'
import { useIsFocused } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs, query, where } from "firebase/firestore";


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

export function Dashboard({ route, navigation }) {
    // use states
    const [month, setMonth] = useState()
    const [year, setYear] = useState()
    const [email, setemail] = useState()
    const [name, setname] = useState()

    const [userdataM, setuserdataM] = useState([])
    const [userdataY, setuserdataY] = useState([])
    const [restaurantsM, setrestaurantsM] = useState([])
    const [restaurantsY, setrestaurantsY] = useState([])
    const isFocused = useIsFocused()

    //use effect
    useEffect(() => {
        console.log("Focused status" + isFocused)


        navigation.addListener('focus', () => {
            if (month != null && year != null) updateGoals()
            //Put your Data loading function here instead of my loadData()
        });

        setemail(route.params.user.email)
        setname(route.params.user.name)
        console.log("************" + email + "***********" + name)
        const d = new Date();
        let m = d.getMonth() + 1;
        let y = d.getFullYear();
        setMonth(checkMonthName(m))
        setYear(y)
    }, []);

    const updateGoals = async () => {
        console.log("Coming here")
        let udata = await getData("M", "D")
        if (udata.length != 0)
            setuserdataM([...udata])
        let rdata = await getData("M", "R")
        if (rdata.length != 0)
            setrestaurantsM([...rdata])

    }


    useEffect(() => {
        (async () => {
            let udata = await getData("M", "D")
            if (udata.length != 0)
                setuserdataM([...udata])
            let rdata = await getData("M", "R")
            if (rdata.length != 0)
                setrestaurantsM([...rdata])

        })()

    }, [month]);

    useEffect(() => {
        (async () => {
            let udata = await getData("Y", "D")
            if (udata.length != 0)
                setuserdataY([...udata])
            let rdata = await getData("Y", "R")
            if (rdata.length != 0)
                setrestaurantsY([...rdata])

        })()
    }, [year]);


    //functions
    checkMonthName = (month) => {
        var monthName;
        if (month == 1) monthName = "January"
        else if (month == 2) monthName = "February"
        else if (month == 3) monthName = "March"
        else if (month == 4) monthName = "April"
        else if (month == 5) monthName = "May"
        else if (month == 6) monthName = "June"
        else if (month == 7) monthName = "July"
        else if (month == 8) monthName = "August"
        else if (month == 9) monthName = "September"
        else if (month == 10) monthName = "October"
        else if (month == 11) monthName = "November"
        else if (month == 12) monthName = "December"
        return monthName;
    }


    const getData = async (goaltype, category) => {
        const docRef = collection(db, "goals");
        const goalTime = goaltype == "M" ? month : year.toString()
        console.log("goalTime:" + goalTime + "goalType:" + goaltype + "category:" + category)
        if (goalTime != null) {
            const queryString = query(docRef, where("date", "==", goalTime), where("goaltype", "==", goaltype), where("category", "==", category), where("id", "==", email))
            const docSnap = await getDocs(queryString)
            console.log("No of records for " + email + " of goal type " + goaltype + " and category " + category + " is " + docSnap.size)

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
    }


    //UI render
    return (
        <SafeAreaView style={styles.container}>
            {/* <Text>Pull down to see RefreshControl indicator</Text> */}
            <View style={styles.home}>
                <ImageBackground source={homepic} resizeMode="cover" style={styles.image}>
                    <Text style={styles.header1}> Welcome Back {name} </Text>
                    <View style={styles.header1Container}>
                        <Text style={styles.header2}> {month} Goals </Text>
                        <Button style={styles.headerbutton}
                            title="Refresh"
                            onPress={() => {
                                updateGoals()
                            }}
                        />
                    </View>

                    <View style={styles.header2Container}>
                        <Text style={styles.header2}> Places to visit </Text>
                        <Button style={styles.headerbutton}
                            title="view/edit"
                            onPress={() => {
                                let data = {
                                    email: email,
                                    category: 'D'
                                }
                                navigation.navigate('MonthlyGoals', { 'data': data })
                            }}
                        />
                    </View>



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
                    <View style={styles.header2Container}>
                        <Text style={styles.header2}> Restaurants to try </Text>
                        <Button style={styles.headerbutton}
                            title="view/edit"
                            onPress={() => {
                                let data = {
                                    email: email,
                                    category: 'R'
                                }
                                navigation.navigate('MonthlyGoals', { 'data': data })
                            }}
                        />
                    </View>
                    {
                        restaurantsM &&
                        <FlatList
                            contentContainerStyle={styles.flatlist}
                            data={restaurantsM}
                            renderItem={({ item }) =>
                                <GoalsPanel
                                    {...item}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                    <Text style={styles.header2}> {year} Goals </Text>


                    <View style={styles.header2Container}>
                        <Text style={styles.header2}> Places to visit </Text>
                        <Button style={styles.headerbutton}
                            title="View All/Edit"
                            onPress={() => {
                                let data = {
                                    email: email,
                                    category: 'D'
                                }
                                navigation.navigate('YearlyGoals', { 'data': data })
                            }}
                        />
                    </View>
                    {
                        userdataY &&
                        <FlatList
                            contentContainerStyle={styles.flatlist}
                            data={userdataY}
                            renderItem={({ item }) =>
                                <GoalsPanel
                                    {...item}
                                />
                            }
                            keyExtractor={(item, index) => index.toString()}
                        />
                    }
                    <View style={styles.header2Container}>
                        <Text style={styles.header2}> Restaurants to try </Text>
                        <Button style={styles.headerbutton}
                            title="View All/Edit"
                            onPress={() => {
                                let data = {
                                    email: email,
                                    category: 'R'
                                }
                                navigation.navigate('YearlyGoals', { 'data': data })
                            }}
                        />
                    </View>
                    {
                        restaurantsY &&
                        <FlatList
                            contentContainerStyle={styles.flatlist}
                            data={restaurantsY}
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
        </SafeAreaView>
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
        flex: 1
    },
    image: {
        flex: 1,
        // justifyContent: "center",
        opacity: 2.0,

    },
    text: {
        color: "white",
        fontSize: 20,
        lineHeight: 34,
        fontWeight: "bold",
        textAlign: "top",
        justifyContent: "center",

        // flex: 6,
        // flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // flexWrap: 'wrap',
        // padding: 3,
        // marginVertical: 5,  
    },
    text1: {
        color: "white",
        fontSize: 18,
        lineHeight: 34,
        justifyContent: "left",

        textAlign: "left",
        // backgroundColor: "#000000c0",
    },
    home: {

        flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        justifyContent: 'center',

    },
    header1: {
        lineHeight: 30,
        fontSize: 22,
        color: "white",
        // fontWeight: 'bold',
        justifyContent: "center",
        textAlign: "center",


    },

    header2Container: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        color: 'gray',
        width: '100%',
        marginTop: 5,

    },
    header1Container: {
        flexDirection: "row",
        justifyContent: 'flex-end',
        color: 'gray',
        width: '100%',
        marginTop: 5,

    },
    headerbutton: {
        justifyContent: "end"

    },

    header2: {
        flex: 1,
        lineHeight: 34,
        fontSize: 18,
        color: "white",
        fontWeight: 'bold',
    },


    button: {
        // flex: 1,
        // padding: 3,
        // margin: 5,
        // fontSize: 10,
        // fontcolor: "black",
        // backgroundColor: "#000000c0",

    },
    flatlist: {
        width: "80%",
        // backgroundColor:'pink',
        alignItems: 'left',

    },
    panelAdd: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '65%',
        // borderWidth: 1,
        borderColor: 'white',
        // borderRadius: 1,
        padding: 3,
        marginVertical: 5,
        marginHorizontal: 0,
    }


});


import { StyleSheet, Text, View, ImageBackground, Button, FlatList,Linking } from 'react-native';
import homepic from '../assets/home_2.jpg'
import React, { useEffect, useState } from 'react';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, doc, getDoc, getDocs, setDoc, deleteDoc, query, where, orderBy } from "firebase/firestore";


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

export function Home(props) {
    // use states
    const [month, setMonth] = useState()
    const [year, setYear] = useState()

    const [userdataM, setuserdataM] = useState([])
    const [userdataY, setuserdataY] = useState([])
    const[restaurantsM,setrestaurantsM]=useState([])
    const[restaurantsY,setrestaurantsY]=useState([])



    //use effect
    useEffect(() => {
        const d = new Date();
        let m = d.getMonth() + 1;
        let y = d.getFullYear();
        setMonth(checkMonthName(m))
        setYear(y)
    }, []);

    useEffect(() => {
        (async()=>{
            let udata= await getData("M","D")
            if(udata.length!=0)
                setuserdataM([...udata])
            let rdata= await getData("M","R")
            if(rdata.length!=0)
                setrestaurantsM([...rdata])
            
    })()
    }, [month]);

    useEffect(() => {
        (async()=>{
            let udata=await getData("Y","D")
            if(udata.length!=0)
                setuserdataY([...udata])
            let rdata= await getData("Y","R")
            if(rdata.length!=0)
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


    const getData = async (goaltype,category) => {
        const docRef = collection(db, "goals");
        const goalTime = goaltype == "M" ? month : year.toString()
        console.log("goalTime:"+goalTime +"goalType:"+goaltype+"category:"+category)
        if (goalTime != null) {
            const queryString = query(docRef, where("date", "==", goalTime), where("goaltype", "==", goaltype),where("category", "==", category))
            const docSnap = await getDocs(queryString);
            let goalArray = []
            docSnap.forEach((doc) => {
                let goalObject = {
                    id:   doc.data().id,
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
        <View style={styles.home}>
            <ImageBackground source={homepic} resizeMode="cover" style={styles.image}>
                <Text style={styles.text}> Hey there Welcome Back </Text>
                <Text style={styles.text}> This Month : {month} </Text>
                <Text style={styles.text1}> Places to visit </Text>
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
                <Text style={styles.text1}> Restaurants to try </Text>
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
                <Text style={styles.text}> This year : {year} </Text>

                <Text style={styles.text1}> Places to visit </Text>
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
                <Text style={styles.text1}> Restaurants to try </Text>
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

    )

}


function GoalsPanel(props) {
    return (
        <View style={styles.panelAdd}>
            <View style={styles.text1}>
                <Display todo={props.todo} />
            </View>
            <Button
                title="Edit"
                onPress={() => { }}
            />
        </View>
    )
}


function Display(props) {
    return (
        <Text style={styles.status}>{props.todo}</Text>
    )
}


const styles = StyleSheet.create({
    image: {
        flex: 1,
        // justifyContent: "center",
        opacity: 2.0,

    },
    text: {
        color: "white",
        fontSize: 20,
        lineHeight: 64,
        fontWeight: "bold",
        textAlign: "top",
        justifyContent: "center",

        // flex: 6,
        // flexDirection: 'column',
        // justifyContent: 'flex-start',
        // alignItems: 'flex-start',
        // flexWrap: 'wrap',
        // padding: 3,
        // marginVertical: 5,  
      },
    text1: {
        color: "white",
        fontSize: 15,
        lineHeight: 34,
        justifyContent: "center",

        textAlign: "center",
        // backgroundColor: "#000000c0",
    },
    home: {
        flex: 1,
        // justifyContent: 'space-between',
        // alignItems: 'center',
        justifyContent: 'center',
    },
    header: {
        fontSize: 20,
        fontWeight: 'bold',
    },
    button: {
        flex: 1,
        padding: 3,
        margin: 5,
        fontcolor: "black",
        backgroundColor: "#000000c0",

    },
    flatlist: {
        width: "80%",
        // backgroundColor:'pink',
        alignItems: 'center',

    },
   panelAdd:{
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

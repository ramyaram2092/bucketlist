import homepic from '../assets/home_2.jpg'

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs,query,where } from "firebase/firestore";



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




export function Login(props) {
    //state variables
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [isLoading, setisLoading] = useState(false)
    const [userInfo, setUserInfo] = useState([])
    const [dpname, setdpname] = useState('')



    // register user function 
    const userlogin = async () => {
        if (email === '' ||password === '') {
            Alert.alert(' Enter all details!')
        }
        else {
            const colRef = collection(db, "userdetails");
            const queryString = query(colRef, where("email", "==", email),where("password","==",password))
            const docSnap = await getDocs(queryString);
            if (docSnap.size == 0) {
                Alert.alert('Invalid credentials!')
            }
            else {
                let newUserInfo = []
                docSnap.forEach((doc) => {
                    let newUser = {
                        name: doc.data().displayname,
                        email: doc.data().email
                    }
                    setdpname( doc.data().displayname)
                    newUserInfo.push(newUser)
                })
                setUserInfo(newUserInfo)
                setisLoading(true)

            }
        }
    }


//use effect : 


useEffect(() => {
    if(props.route.params)
    {
        setemail(props.route.params.userdetails.email)
        setpassword(props.route.params.userdetails.password)
    }

    if (isLoading) {
        console.log("display name:"+ dpname)

        props.navigation.navigate('Dashboard',{'name':dpname})
    }

}, [isLoading])




return (

    <View style={styles.container}>
        <TextInput
            style={styles.inputStyle}
            placeholder="Email"
            value={email}
            onChangeText={(val) => setemail(val)}
        />
        <TextInput
            style={styles.inputStyle}
            placeholder="Password"
            value={password}
            onChangeText={(val) => setpassword(val)}
            maxLength={15}
            secureTextEntry={true}
        />
        <Button
            color="#3740FE"
            title="Signin"
            onPress={() => userlogin()}
        />
        <Text
            style={styles.loginText}
            onPress={() => props.navigation.navigate('Signup')}>
            Don't have account? Click here to signup
        </Text>
    </View>
)
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: 35,
        backgroundColor: '#fff'
    },
    inputStyle: {
        width: '100%',
        marginBottom: 15,
        paddingBottom: 15,
        alignSelf: "center",
        borderColor: "#ccc",
        borderBottomWidth: 1
    },
    loginText: {
        color: '#3740FE',
        marginTop: 25,
        textAlign: 'center'
    },
    preloader: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        position: 'absolute',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff'
    }
});
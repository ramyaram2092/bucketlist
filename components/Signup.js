import homepic from '../assets/home_2.jpg'

import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TextInput, Button, Alert } from 'react-native';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";


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

export function Signup(props) {
    //state variables
    const [dpname, setdpname] = useState()
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const [isLoading, setisLoading] = useState(false)

    // register user function 
    const registeruser = async () => {
        if (email === '' || password === '' || dpname === '') {
            Alert.alert('Enter details to signup!')
        }
        else {
            setisLoading(true)
            const docRef = await addDoc(collection(db, "userdetails"), {

                displayname: dpname,
                email: email,
                password: password,

            });
        }
    }

    //use effect : 
    useEffect(() => {
        if (isLoading) {
            props.navigation.navigate('Login')
        }

    }, [isLoading])

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.inputStyle}
                placeholder="Name"
                value={dpname}
                onChangeText={(val) => setdpname(val)}
            />
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
                title="Signup"
                onPress={() => registeruser()}
            />
            <Text
                style={styles.loginText}
                onPress={() => props.navigation.navigate('Login')}>
                Already Registered? Click here to login
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
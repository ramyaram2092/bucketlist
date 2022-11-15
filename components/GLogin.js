import React, { useEffect } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, signInWithCredential } from 'firebase/auth';
import { StyleSheet, Text, View, Button, ImageBackground } from 'react-native';
import homepic from '../assets/home_2.jpg'


// Your web app's Firebase configuration
initializeApp({
    apiKey: "AIzaSyBW3PwVuNmN72ubv4lAduvbLUEdXwnN6iU",
    authDomain: "myblist.firebaseapp.com",
    projectId: "myblist",
    storageBucket: "myblist.appspot.com",
    messagingSenderId: "671833919077",
    appId: "1:671833919077:web:3a02e8b8f6ba6facb8c08c"
});



export function Login(props) {

    const [request, response, promptAsync] = Google.useIdTokenAuthRequest(
        {
            clientId: '671833919077-7rpmpd0c7qran0prl6ij7cd5jkn0psb5.apps.googleusercontent.com',
        },
    );

    useEffect(() => {
        console.log(response)
        if (response?.type === 'success') {
            const { id_token } = response.params;
            const auth = getAuth();
            const credential = GoogleAuthProvider.credential(id_token);
            signInWithCredential(auth, credential);
        }
    }, [response]);

    return (
        <View style={styles.home}>
            <ImageBackground source={homepic} resizeMode="cover" style={styles.image}>
            <Text style={styles.text}> Welcome to My Bucket List </Text>

                <Button style={styles.button}
                    disabled={!request}
                    title="Google Login"
                    onPress={() => {
                        promptAsync();
                        props.function();
                    }}
                />
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
   
    image: {
        flex: 1,
        justifyContent: "center",
        alignContent:"top",
        opacity: 2.0,
    },
    text:{
        color: "#2314DB",
        fontSize: 20,
        lineHeight: 64,
        fontFamily: "times",
        fontWeight: "italic",
        textAlign: "top",
        justifyContent: "top",
        alignContent:"center"
    },
    button: {
        fontcolor:"black",
    },
    home: {
        flex: 1,
        justifyContent: 'center',

}
}
);
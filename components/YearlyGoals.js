
import { StyleSheet, View, TextInput, Button, Text, ImageBackground } from 'react-native';
// import DropDownPicker from 'react-native-dropdown-picker';
import React, { useEffect, useState } from 'react';
// import MonthPicker from 'react-native-month/-year-picker';


import homepic from '../assets/home_2.jpg'


export function YearlyGoals() {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const[years,setyears]=useState([]);
    // // const [items, setItems] = useState([
    // //     { label: 'January', value: 'jan' },
    // //     { label: 'February', value: 'feb' },
    // //     { label: 'March', value: 'march' },
    // //     { label: 'April', value: 'april' },

    // //     { label: 'May', value: 'may' },

    // //     { label: 'June', value: 'june' },

    // //     { label: 'July', value: 'july' },

    // //     { label: 'September', value: 'sept' },

    // //     { label: 'October', value: 'oct' },

    // //     { label: 'Novmeber', value: 'nov' },

    // // ]);


    let minOffset = 0, maxOffset = 10;
    let thisYear = (new Date()).getFullYear();
    let allYears = [];
    for (let x = 0; x <= maxOffset; x++) {
        allYears.push(thisYear - x)
    }
    let abc=[]
    allYears.forEach((item,id)=>{
        let yr= {
            value:id,
            label:item
        }
        abc.push(yr)
    });
    // setyears([abc])











    return (
        <View style={styles.container}>
            <ImageBackground source={homepic} resizeMode="cover" style={styles.image}>
                <View style={styles.panelAdd}>
                    <Text>Add new goal</Text>

                    <TextInput
                        placeholder="Search Keywords"
                        onChangeText={(_) => { }}
                        value="Sandiego"
                    />
                    {/* <DropDownPicker
                        open={open}
                        value={years}
                        items={allYears}
                        setOpen={setOpen}
                        // setValue={setValue}
                        // setItems={setyears}

                        theme="DARK"
                        multiple={true}
                        mode="BADGE"
                        badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                    /> */}
                    {/* <select>
                        {yearList}
                    </select> */}


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



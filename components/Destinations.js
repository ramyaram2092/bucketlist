// import { StyleSheet, View, TextInput, Button, Text ,ImageBackground} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {SearchDestination} from './SearchDestinations.js'
import {MonthlyGoals} from './MonthlyGoals.js'
import {YearlyGoals} from './YearlyGoals.js'


export function Destination() {
    const TopTab = createMaterialTopTabNavigator();
    return (
        <TopTab.Navigator initialRoute="Search">
            <TopTab.Screen
                name="Search"
                component={SearchDestination}
            />
            <TopTab.Screen
                name="Monthly "
                component={MonthlyGoals}
            />
            <TopTab.Screen
                name="Yearly "
                component={YearlyGoals}
            />
        </TopTab.Navigator>

    )

}






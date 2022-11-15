// import { StyleSheet, View, TextInput, Button, Text ,ImageBackground} from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';
import { SearchDestination } from './SearchDestinations.js'
import { MonthlyGoals } from './MonthlyGoals.js'
import { YearlyGoals } from './YearlyGoals.js'

const TopTab = createMaterialTopTabNavigator();

export function Destination() {
    return (
        <TopTab.Navigator initialRoute="Search">
            <TopTab.Screen
                name="Search Destinations"
                component={SearchDestination}
            />
            <TopTab.Screen
                name="Monthly Goal"
                component={MonthlyGoals}
            />
            <TopTab.Screen
                name="Yearly Goal"
                component={YearlyGoals}
            />
        </TopTab.Navigator>

    )

}
// const Stack = createNativeStackNavigator();

// export function Destination(props) {
//     return (
//             <Stack.Navigator initialRoute="Search">
//                 <Stack.Screen
//                     name="Search"
//                     component={SearchDestination}
//                 />
//                 <Stack.Screen
//                     name="Monthly "
//                     component={MonthlyGoals}
//                 />
//                 <Stack.Screen
//                     name="Yearly "
//                     component={YearlyGoals}
//                 />
//             </Stack.Navigator>


//     )

// }




import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {createNativeStackNavigator} from '@react-navigation/native-stack';

import {Home} from './components/Home.js'
import {Destination} from './components/Destinations.js'
import {Restaurants} from './components/Restaurants.js' 
// import { SearchDestination } from './components/SearchDestinations.js'
// import { MonthlyGoals } from './components/MonthlyGoals.js'
// import { YearlyGoals } from './components/YearlyGoals.js'





const Tab = createBottomTabNavigator();
// const Stack = createNativeStackNavigator();

export default function App() {
 
  return (
   
    <NavigationContainer>
      <Tab.Navigator initialRoute="Home">
        <Tab.Screen
          name="My BLists"
          component={Home}
        />
        <Tab.Screen
          name="My Destinations"
          component={Destination}
        />
        <Tab.Screen
          name="My Restaurants"
          component={Restaurants}
        />
      </Tab.Navigator>
     </NavigationContainer>

  )
}



// function Destination() {
//     return (
//           // <NavigationContainer>
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
//                 // </NavigationContainer>



//     )

// }



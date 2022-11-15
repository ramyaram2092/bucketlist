// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {Home} from './Home.js'
import {Destination} from './Destinations.js'
import {Restaurants} from './Restaurants.js' 
import { Dashboard } from './Dashboard.js';


const Tab = createBottomTabNavigator();

export function BListHome(props) {
 
  return (
      <Tab.Navigator initialRoute="Dashboard">
        <Tab.Screen
          name="Dashboard"
          component={Dashboard}
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
  )
}







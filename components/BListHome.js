// import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import {Home} from './Home.js'
import {Destinations} from './Destinations.js'
import {Restaurants} from './Restaurants.js' 
import { Dashboard } from './Dashboard.js';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


const Stack = createNativeStackNavigator();

export function BlistHome(props)
{
  return(
    <Stack.Navigator
        initialRouteName="Dashboard"
        screenOptions={{
          // headerTitleAlign: 'center',
          // headerStyle: {
          //   backgroundColor: '#3740FE',
          // },
          // headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'My Bucket List Dashboard' }}
        />
        <Stack.Screen
          name="Destinations"
          component={Destinations}
          options={{
            title: 'My Destinations',
            headerLeft: null
          }}

        />
        <Stack.Screen
          name="Restaurants"
          component={Restaurants}
          options={{
            title: 'My Restaurants',
            headerLeft: null
          }
          }
        />
      </Stack.Navigator>
  )
}




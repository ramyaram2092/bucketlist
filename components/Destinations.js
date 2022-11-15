import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SearchDestination } from './SearchDestinations.js'
import { MonthlyGoals } from './MonthlyGoals.js'
import { YearlyGoals } from './YearlyGoals.js'



const Stack = createNativeStackNavigator();

export function Destinations(props)
{
  return(
    <Stack.Navigator
        initialRouteName="SearchDestinations"
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
          name="SearchDestinations"
          component={SearchDestination}
          options={{ title: 'My Destinations' }}
        />
        <Stack.Screen
          name="MonthlyGoals"
          component={MonthlyGoals}
          options={{
            title: 'My Monthly Goals',
            headerLeft: null
          }}

        />
        <Stack.Screen
          name="YearlyGoals"
          component={YearlyGoals}
          options={{
            title: 'My Yearly Goals',
            headerLeft: null
          }
          }
        />
      </Stack.Navigator>
  )
}




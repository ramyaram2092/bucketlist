import * as React from 'react';
import { Button } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Login } from './components/Login.js';
import { Signup } from './components/Signup.js';
import { Dashboard } from './components/Dashboard.js';
import { SearchDestination } from './components/SearchDestinations.js'
import { MonthlyGoals } from './components/MonthlyGoals.js'
import { YearlyGoals } from './components/YearlyGoals.js'


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Signup"
        screenOptions={{
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: '#3740FE',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}>
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ title: 'Signup' }}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{
            title: 'Login',
            headerLeft: null
          }}

        />

        <Stack.Screen
          name="Dashboard"
          component={Dashboard}
          options={{ title: 'My Bucket List' ,
          headerRight: () => (
            <Button
              onPress={() => navigation.navigate('Signup')}
              title="Logout"
              color="#fff"
            />
          ),}}
        />
        {/* <Stack.Screen
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
          } /> */}
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
    </NavigationContainer>
  );
}
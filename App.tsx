import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {Button, Pressable, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import RecentExpenses from './Screens/RecentExpenseScreen';
import AllExpenses from './Screens/AllExpenseScreen';
import ManageExpenses from './Screens/ManageExpenseScreen';
import {GlobalColors} from './constants/colors';
import IconButton from './Components/UI/Buttons/IconButton';
import {ExpensesContextProvider} from './Store/Exp-Context';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();

function ExpensesOverView() {
  return (
    <BottomTab.Navigator
      screenOptions={({navigation}) => ({
        headerStyle: {backgroundColor: GlobalColors.PrimaryNavigator},
        headerTintColor: GlobalColors.primaryWhite,
        tabBarStyle: {backgroundColor: GlobalColors.PrimaryNavigator},
        tabBarActiveTintColor: '#202004ff',
        headerRight: ({tintColor}) => (
          <IconButton
            name="add"
            size={30}
            color={tintColor}
            onPress={() => navigation.navigate('ManageExpenses')}
          />
        ),
      })}>
      <BottomTab.Screen
        name="AllExpenses"
        component={AllExpenses}
        options={{
          title: 'All Expenses',

          tabBarLabel: 'All',
          tabBarIcon: ({color, size}: any) => (
            <Icon name="calendar" size={size} color={color} />
          ),
        }}
      />
      <BottomTab.Screen
        name="RecentExpenses"
        component={RecentExpenses}
        options={{
          title: 'Recent Expenses',
          tabBarLabel: 'Recent',
          tabBarIcon: ({color, size}: any) => (
            <Icon name="hourglass" size={size} color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function App(): React.JSX.Element {
  return (
    <>
      <ExpensesContextProvider>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {backgroundColor: GlobalColors.PrimaryNavigator},
              headerTintColor: 'white',
            }}>
            <Stack.Screen
              name="ExpensesOverView"
              component={ExpensesOverView}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="ManageExpenses"
              component={ManageExpenses}
              options={{
                presentation: 'modal',
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ExpensesContextProvider>
    </>
  );
}

const styles = StyleSheet.create({});

export default App;

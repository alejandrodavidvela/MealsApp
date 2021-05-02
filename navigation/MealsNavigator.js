import React from 'react'
import { 
    createAppContainer, 
    createBottomTabNavigator, 
    createStackNavigator, 
    createDrawerNavigator
} from 'react-navigation';
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen'
import FiltersScreen from '../screens/FiltersScreen'
import { Platform} from 'react-native'
import Colors from '../constants/Colors'
import {Ionicons} from '@expo/vector-icons'
import {createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'

const defaultStackNavOptions = {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : ''
        },
        headerTintColor: Platform.OS === 'android' ? 'white' : Colors.primaryColor,
        headerTitle: 'A Screen'
    }

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    MealDetail: MealDetailScreen
}, {defaultNavigationOptions: defaultStackNavOptions})

const FavNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    MealDetail: MealDetailScreen
}, {defaultNavigationOptions: defaultStackNavOptions})


const tabScreenConfig = {
    Meals: {screen: MealsNavigator, navigationOptions: {
        tabBarIcon: (tabInfo) => {
            return (
                <Ionicons 
                    name='ios-restaurant' 
                    size={25} 
                    color={tabInfo.tintColor}/>)
        },
        tabBarColor: Colors.primaryColor
    }},
    Favorites: {
        screen: FavNavigator, 
        navigationOptions: {
        // tabBarLabel: 'Favorites!',
        tabBarIcon: (tabInfo) => {
            return (
                <Ionicons 
                name='ios-star' 
                size={25} 
                color={tabInfo.tintColor}
                />
            )
        },
        tabBarColor: Colors.accentColor
    }}
}

const MealsFavTabNavigator = 
    Platform.OS === 'android' 
        ? createMaterialBottomTabNavigator(tabScreenConfig, {
            activeTintColor: 'white',
            shifting: true
        }) 
        : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions:{
        activeTintColor: Platform.OS === 'android' ? 'red' : Colors.accentColor
    }
})

const FiltersNavigator =  createStackNavigator({
    Filters: FiltersScreen
})

const MainNavigator = createDrawerNavigator({
    MealsFavs: MealsFavTabNavigator,
    Filters: FiltersNavigator
})

export default createAppContainer(MainNavigator);
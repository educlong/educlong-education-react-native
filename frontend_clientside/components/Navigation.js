/**
 * StAuth10244: I Nguyen Duc Long, 000837437 certify that this material is my original work. 
 * No other person's work has been used without due acknowledgement. I have not made my work available to anyone else.
 * @returns 
 */
/**
 * @date April 15, 2022
 * @author DUC LONG NGUYEN (Paul)
 * @returns 
 */

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import BootstrapStyleSheet from 'react-native-bootstrap-styles'
import Courses_ from './courses/Courses';
import Home from './home/Home';
import { useEffect, useState } from 'react';
import { searchAPI } from './Models';
import { Text, View } from 'react-native';

const Tab = createBottomTabNavigator();
const home="Home";
const courses="Courses";
const favoriteCourses="Favorite";
const bootstrapStyleSheet = new BootstrapStyleSheet();
const { s, c } = bootstrapStyleSheet;


export default function Navigation(props) {
  const [loading, setLoading] = useState(true);
  const [team, setTeam] = useState([])
  useEffect(()=>{
    searchAPI('Team', setTeam, setLoading)  //get data from server side (backend)
  },[])
  if(loading){
    return <View><Text>Loading...</Text></View>
  }
  return (
      <NavigationContainer style={[s.body]}>
        <Tab.Navigator 
        initialRouteName={home} 
        screenOptions={({route})=>({
          tabBarIcon: ({focused, color, size})=>{
            let iconName;
            let rn = route.name;
            if(rn===home){
              iconName=focused?"home":"home-outline"
            }
            else if(rn===courses){
              iconName=focused?"list":"list-outline"
            }
            // else if(rn===favoriteCourses){
            //   iconName=focused?"star":"star-outline"
            // }
            return <Ionicons name={iconName} size={size} color={color}/>
          },
        })}
        tabBarOptions={{
          activeTintColor:'tomato',
          inactiveTintColor:'grey',
          activeBackgroundColor: '#e5e5e5',
          labelStyle:{paddingBottom: 5, fontSize: 12},
          style:{height:100, padding: 10},
          tabBarHeight : 80,
        }}
        >
          <Tab.Screen name={home} component={
            ()=><Home courses={props.courses} team={team}/>}/>
          <Tab.Screen name={courses} component={
            ()=><Courses_ courses={props.courses} team={team} isLike={false}/>}/>
          {/* <Tab.Screen name={favoriteCourses} component={
            ()=><Courses_ courses={props.courses} team={team} isLike={true}/>}/> */}
        </Tab.Navigator>
      </NavigationContainer>
  );
}
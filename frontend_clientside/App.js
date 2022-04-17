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

import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { unSubscriber } from './components/FirebaseConfig';
import Navigation from './components/Navigation';

export default function App() {
  //get data from firebase, store them into _courses and load page
  const [loading, setLoading] = useState(true);
  const [_courses, setDataCourses] = useState([])
  useEffect(() => {
      return unSubscriber(setDataCourses, setLoading, 'Courses', ['videos']);
  }, []);
  if(loading){
    return (
      <View>
        <Text>Loading..</Text>
      </View>
    )
  }
  return (
    <Navigation courses={_courses}/>   /**Use Navigation to route for screen */
  );
}
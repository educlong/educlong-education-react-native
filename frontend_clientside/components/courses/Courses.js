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

import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {  ScrollView, StyleSheet, Text, View} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Sections } from "../home/HomeHandle";
import { Footer, Header, s, Team } from "../Models";
import { CourseDetail, Courses } from "./CoursesHandle";

export default function Courses_(props){
    const navigation = useNavigation();
    const [keyCourses, setKeyCourses] = useState('all');
    const [course, setCourse] = useState(null)
    let courses = [];
    if(props.isLike){   //favorites screen
        props.courses.forEach(course => {
            if(course.isLike){
                courses.push(course);
            }
        });
    }
    else{   //courses screen
        courses = props.courses;
    }
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header/>
                {
                    props.isLike ? <View/> :
                    <Sections courses={courses} isWelcome={false}
                    selectedCourses={(selectCourses)=>{setKeyCourses(selectCourses)}}/>
                }
                {
                    courses.length > 0 ? (
                        <Courses
                        courses={courses} 
                        keyCourses={props.isLike ? 'all' : keyCourses}
                        selectedCourse={(_course)=> setCourse(_course)}/>
                    )
                    : 
                    <Text style={[s.mt5,{
                        alignSelf:'center', 
                        fontSize:30, 
                        color:'green',
                        fontStyle:'italic',
                        fontWeight:'bold'
                    }]}>
                        No Data...
                    </Text>
                }
                <Team team={props.team}/>
                <Footer/>
            </ScrollView>
            <CourseDetail
                course={course} 
                setCourse={()=>{setCourse(null)}} 
                courses={courses}
                selectedCourse={(_course)=> setCourse(_course)}/>
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop:0, 
      paddingTop:0
    }
 });
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
import {  ScrollView, StyleSheet} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { categoryCourses, Footer, Header, MenuBar, Team } from "../Models";
import {Banner,  Sections, Quotation, Reasons, Partners, Feedbacks} from './HomeHandle';
import { CourseDetail, Courses } from "../courses/CoursesHandle";

export default function Home(props){
    const navigation = useNavigation();
    let slides = []
    props.courses.forEach(element => {
        if(element._id <= parseInt(categoryCourses(props.courses)))
            slides.push(element);
    });
    const [keyCourses, setKeyCourses] = useState('all');
    const [course, setCourse] = useState(null)
    return(
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <Header/>
                <Banner slides={slides}/>
                <Sections courses={props.courses} isWelcome={true}
                    selectedCourses={(selectCourses)=>{setKeyCourses(selectCourses)}}/>
                <Courses 
                    courses={props.courses} 
                    keyCourses={keyCourses}
                    selectedCourse={(_course)=> setCourse(_course)}/>
                <Quotation/>
                <Partners/>
                <Reasons/>
                <Team team={props.team}/>
                <Feedbacks/>
                <Footer/>
            </ScrollView>
            <CourseDetail
                course={course} 
                setCourse={()=>{setCourse(null)}} 
                courses={props.courses}
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
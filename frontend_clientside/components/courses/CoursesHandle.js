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

import { useEffect, useState } from "react";
import { Button, FlatList, Image, Modal, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import Anticons from 'react-native-vector-icons/AntDesign';
import YoutubePlayer from 'react-native-youtube-iframe'
import { onUpdate } from "../FirebaseConfig";
import { HEIGHT, linkApiThumbnail, s, sizeApiThumbnail, WIDTH } from '../Models';

/**
 * Handling for HOME Component and COURSES Component
 * Components for Course (display a course)
 */
function Course(props){
    let course=props.course;
    return(
        <View>
            <Image style={{width: WIDTH*0.9, height:300, marginLeft:WIDTH*0.02}}
                source={{uri:`${linkApiThumbnail}${course.dataChildrent[0].videoId}${sizeApiThumbnail}`}}/>
            <Text style={[s.textCenter, s.py2, s.mt3, s.mb2,
                {
                    marginHorizontal: 125, 
                    backgroundColor:"#007bff",
                    color:"white",
                    fontWeight:"bold",
                    borderRadius: 20
                }]}>
                {course.type}
            </Text>
            <View style={{width:WIDTH}}>
                <Text style={[s.mx4, s.textCenter, {fontWeight:'bold', fontSize:20}]}>
                    {course.title}
                </Text>
                <Text style={[s.mx5, s.my3, {color:'black', fontSize:15}]}>
                    {course.summary}
                </Text>
                <View  style={[s.rowFlex,{flexDirection:'row'}]}>
                    <Image source={{uri: course.imgAuthor}} 
                    style={
                        [s.ml5, s.mt4, 
                        {
                            width:WIDTH*0.4, 
                            height: HEIGHT*0.2, 
                            borderRadius:100,
                            flex:1
                        }]}
                    />
                    <Text 
                    style={
                        [s.textCenter, 
                        {
                            width: WIDTH*0.43,
                            right:WIDTH*0.02,
                            top:HEIGHT*0.1,
                            flex:1
                        }]}>
                        {course.author}
                    </Text>
                </View>
            </View>
        </View>
    )
}

/**
 * Handling for HOME Component and COURSES Component
 * Components for SearchCourses (a textinput for searching)
 */
function SearchCourses(props){
    return(
        <View style={[s.mb3, {width:WIDTH, height:HEIGHT*0.05, flexDirection:'row'}]}>
            <Anticons name={'search1'} 
                size={40} color={'black'}
                style={{
                    width:WIDTH*0.15, 
                    height: HEIGHT*0.05,
                    flex:1,
                    marginLeft:20
                }}/>
            <TextInput 
                style={[s.ml2, s.px3, {
                    width:WIDTH*0.7, 
                    height:HEIGHT*0.05, 
                    borderColor:'black', 
                    borderWidth:1,
                    fontSize:20,
                    right:WIDTH*0.1,
                    flex:2
                }]} 
                onChangeText={(inputText)=>props.setSearch(inputText)}/>
        </View>
    )
}

/**
 * Handling for HOME Component and COURSES Component
 * Components for Courses (display a list of courses: vertial scroll)
 */
export function Courses(props){
    const keyCourses = props.keyCourses;
    let courses = [];
    let nameCourses = "All Courses";
    let introCourses = "All Courses";
    if(keyCourses!=="all"){
        props.courses.forEach(course => {
            if(keyCourses===course.key){
                nameCourses=course.name;
                introCourses=course.intro;
                courses.push(course);
            }       
        });
    }
    else{
        courses=props.courses;
    }
    const [search, setSearch] = useState('')
    return (
        <View>
            <Text style={[s.mb3, s.textCenter, {fontSize:20, fontWeight:'bold'}]}>{nameCourses}</Text>
            <Text 
            style={[s.mb4, s.mx5, s.textCenter, {fontSize: 15}]}>
                {introCourses+" (Total: "+courses.length+" courses)"}
            </Text>
            <SearchCourses setSearch={setSearch}/>
            <SafeAreaView >
                <ScrollView 
                style={{width:WIDTH, height:HEIGHT*0.98}} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                >
                    {
                        courses.map((course, index)=>(
                            course.title.toLowerCase().trim().includes(search.toLowerCase().trim())
                            ||course.author.toLowerCase().trim().includes(search.toLowerCase().trim())
                            ||search.trim()==='' ?
                            <Pressable key={index} 
                            onPress={()=>{
                                props.selectedCourse(course);
                            }}>
                                <Course course={course}/>
                            </Pressable>
                            : <View key={index}/>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </View>

    );
}

/**
 * Handling for COURSEDETAIL Component
 * Components for Title video
 */
export function TitleVideo(props){    
    return(
        <View style={{width: WIDTH, height: HEIGHT*0.25, flexDirection:'row'}}>
            <View style={{flex: 1}}>
                <Image source={{uri: props.course.imgAuthor}}
                style={[s.ml4, s.mt4,{
                    width: WIDTH*0.3,
                    height: HEIGHT*0.15,
                    borderRadius: 100,
                }]}/>
                <Text style={[s.textCenter, {fontWeight:'bold', width:WIDTH*0.4}]}>
                    {props.course.author}
                </Text>
                <Text style={[s.textCenter, {fontStyle:'italic', width:WIDTH*0.4}]}>
                    {props.course.position}
                </Text>
            </View>
            <View style={{
                flex:2,
                right:0, 
                marginRight: WIDTH*0.05,
                marginLeft: WIDTH*0.4,
                alignSelf:'center'
            }}>
                {/* <Anticons name={'star'} 
                size={30} color={'black'}
                style={[s.ml3, {
                    color: props.course.isLike ? "yellow" : "grey",
                    width:WIDTH*0.2,
                    alignSelf:'center',
                    bottom: 0
                }]} onPress={()=>{
                    onUpdate('Courses',props.course.id)
                }}/> */}
                <Text style={{fontSize:18, fontWeight: 'bold'}}> {props.selectedVideo===null 
                    ? (props.course===null 
                        ? null 
                        : props.course.dataChildrent[0].videoTitle) 
                    : props.selectedVideo.videoTitle} 
                </Text>
            </View>
        </View>
    )
}

/**
 * Handling for COURSEDETAIL Component
 * Components for Reference Courses inside the COURSEDETAIL Component
 */
export function ReferCourses(props){
    let courses = [];
    props.courses.forEach(_course => {
        if(_course.key===props.course.key && _course._id !== props.course._id){
            courses.push(_course);
        }       
    });
    const [search, setSearch] = useState('')
    return (
        <View>
            <Text style={[s.mb3, s.mt5, s.textCenter, {fontSize:20, fontWeight:'bold'}]}>
                {courses.length===0 ? "" : ("More "+props.course.name+" courses...")}
            </Text>
            <Text 
            style={[s.mb4, s.mx5, s.textCenter, {fontSize: 15}]}>
                {courses.length===0 ? "" : (props.course.intro+" (Total: "+courses.length+" courses)")}
            </Text>
            <SearchCourses setSearch={setSearch}/>
            <SafeAreaView >
                <ScrollView 
                style={{width:WIDTH, height:HEIGHT*0.98}} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                >
                    {
                        courses.map((_course, index)=>(
                            _course.title.toLowerCase().trim().includes(search.toLowerCase().trim())
                                ||_course.author.toLowerCase().trim().includes(search.toLowerCase().trim())
                                ||search.trim()==='' ?
                            <Pressable key={index} 
                            onPress={()=>{
                                props.selectedCourse(_course);
                                props.setSelectedVideo(_course.dataChildrent[0])
                            }}>
                                <Course course={_course}/>
                            </Pressable>
                            : <View key={index}/>
                        ))
                    }
                </ScrollView>
            </SafeAreaView>
        </View>

    );
}

/**
 * Handling for COURSEDETAIL Component
 * Components for List of Videos
 */
export function ListVideos(props){
    return(
        <View>
            <FlatList data={props.course.dataChildrent}
                renderItem={({item})=>{
                    let video=item;
                    return(
                        <Pressable 
                        style={[s.container,{
                            flexDirection:'row',  
                            flexWrap: 'wrap',  
                            borderColor:'black',
                            borderTopWidth:1,
                            borderBottomWidth:1,
                            borderStyle:'solid',
                            borderRadius:40,
                            backgroundColor: 
                            (props.selectedVideo===null || (props.selectedVideo!==null && props.selectedVideo.videoId!==video.videoId)) 
                            ? 'white' :'#dadde1'
                        }]}
                        onPress={()=>{
                            props.setSelectedVideo(video)
                        }}>
                            <Anticons name={'youtube'} 
                            size={50} color={'black'}
                            style={{
                                flexBasis:WIDTH*0.1,
                                flex:1,
                                alignSelf:'center'
                            }}
                            />
                            <View style={{
                                flexBasis:WIDTH*0.7,
                                marginLeft: WIDTH*0.05,
                                flex:2,
                                alignSelf:'center'
                            }}>
                                <Text>
                                    {video.videoTitle}
                                </Text>
                            </View>
                        </Pressable>
                    )
                }}/>
        </View>
    )
}

/**
 * Handling for COURSEDETAIL Component
 * Components for detail of a courses (including title, list of videos, professor, etc.)
 */
export function CourseDetail(props){
    const [selectedVideo, setSelectedVideo] = useState(null);
    return(
        <Modal transparent={false} 
            animationType="slide"
            visible={props.course===null ? false : true}
            onRequestClose={()=>props.setCourse(null)} >
            <SafeAreaView style={{width:WIDTH, height:HEIGHT*0.85}}>
                {
                    props.course===null ? <View></View> : 
                    (
                        <FlatList                   /**At least one List View component */
                            ListHeaderComponent={
                                <>
                                    <TitleVideo course={props.course} selectedVideo={selectedVideo}/>
                                    <YoutubePlayer height={HEIGHT*0.32} play={false} 
                                        videoId={selectedVideo===null 
                                            ? props.course.dataChildrent[0].videoId 
                                            : selectedVideo.videoId}/>
                                    <ListVideos course={props.course} 
                                        selectedVideo={selectedVideo} 
                                        setSelectedVideo={setSelectedVideo}/>
                                </>
                            }
                            ListFooterComponent={
                                <ReferCourses course={props.course} 
                                courses={props.courses}
                                setSelectedVideo={setSelectedVideo}
                                selectedCourse={(_course)=> props.selectedCourse(_course)}/>
                            }
                        />        
                    )
                }
            </SafeAreaView>
            <Button title="Back" onPress={()=>{
                props.setCourse(null)
                setSelectedVideo(null)
            }}/>
        </Modal>
    )
}
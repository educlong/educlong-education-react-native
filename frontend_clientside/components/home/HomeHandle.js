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
import { Image, Pressable, SafeAreaView, ScrollView, Text, View } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Anticons from 'react-native-vector-icons/AntDesign';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import test_enrolling from '../../assets/test_enrolling.png'
import { categoryCourses, HEIGHT, MenuBar, s, searchAPI, styles, WIDTH } from '../Models';

/**Handling for HOME Component
 * 
 * onScroll function handles for scrolling (typically: vertical)
 * @param {*} param0 event when scrolling
 * @param {*} active (State) The elements that are displayed when scrolling
 * @param {*} setActive (setState) The elements that are displayed when scrolling
 */
const onScroll = ({nativeEvent},active, setActive) => {
    if(nativeEvent){
        const slide = Math.round(nativeEvent.contentOffset.x / nativeEvent.layoutMeasurement.width);
        if(slide != active){
            setActive(slide);
        }
    }
}

/**Handling for HOME Component
 * 
 * Handling for slide (navigation each element in slide)
 */
function Dots(props){
    let slides = []
    props.courses.forEach(element => {
        if(element._id <= parseInt(categoryCourses(props.courses)))
            slides.push(element);
    });
    return(
        <View style={styles.wrapDot}>
            {
                props.isBanner ? <View></View> :
                <Text style={{margin: 3, color: props.active===0 ? 'black' : 'grey'}}> &#x25cf;</Text>
            }
            {
                slides.map((slide, index)=>{
                    return(
                        <Text key={index} 
                        style={{margin: 3, 
                        color: (props.active-(props.isBanner ? 0 : 1))===index 
                                ? (props.isBanner ? 'grey' :'black')
                                : (props.isBanner ? 'white' : 'grey')}}>
                            &#x25cf;
                        </Text>
                    )
                })
            }
        </View>
    )
}

/**Handling for HOME Component
 * BANNER
 */
export function Banner(props){
    const [bannerActive, setbannerActive] = useState(0);    
    return(
        <View style={styles.wrap}>
            <ScrollView 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
            onScroll={({nativeEvent})=>onScroll({nativeEvent},bannerActive,setbannerActive)}>
                {
                    props.slides.map((slide, index)=>{
                        return(
                            <Image key={index}
                            resizeMode='stretch'
                            style={styles.wrap}
                            source={{uri: slide.image}}/>
                        )
                    })
                }
            </ScrollView>
            <Dots courses={props.slides} active={bannerActive} isBanner={true}/>
        </View>
    )
}

/**Handling for HOME Component and COURSES Component
 * List of icons for each kind of courses 
 */
const faIcon = [
    <Anticons name={'profile'} size={100} color={'white'}/>,
    <Anticons name={'codesquareo'} size={100} color={'white'}/>,
    <Anticons name={'wordfile1'} size={100} color={'white'}/>,
    <Ionicons name={'code'} size={100} color={'white'}/>,
    <Anticons name={'antdesign'} size={100} color={'white'}/>
]

/**Handling for HOME Component and COURSES Component
 * Components for Section (display when menu are un-folded)
 * Handling for one kind of courses 
 */
function Section(props){
    let course = props.course;
    let listNames = ""
    props.courses.forEach(element => {
        if(element._id <= parseInt(categoryCourses(props.courses)))
            listNames+=element.name+"\n"
    });
    return(
        <Pressable style={{width:WIDTH}}
        onPress={()=>props.selectedCourses(course === "" ? "all" : course.key)}>
            <View style={styles.iconSection}>
                {
                    faIcon[props.index+(course==="" ? 0 : 1)]
                }
            </View>
            <Text style={[s.textCenter, s.my3, {fontSize:16, fontWeight:'bold'}]}>
                {course === "" ? "All Courses" : course.name}
            </Text>
            <Text style={[s.mb4, s.mx5, course==="" ? s.textCenter : s.textLeft]}>
                { course==="" ? listNames :course.content }
            </Text>
        </Pressable>
    )
}

/**Handling for HOME Component and COURSES Component
 * Components for Section (display when menu are un-folded)
 * Handling for many kind of courses 
 */
export function Sections(props){
    const [coursesActive, setcoursesActive] = useState(0);
    const [courses, setCourses] = useState([]);
    return(
        <View style={[s.my5, s.bgLight]}>
            {
                props.isWelcome ? (
                    <View style={[s.mb5, s.justifyContentCenter, 
                        {flexGrow:0, flexShrink:0, flexBasis:'auto', width:WIDTH}]}>
                        <Text style={[s.mb3, s.textCenter, {fontSize:18, fontWeight:'bold'}]}>
                            A better way to start your career
                        </Text>
                        <Image source={test_enrolling} 
                            style={{width:WIDTH*0.6, height:HEIGHT*0.3, marginLeft:WIDTH*0.2}}/>
                    </View>
                ) : <View/>
            }
            <MenuBar listCourses ={(courses_)=>{
                setCourses(courses_);
            }}/>
            <SafeAreaView >
                <ScrollView 
                style={{width:WIDTH, height:HEIGHT*(courses.length<=0 ? 0 : 0.33)}} 
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                onScroll={({nativeEvent})=>onScroll({nativeEvent},coursesActive,setcoursesActive)}
                >
                    {
                        courses.length <=0 ? <View/> :
                            <Section course="" courses={courses} index={0} selectedCourses={props.selectedCourses}/>        
                    }
                    {
                        courses.length <=0 ? <View/> :
                            courses.map((course,index)=>(
                                index > parseInt(categoryCourses(courses)-1) ? 
                                <View key={index}></View> :
                                <Section key={index} course={course} 
                                    courses={courses} index={index} 
                                    selectedCourses={props.selectedCourses}
                                />
                            ))
                    }
                </ScrollView>
                {
                    courses.length<=0 ? <View/> : 
                        <Dots courses={courses} active={coursesActive} isBanner={false}/>
                }
            </SafeAreaView>
        </View>
    )
}

/**Handling for HOME Component
 * Components for Quotation
 */
export function Quotation(props){
    return(
        <View style={[s.textCenter, s.my4, s.mx5, {width: WIDTH*0.8}]}>
            <Text style={[s.textCenter, {fontStyle:'italic', fontSize: 15}]}>
            "Working with Start Bootstrap templates has saved me tons of development time when building new projects! Starting with a Bootstrap template just makes things easier!"
            </Text>
            <Text style={[s.textCenter, s.my3, {fontWeight:'bold', fontSize: 13}]}>
            Tom Ato / CEO, Pomodoro
            </Text>
        </View>
    )
}

/**Handling for HOME Component
 * Components for Reasons
 */
export function Reasons(props){
    const [loading, setLoading] = useState(true);
    const [reasons, setReasons] = useState([])
    useEffect(() => {
      searchAPI('Reasons', setReasons, setLoading)
    }, [])
    
    const [reasonActive, setReasonActive] = useState(0);    
    if(loading){
      return <View><Text>Loading...</Text></View>
    }
    return(
        <View style={[s.mt5, {width:WIDTH, height:HEIGHT*0.65}]}>
            <Text style={[s.textCenter, s.mt5, {fontSize:25, fontWeight:'bold'}]}>
                Why do you choose us?
            </Text>
            <ScrollView 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
            onScroll={({nativeEvent})=>onScroll({nativeEvent},reasonActive,setReasonActive)}>
                {
                    reasons.map((reason, index)=>{
                        return(
                            <View key={index}>
                                <Image key={index}
                                resizeMode='stretch'
                                style={{width:WIDTH, height:HEIGHT*0.35}}
                                source={{uri: reason.image}}/>
                                <Text style={[s.my3, {
                                    alignSelf:'center', 
                                    fontSize:20, 
                                    fontWeight:'bold',
                                    fontStyle:'italic',
                                    width:WIDTH*0.7,
                                    textAlign:'center'
                                }]}>
                                    {reason.title}
                                </Text>
                                <Text style={{
                                    alignSelf:'center',
                                    width:WIDTH*0.9,
                                    fontSize:15
                                }}>
                                    {reason.content}
                                </Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.wrapDot}>
            {
                reasons.length<=0 ? <View/> :
                reasons.map((reason, index)=>{
                    return(
                        <Text key={index} 
                            style={{margin: 3, 
                            color: reasonActive===index ? "black" : "grey"}}>
                                &#x25cf;
                        </Text>
                    )
                })
            }
        </View>
        </View>
    )
}

/**Handling for HOME Component
 * Components for Partners
 */
export function Partners(props){
    const [loading, setLoading] = useState(true);
    const [partners, setPartners] = useState([])
    useEffect(() => {
      searchAPI('Partners', setPartners, setLoading)
    }, [])
    
    if(loading){
      return <View><Text>Loading...</Text></View>
    }
    return(
        <View style={[s.my5, {width:WIDTH, height:HEIGHT*0.55}]}>
            <Text style={[s.textCenter, {fontSize:25, fontWeight:'bold'}]}>Our Partners</Text>
            <View style={[s.my4, {
                flexDirection:'row',
                flexWrap:'wrap',
                justifyContent:'center'
            }]}>
            {
                partners.map((partner, index)=>{
                    return(
                        <View key={index} 
                        style={[s.mx2, s.mb4, {width:WIDTH*0.4}]}>
                            <Image source={{uri: partner.avatar}} 
                                style={{
                                    height:HEIGHT*0.2,
                                    borderRadius: 100
                                }}/>
                            <Text style={[s.mt3, {alignSelf:'center'}]}>{partner.name}</Text>
                        </View>
                    )
                })
            }
            </View>
        </View>
    )
}

/**Handling for HOME Component
 * Components for Feedbacks
 */
export function Feedbacks(props){
    const [loading, setLoading] = useState(true);
    const [feedbacks, setFeedbacks] = useState([])
    useEffect(() => {
      searchAPI('Feedbacks', setFeedbacks, setLoading)
    }, [])
    
    const [feedbackActive, setFeedbackActive] = useState(0);    
    if(loading){
      return <View><Text>Loading...</Text></View>
    }
    return(
        <View style={[s.mt5, {width:WIDTH, height:HEIGHT*0.55}]}>
            <Text style={[s.textCenter, s.mt5, {fontSize:25, fontWeight:'bold'}]}>
                Students' feedback
            </Text>
            <ScrollView 
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            horizontal
            style={styles.wrap}
            onScroll={({nativeEvent})=>onScroll({nativeEvent},feedbackActive,setFeedbackActive)}>
                {
                    feedbacks.map((feedback, index)=>{
                        return(
                            <View key={index} style={{width:WIDTH, alignSelf:'center'}}>
                                <MaterialCommunityIcons 
                                    name={'comment-quote'} 
                                    size={50} color={'black'}
                                    style={[s.textCenter, {width:WIDTH, alignSelf:'center'}]}
                                    />
                                <Text style={{
                                    alignSelf:'center',
                                    width:WIDTH*0.9,
                                    fontSize:15
                                }}>{feedback.content1}</Text>
                                <Text style={[s.mt2, {
                                    alignSelf:'center',
                                    width:WIDTH*0.9,
                                    fontSize:15
                                }]}>{feedback.content2}</Text>
                                <Image key={index}
                                    resizeMode='stretch'
                                    style={[s.mt3,{
                                        width:WIDTH*0.2, 
                                        height:HEIGHT*0.1, 
                                        alignSelf:'center',
                                        borderRadius:100
                                    }]}
                                    source={{uri: feedback.avatar}}/>
                                <Text style={[s.mt2, s.textCenter, {
                                    width:WIDTH,
                                    fontSize:16,
                                    fontWeight:'bold'
                                }]}>{feedback.student}</Text>
                            </View>
                        )
                    })
                }
            </ScrollView>
            <View style={styles.wrapDot}>
            {
                feedbacks.length<=0 ? <View/> :
                feedbacks.map((feedback, index)=>{
                    return(
                        <Text key={index} 
                            style={{margin: 3, 
                            color: feedbackActive===index ? "black" : "grey"}}>
                                &#x25cf;
                        </Text>
                    )
                })
            }
        </View>
        </View>
    )
}

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

export const linkApiThumbnail = "https://img.youtube.com/vi/";
export const sizeApiThumbnail = "/sddefault.jpg";
export const mapApiKey = "AIzaSyCbsua4EskTMpwMIvO5vkvTgw35rhCwTfs";
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import BootstrapStyleSheet from 'react-native-bootstrap-styles';
import axios from 'axios';
import _logos from '../assets/_logos.png'
import { _URL_ } from '../IP_Config';
import Anticons from 'react-native-vector-icons/AntDesign';
import { useEffect, useState } from 'react';

export const WIDTH = Dimensions.get('window').width;
export const HEIGHT = Dimensions.get('window').height;
export const bootstrapStyleSheet = new BootstrapStyleSheet();
export const { s, c } = bootstrapStyleSheet;
export const URLEduclong = _URL_;

/**
 * calculate the total of kind of course in page
 * @param {*} courses an array of courses
 * @returns an integer number that is the total of courses
 */
export const categoryCourses = (courses) =>  {    //lengthCourses store all of the data from firebase
    let count = 0;
    courses.forEach(element => {
        if(element._id < 1000) count++
    });
    return count;
};

/**
 * GET API FROM BACKEND
 * @param {*} apiParams     The parameter of the API (Courses, Team, Feedbacks, etc.)
 * @param {*} setStates     State funtion from useState (stored data after receive API)
 * @param {*} setLoading    State funtion from useState (to know if data existed or not)
 */ 
export const searchAPI = async(apiParams, setStates, setLoading) =>{
    try{
        await axios.get(`${URLEduclong}${apiParams}`)
        .then((res)=>{
            setStates(res.data)
            if(res.data.length >0) 
                setLoading(false);
        })
    } catch(error){
        console.log(error);
    }
}

/**
 * Handling for HOME Component and COURSES Component
 * Components for TEAM
 */
export function Team(props){
    return(
        <View style={[s.my5, {width:WIDTH, height:HEIGHT*0.60}]}>
            <Text style={[s.textCenter, {fontSize:25, fontWeight:'bold'}]}>Our Team</Text>
            <Text style={[s.textCenter, s.mt3, {fontSize:15}]}>
                Dedicated to quality and your success
            </Text>
            <View style={[s.my4, {
                flexDirection:'row',
                flexWrap:'wrap',
                justifyContent:'center'
            }]}>
            {
                props.team.map((member, index)=>{
                    return(
                        <View key={index} 
                        style={[s.mx2, s.mb4, {width:WIDTH*0.4}]}>
                            <Image source={{uri: member.avatar}} 
                                style={{
                                    height:HEIGHT*0.2,
                                    borderRadius: 100
                                }}/>
                            <Text style={[s.mt3, s.mb1, {alignSelf:'center'}]}>{member.name}</Text>
                            <Text style={{alignSelf:'center', fontSize:15, fontStyle:'italic'}}>
                                {member.position}
                            </Text>
                        </View>
                    )
                })
            }
            </View>
        </View>
    )
}

/**
 * Handling for HOME Component and COURSES Component
 */
export function Header(){
    return(
        <View style={{
            width:WIDTH, 
            height:50, 
            backgroundColor:'#212529',
            flexDirection:'row',
            flexWrap:'wrap'
        }}>
            <Image source={_logos} style={[s.ml4, {width:55, height:50}]}/>
            <Text style={[s.textCenter, {
                color:'white', 
                width:WIDTH*0.7, 
                height:50,
                fontSize:20,
                marginTop:10
            }]}>
                EDUCLONG EDUCATION
            </Text>
        </View>
    )
}

/**
 * Handling for HOME Component and COURSES Component
 * Components for Menu (including fold menu and un-fold menu)
 */
export function MenuBar(props){
    const [hideMenu, setHideMenu] = useState(true)
    const [loading, setLoading] = useState(true);
    const [courses, setCourses] = useState([])
    useEffect(() => {
      searchAPI('Courses', setCourses, setLoading)
    }, [])
    
    if(loading){
      return <View><Text>Loading...</Text></View>
    }
    return(
        <View style={[s.textLeft, {flexDirection:'row'}]}>
            {
                hideMenu ?
                    <Anticons name={'menu-unfold'}  //Handling for fold menu
                    size={50} color={'black'}
                    style={[s.ml3, s.mr0, s.pr0, {
                        color: '#2c81fd',
                        bottom: 0,
                        width:WIDTH*0.2,
                        marginLeft:20
                    }]} onPress={()=>{
                        props.listCourses(courses)  //get Api when folding menu
                        setHideMenu(!hideMenu)      //and display data when folding menu
                    }}/>
                :
                    <Anticons name={'menu-fold'} 
                    size={50} color={'black'}
                    style={[s.ml3, s.mr0, s.pr0, {
                        color: '#2c81fd',
                        bottom: 0,
                        width:WIDTH*0.2,
                        marginLeft:20
                    }]} onPress={()=>{
                        props.listCourses([])       //remove data when un-folding menu
                        setHideMenu(!hideMenu)      //and hidden data when un-folding menu
                    }}/>
            }
            <Text style={[s.ml0, s.pl0, {   //Handing for fold and un-fold menu with event in Text
                alignSelf:'center', 
                fontSize:16, 
                fontWeight:'bold', 
                fontStyle:'italic'
            }]} onPress={()=>{
                setHideMenu(!hideMenu)
                props.listCourses(hideMenu ? courses : [])
            }}>MENU</Text>
        </View>
    )
}

/**
 * Handling for HOME Component and COURSES Component
 * FOOTER
 */
export function Footer(){
    return(
        <View style={[s.mt5, {marginBottom:WIDTH*0.05, backgroundColor:'#212529'}]}>
            <Text style={[s.textCenter, s.mb2, s.mt4, {fontWeight:'bold', fontSize: 15, color:'white'}]}>
                EDUCLONG EDUCATION - Programming &#38; Multimedia
            </Text>
            <Text style={[s.textCenter, s.mb2, {fontSize: 15, color:'white'}]}>
                The study system of educlongeducation
            </Text>
            <Text style={[s.textLeft, s.ml3, {fontSize: 15, color:'white'}]}> 
                Download document in: 
            </Text>
            <Text style={[s.textRight, s.mr3, s.ml3, s.mb2, {fontSize: 15, color:'white'}]}>
                http://educlong-education.s3-website.us-east-2.amazonaws.com/
            </Text>
            <Text style={[s.textLeft, s.ml3, {fontSize: 15, color:'white'}]}>
                Address: 
            </Text>
            <Text style={[s.textCenter, s.mb2, {fontSize: 15, color:'white'}]}>
                81 West 1st St., Hamilton, Ontario, L9C 3C5, Canada
            </Text>
            <Text style={[s.textCenter, {fontSize: 15, color:'white'}]}>
                Hotline: (+1)-289-933-7974 (Nguyen Duc Long)
            </Text>
            <Text style={[s.textCenter, s.mb2, {fontSize: 15, color:'white'}]}>
                Email: educlong@gmail.com
            </Text>
            <Text style={[s.textCenter, s.mb4, {fontSize: 15, color:'white'}]}>
                Copyright © Educlong Education 2022
            </Text>
        </View>
    )
}

/**
 * Styles
 */
export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    wrap: {
        width: WIDTH,
        height: HEIGHT*0.15
    },
    wrapDot:{
        position:"absolute",
        bottom:0,
        flexDirection:'row',
        alignSelf:'center'
    },
    section:{
        paddingHorizontal: 6,
        backgroundColor: 'white',
    },
    iconSection:{
        textAlign: 'center',
        backgroundColor: '#007bff',
        marginHorizontal: WIDTH*0.35,
        fontWeight: 'bold',
        paddingLeft: 10,
        paddingVertical:10,
        borderRadius: 20
    }
});
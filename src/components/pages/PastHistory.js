import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage,CustomRow} from '../common';
import { ScrollView } from 'react-native-gesture-handler';
import { Actions} from 'react-native-router-flux';
import * as firebase from 'firebase';


var {height, width} = Dimensions.get('window');
export default class PastHistory extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={pastData:[]}

       //let ref = firebase.database().ref('users/')
    }
    componentDidMount(){
        if(this.props.data){
            let ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/' + this.props.data + '/myAppointment/')
                ref.on('value',(snap)=>{
                    if(snap.val()){
                        var collectData=[];
                        let alldata = snap.val();
                        for(let key in alldata){
                            alldata[key].treatmentId = key;
                            if(alldata[key].status){
                                if(alldata[key].status =='done'){
                                    collectData.push(alldata[key]);
                                }
                            }
                            
                        }

                        this.setState({
                            pastData:collectData
                        })
                    }
                })
        }
    }

    render() {
        return (
            // <View>
    
            
            <View>
                <View style={{top:30}}>
                    <CustomHeader  Headershow={false} headerName="Dashboard" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
                </View>
            <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31}}>
            
            
            {this.state.pastData ? 
            
                this.state.pastData.map((item, index)=>{

                    return(

                            <View style={{backgroundColor:'#eceff1', width:width-20,borderWidth:1, borderColor:'#26418f',borderRadius:10,alignSelf:'center', borderBottomWidth:5, borderLeftWidth:3, margin:5}}>
                            <View style={{ width:width-10, alignSelf:'center'}}>
                                <View style={{height:40}}>
                                    <View style={{width:width-100, borderBottomWidth:1, borderBottomColor:'#bbbebf', alignSelf:'center'}}>
                                        <Text style={{fontSize:15,alignSelf:'center', color:'#00227b', fontWeight:'bold', padding:5}}>{item.date ? item.date + ',' : '' }{item.time ? item.time : '' } </Text>
                                    </View>
                                </View>

                                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                                    <View style={{width:120}}>
                                        <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Pet Name : </Text>
                                    </View>
                                    <View style={{width:230}}>
                                    <Text style={{padding:4}}>{item.petname ? item.petname : ''}</Text>
                                    </View>
                                </View> 

                                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                                    <View style={{width:120}}>
                                        <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Diseases : </Text>
                                    </View>
                                    <View style={{width:230}}>
                                    <Text style={{padding:4}}>{item.diseases ? item.diseases : ''}</Text>
                                    </View>
                                </View>

                                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                                    <View style={{width:120}}>
                                        <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Species : </Text>
                                    </View>
                                    <View style={{width:230}}>
                                    <Text style={{padding:4}}>{item.species ? item.species : ''}</Text>
                                    </View>
                                </View> 

                                <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                                    <View style={{width:120}}>
                                        <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Comment : </Text>
                                    </View>
                                    <View style={{width:230}}>
                                    <Text style={{padding:4}}>{item.comment ? item.comment : ''}</Text>
                                    </View>
                                </View> 

                            </View>
                        </View>



                    )






                })
                :
                <View>
                <Text>Not data Found....
                    </Text>
                    </View>
                
        
        
            }





















                


                </ScrollView> 
             </View>
        );
      }
}
const styles = StyleSheet.create({

});
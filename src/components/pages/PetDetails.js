import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage,CustomCardImg} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
//fab icon button
import ActionButton from 'react-native-action-button';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class PetDetails extends React.Component {
    
    static navigationOptions = {
        header: null
    };
    constructor(props){
        super(props);
        this.state={
            notFound:true,
            petData:{},
            petId:''
        }
        
    }
    componentDidMount(){
        if(this.props.data){
            this.setState({
                notFound:false,
                petId:this.props.data.petId
               // petData:this.props.data
            })
        }
    }

    pastConHistory(id){
       // alert("past consultency alert...!!");
      // Actions.jump('PastHistory',{petId:this.state.petId});
      Actions.PastHistory({data:this.state.petId})
    }

  render() {
    return (
        // <View>
        
        // <View > 
        
        //     <View style={{top:30}}>
        //     <CustomHeader  Headershow={false} headerName="Dashboard" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
        //     </View>
        //     {this.state.notFound ? 
        //     <View style={{marginTop:40, alignSelf:'center'}}><Text style={{fontWeight:'bold', fontSize:20}}>Loading....</Text></View>
        //     :
        //             <View style={{top:35}}>
        //                 <View style={{height:400,backgroundColor:'#eceff1', width:width-20,borderWidth:1, borderColor:'#26418f',borderRadius:10,alignSelf:'center', borderBottomWidth:5, borderLeftWidth:3, margin:5}}>
        //                     <View style={{ width:width-10, alignSelf:'center'}}>
        //                         <View style={{height:40}}>
        //                             <View style={{width:width-100, borderBottomWidth:1, borderBottomColor:'#bbbebf', alignSelf:'center'}}>
        //                                 <Text style={{fontSize:15,alignSelf:'center', color:'#00227b', fontWeight:'bold', padding:5}}>Pet Details </Text>
        //                             </View>
        //                         </View>

        //                         <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
        //                             <View style={{width:120}}>
        //                                 <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}> ID : </Text>
        //                             </View>
        //                             <View style={{width:230}}>
        //                             <Text style={{padding:4}}>{this.props.data?this.props.data.petId: null}</Text>
        //                             </View>
        //                         </View> 

        //                         <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
        //                             <View style={{width:120}}>
        //                                 <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Pet Name : </Text>
        //                             </View>
        //                             <View style={{width:230}}>
        //                             <Text style={{padding:4}}>{this.props.data?this.props.data.name: null}</Text>
        //                             </View>
        //                         </View> 

        //                         <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
        //                             <View style={{width:120}}>
        //                                 <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Pet Breed : </Text>
        //                             </View>
        //                             <View style={{width:230}}>
        //                             <Text style={{padding:4}}>{this.props.data?this.props.data.breedName: null}</Text>
        //                             </View>
        //                         </View>

        //                         <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
        //                             <View style={{width:120}}>
        //                                 <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Species : </Text>
        //                             </View>
        //                             <View style={{width:230}}>
        //                             <Text style={{padding:4}}>{this.props.data?this.props.data.species: null}</Text>
        //                             </View>
        //                         </View> 

        //                         <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
        //                             <View style={{width:120}}>
        //                                 <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>D.O.B : </Text>
        //                             </View>
        //                             <View style={{width:230}}>
        //                             <Text style={{padding:4}}>{this.props.data?this.props.data.dob: null}</Text>
        //                             </View>
        //                         </View> 

        //                     </View>
        //                 </View>  
        //                 </View> 

        //     }
            // <View style={{marginTop:100, alignItems:'center'}}>
            // <CustomButton onPress={()=>{this.pastConHistory(this.props.data.petId)}}>Past Consultency History</CustomButton>
            // </View>

        // </View>


        <View>
        <View style={{top:30}}>
            <CustomHeader  Headershow={false} headerName="Dashboard" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
        </View>
        <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:60}}>
    
                    <View style={{backgroundColor:'#eceff1', width:width-20,borderWidth:1, borderColor:'#26418f',borderRadius:10,alignSelf:'center', borderBottomWidth:5, borderLeftWidth:3, margin:5}}>
                    <View style={{ width:width-10, alignSelf:'center'}}>
                        <View style={{height:40}}>
                            <View style={{width:width-100, borderBottomWidth:1, borderBottomColor:'#bbbebf', alignSelf:'center'}}>
                                <Text style={{fontSize:15,alignSelf:'center', color:'#00227b', fontWeight:'bold', padding:5}}>Pet Details</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                            <View style={{width:120}}>
                                <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>ID : </Text>
                            </View>
                            <View style={{width:230}}>
                            <Text style={{padding:4}}>{this.props.data?this.props.data.petId: null}</Text>
                            </View>
                        </View> 

                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                            <View style={{width:120}}>
                                <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Pet Name : </Text>
                            </View>
                            <View style={{width:230}}>
                            <Text style={{padding:4}}>{this.props.data?this.props.data.name: null}</Text>
                            </View>
                        </View> 

                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                            <View style={{width:120}}>
                                <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Breed : </Text>
                            </View>
                            <View style={{width:230}}>
                            <Text style={{padding:4}}>{this.props.data?this.props.data.breedName: null}</Text>
                            </View>
                        </View>

                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                            <View style={{width:120}}>
                                <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>Species : </Text>
                            </View>
                            <View style={{width:230}}>
                            <Text style={{padding:4}}>{this.props.data?this.props.data.species: null}</Text>
                            </View>
                        </View> 

                        <View style={{flex:1, flexDirection:'row', justifyContent:'space-around',margin:2}}>
                            <View style={{width:120}}>
                                <Text style={{padding:4,paddingLeft:10, fontWeight:'bold', fontSize:16}}>D.O.B : </Text>
                            </View>
                            <View style={{width:230}}>
                            <Text style={{padding:4}}>{this.props.data?this.props.data.dob: null}</Text>
                            </View>
                        </View> 
                        
                    </View>
                </View>
                <View style={{marginTop:30}}>
                <CustomButton onPress={()=>{this.pastConHistory(this.props.data.petId)}}>Past Consultency History</CustomButton>
                </View>
        </ScrollView> 
        
     </View>




    );
  }
}

const styles = StyleSheet.create({

});
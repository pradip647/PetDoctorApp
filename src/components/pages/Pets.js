import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage,CustomCardImg} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
//fab icon button
import ActionButton from 'react-native-action-button';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class Pets extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        
    }

   

    openAlert(msg){
        alert(msg);
    }


  render() {
    return (
        // <View>

        
        <View > 
        
            <View style={{top:30}}>
                <CustomHeader  Headershow={true} headerName="Pet Details" showDataWelcome={false} showLogoutButton={false} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
            </View>


            <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31, alignSelf:'center'}}>

                <TouchableOpacity style={{margin:5, width:width-20, height:70, borderColor:'#6f74dd',borderWidth:0.7 }}>
                        <View style={{flex:1, flexDirection:'row',justifyContent:'space-around'}}>
                            <Image
                                    style={{height:70, width:100}}
                                    //styleName="small rounded-corners"
                                    source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }}
                                />
                            <View style={{ width:width-90}}>
                                <View style={{flex:1, flexDirection:'column'}}>
                                    <View><Text style={{top:10, left:40, fontWeight:'bold', fontSize:18}}>csdcds</Text></View>
                                    <View><Text style={{top:10, left:40, }}>csdcjsdkssc</Text></View>
                                </View>
                            </View>
                        </View>
                </TouchableOpacity>
                       
            </ScrollView> 
            <ActionButton
                style={{position:'absolute', bottom:10, right:5,}}
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { console.log("hi")}}
            />
        </View>

    );
  }
}

const styles = StyleSheet.create({

});
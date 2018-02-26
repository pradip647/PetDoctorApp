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
            petData:{}
        }
        
    }
    componentDidMount(){
        if(this.props.data){
            this.setState({
                notFound:false//,
               // petData:this.props.data
            })
        }
    }

    pastConHistory(){
        alert("past consultency alert...!!");
    }

  render() {
    return (
        // <View>
        
        <View > 
        
            <View style={{top:30}}>
            <CustomHeader  Headershow={false} headerName="Dashboard" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
            </View>
            {this.state.notFound ? 
            <View style={{marginTop:40, alignSelf:'center'}}><Text style={{fontWeight:'bold', fontSize:20}}>Loading....</Text></View>
            :null
            }
            <View style={{marginTop:60}}>
             <Text>{this.props.data?this.props.data.name: null}</Text>
             <Text>{this.props.data?this.props.data.breedName: null}</Text>
             <Text>{this.props.data?this.props.data.dob: null}</Text>
             <Text>{this.props.data?this.props.data.petId: null}</Text>
             <Text>{this.props.data?this.props.data.species: null}</Text>
            </View>
            <View style={{marginTop:100, alignItems:'center'}}>
                            <CustomButton onPress={()=>{this.pastConHistory()}}>Past Consultency History</CustomButton>
                            </View>

        </View>

    );
  }
}

const styles = StyleSheet.create({

});
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
        this.state={
            allPets:[],
            dataFound:true
        }
        //console.log("dssdcs: " + firebase.auth().currentUser.uid);
        let ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/');
        ref.on('value',(snapshot)=>{
            setTimeout(()=>{
                this.setState({allPets:[]});
                if(snapshot.val()){
                    let data = snapshot.val();
                    var alldata=[];
                    for(let key in data){
                        alldata.push(data[key]);
                    }
                    this.setState({
                        allPets:alldata,
                        dataFound:false
                    },()=>{console.log(this.state.allPets)})
                } 
            },1000)
            
        })

    }

   

    openAlert(msg){
        alert(msg);
    }

    gotoPetDetails(data){
        Actions.PetDetails({data:data})
    }


  render() {
    return (
        // <View>


        
        <View > 
        
            <View style={{top:30}}>
            <CustomHeader  Headershow={false} headerName="Dashboard" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
            </View>
            { this.state.dataFound ? 
                <View style={{marginTop:40, alignSelf:'center'}}><Text style={{fontWeight:'bold', fontSize:20}}>Loading....</Text></View>
                :null
            }

            <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31, alignSelf:'center'}}>
                {this.state.allPets ? 
                    this.state.allPets.map((item, index)=>{
                        return ( 
                            <TouchableOpacity onPress={()=>{this.gotoPetDetails(item)}} style={{margin:5, width:width-20, height:70, borderColor:'#6f74dd',borderWidth:1 }} key={item.petId}>
                                <View style={{flex:1, flexDirection:'row',justifyContent:'space-around'}}>
                                    <Image
                                            style={{height:70, width:100}}
                                            //styleName="small rounded-corners"
                                            source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }}
                                        />
                                    <View style={{ width:width-90}}>
                                        <View style={{flex:1, flexDirection:'column'}}>
                                            <View><Text style={{top:10, left:40, fontWeight:'bold', fontSize:18}}>{item.name}</Text></View>
                                            <View><Text style={{top:10, left:40, }}>{item.species}</Text></View>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        )
                    }) :null
                }    
            </ScrollView> 
            <ActionButton
                style={{position:'absolute', bottom:10, right:5,}}
                buttonColor="rgba(231,76,60,1)"
                onPress={() => { Actions.AdPet()}}
            />
        </View>

    );
  }
}

const styles = StyleSheet.create({

});
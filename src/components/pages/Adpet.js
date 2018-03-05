import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,Platform, Button, Alert,AsyncStorage } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { ImagePicker } from 'expo';

var {height, width} = Dimensions.get('window');

export default class AdPet extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            petName:'',
            petSpecies:'',
            breedName:'',
            petDob:'',
            petInfo:'',
            image: null, 
            headerUsername:''
        }
    }

    async componentWillMount(){
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null){
            this.setState({headerUsername:value});
            }
          } catch (error) { console.log(error) }

    }


    //open alert
    openAlert(msg){
        alert(msg);
    }

    SignUpBtn(msg){
        if(this.state.petName=='' || this.state.petName==undefined || this.state.petName==null||
            this.state.petSpecies=='' || this.state.petSpecies==undefined || this.state.petSpecies==null||
            this.state.breedName=='' || this.state.breedName==undefined || this.state.breedName==null||
            this.state.petDob == '' || this.state.petDob==undefined || this.state.petDob==null){
                if(this.state.petName=='' || this.state.petName==undefined || this.state.petName==null){
                    this.openAlert('Pet name can not be blank');
                }else if(this.state.petSpecies=='' || this.state.petSpecies==undefined || this.state.petSpecies==null){
                    this.openAlert('Pet species can not be blank');
                }else if(this.state.breedName=='' || this.state.breedName==undefined || this.state.breedName==null){
                    this.openAlert('Breed name can not be blank');
                }else if(this.state.petDob == '' || this.state.petDob==undefined || this.state.petDob==null){
                    this.openAlert('Pet D.O.B can not be blank');
                }
        }else{
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/').push({
                name:this.state.petName,
                species:this.state.petSpecies,
                breedName:this.state.breedName,
                dob:this.state.petDob
            }).then((snap)=>{
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/' + snap.key + '/').update({
                    petId:snap.key
                }).then(()=>{
                    this.setState({
                        petName:'',
                        petSpecies:'',
                        breedName:'',
                        petDob:'',
                        petInfo:'',
                        headerUsername:''
                    },()=>{Actions.pop();})
                })
            }).catch((error)=>this.openAlert(error));
        }
    }

    _pickImage = async () => {
        //let result = await ImagePicker.launchImageLibraryAsync({
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
        });
        // console.log(result.uri);
        if (!result.cancelled) {
          this.setState({ image: result.uri });
        }
      }

    //   openCamera= async () => {
    //     let result = await ImagePicker.launchCameraAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //       });
    //       console.log(result);
    //       if (!result.cancelled) {
    //         this.setState({ image: result.uri });
    //       }  
    //   }

    //   openImageLibrary= async () => {
    //     let result = await ImagePicker.launchImageLibraryAsync({
    //         allowsEditing: true,
    //         aspect: [4, 3],
    //       });
    //       console.log(result);
    //       if (!result.cancelled) {
    //         this.setState({ image: result.uri });
    //       }    
    //   }


  render() {
    return (

        
        <View>
            <View style={{top:30}}>
            <CustomHeader  
            Headershow={false} 
            headerName="Dashboard" 
            showDataWelcome={true} 
            showLogoutButton={true} 
            showBackbutton= {true} 
            Textwelcome={this.state.headerUsername ? this.state.headerUsername : ''} 
            onPressLogout={()=>{firebase.auth().signOut().then(()=>{Actions.reset('Home')})}} 
            onPressBack={()=>{Actions.pop()}}/>
        </View>
        <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31}}>
                    <View style={{marginTop:80}}>
                        <CustomInputText
                            placeholder=" Pet Name"
                            value={this.state.petName}
                            onChangeText={text=>this.setState({petName:text})}
                        />
                        <CustomInputText
                            placeholder=" Pet Species"
                            value={this.state.petSpecies}
                            onChangeText={text=>this.setState({petSpecies:text})}
                        />
                        <CustomInputText
                            placeholder=" Breed Name"
                            value={this.state.breedName}
                            onChangeText={text=>this.setState({breedName:text})}
                        />
                        <CustomInputText
                            placeholder=" Pet's D.O.B"
                            value={this.state.petDob}
                            onChangeText={text=>this.setState({petDob:text})}
                        />
                        <CustomInputText
                            placeholder=" Additional Information"
                            value={this.state.petInfo}
                            onChangeText={text=>this.setState({petInfo:text})}
                        />
                        <View style={{marginTop:20, alignItems:'center',height:60}}>
                            <CustomButton onPress={()=>{this.SignUpBtn()}}>Submit</CustomButton>
                        </View>
                    </View>
            </ScrollView> 
         </View>
    );
  }
  
}

const styles = StyleSheet.create({

});
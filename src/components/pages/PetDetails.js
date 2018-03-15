import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,AsyncStorage, Alert } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage,CustomCardImg} from '../common';
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
            petId:'',
            headerUsername:''
        } 
    }

    async componentWillMount(){
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null){
                console.log("asasxsa : " + value);
                this.setState({headerUsername:value});
            }
          } catch (error) {
                console.log(error)
          }

    }
    
    componentDidMount(){
        if(this.props.data){
            this.setState({
                notFound:false,
                petId:this.props.data.petId
            })
        }
    }

    pastConHistory(id){
      Actions.PastHistory({data:this.state.petId})
    }

    deletePet(){
        Alert.alert(
            'Are you sure ? ',
            'Are you sure you want to delete this Pet ?',
            [
                {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
                {text: 'Delete', onPress: () => { this.confirmDelete()}},
            ],
            { cancelable: false }
            )
    }
    confirmDelete(){
        firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/' + this.props.data.petId + '/')
        .remove()
        .then(()=>{ Actions.pop()})
    }

    render() {
        return (
            <View>
                <View style={{top:23}}>
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
                <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:40}}>

                    <CustomImage
                        imageViewStyle={{alignSelf:'center', marginBottom:10}}
                        // imageTagStyle={{height:120, width:(width-100)}}
                        imageTagStyle={{height:150, width:150, borderRadius:75}}
                        imageURL={{uri:this.props.data.image ? this.props.data.image : 'https://firebasestorage.googleapis.com/v0/b/doctorapp-539e5.appspot.com/o/No_image_3x4.svg.png?alt=media&token=a5a1f13b-694a-4a57-a1ad-4f62cbae58a9'}}
                        // imageURL={require('../../assets/images/logo.png')}
                    />
            
                    <View style={{backgroundColor:'#eceff1', width:width-20,borderWidth:1, borderColor:'#26418f',borderRadius:10,alignSelf:'center', borderBottomWidth:5, borderLeftWidth:3, margin:7}}>
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
                    <View style={{marginTop:10}}>
                        <CustomButton onPress={()=>{this.pastConHistory(this.props.data.petId)}}>Past Consultency History</CustomButton>
                    </View>
                    <Text style={{fontSize:16, fontWeight:'bold', color:'#cc3300', alignSelf:'center'}} onPress={()=>{this.deletePet()}} >Delete Pet</Text>
                    {/* <View style={{marginTop:30}}> */}
                        
                    {/* </View> */}
                </ScrollView> 
            
            </View>
        );
    }

}

const styles = StyleSheet.create({

});
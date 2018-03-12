import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,Platform, Button, Alert,AsyncStorage,ImageStore,ActivityIndicator,Modal } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
import { Actions } from 'react-native-router-flux';
import * as firebase from 'firebase';
import { ImagePicker } from 'expo';
import DatePicker from 'react-native-datepicker';

// var b64toBlob = require('b64-to-blob');

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
            headerUsername:'',
            showloading:false,
            modalVisible:false
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
            this.setState({showloading :true});
            firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/').push({
                name:this.state.petName,
                species:this.state.petSpecies,
                breedName:this.state.breedName,
                dob:this.state.petDob,
                image:this.state.image
            }).then((snap)=>{
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/' + snap.key + '/').update({
                    petId:snap.key
                }).then(()=>{
                    this.setState({
                        petName:'',
                        petSpecies:'',
                        breedName:'',
                        petDob:this.formatLocalDate(),
                        petInfo:'',
                        headerUsername:''
                    },()=>{ 
                        this.setState({showloading :false});
                        Actions.pop();
                    })
                })
            }).catch((error)=>{
                this.setState({showloading :false});
                this.openAlert(error);
            });
        }

    }

    //local date
    formatLocalDate() {
        var now = new Date(),
          tzo = -now.getTimezoneOffset(),
          dif = tzo >= 0 ? '+' : '-',
          pad = function(num) {
              var norm = Math.abs(Math.floor(num));
              return (norm < 10 ? '0' : '') + norm;
          };
          return now.getFullYear() 
              + '-' + pad(now.getMonth()+1)
              + '-' + pad(now.getDate())
          
    }
    //local date end here..

    

     _pickImage = async () => {
        this.setState({modalVisible:true})


        // //let result = await ImagePicker.launchImageLibraryAsync({
        // let result = await ImagePicker.launchCameraAsync({
        //   allowsEditing: true,
        //   aspect: [4, 3],
        // });
        // // console.log(result.uri);
        // if (!result.cancelled) {
        //   //this.setState({ image: result.uri });

        //   ImageStore.getBase64ForTag(result.uri, (data) => {
        //      let imagedata = 'data:image/jpg;base64,' + data;
        //      this.setState({image: imagedata});
        //     //  firebase.database().ref('users/')
        //     // console.log(imagedata);
        //   }, e => console.warn("getBase64ForTag: ", e))
        // }
      }

      openLibrary = async () =>{
        this.setState({modalVisible:false});
                //let result = await ImagePicker.launchImageLibraryAsync({
        let result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 4],
        });
        if (!result.cancelled) {
            this.configImg(result.uri);
        }

      }

      //open Camera
      openCamera= async () =>{
        this.setState({modalVisible:false});
        let result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 4],
        });
        if (!result.cancelled) {
            this.configImg(result.uri);
        }
      }

      //config image
      configImg(imageUri){
          ImageStore.getBase64ForTag(imageUri, (data) => {
             let imagedata = 'data:image/jpg;base64,' + data;
             this.setState({image: imagedata});
          }, e => console.warn("getBase64ForTag: ", e))
      }

      closeModal() {
        this.setState({modalVisible:false});
    }


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
                    <View style={{marginTop:30}}>
                        <TouchableOpacity onPress={()=>{this._pickImage()}}>
                            <CustomImage
                                imageViewStyle={{alignSelf:'center', marginBottom:20}}
                                // imageTagStyle={{height:120, width:(width-100)}}
                                imageTagStyle={{height:150, width:150, borderRadius:75}}
                                imageURL={{uri:this.state.image ? this.state.image : 'https://firebasestorage.googleapis.com/v0/b/doctorapp-539e5.appspot.com/o/500px-No_image_available.svg.png?alt=media&token=10d88c82-8470-4bbc-9374-82b9f5029993'}}
                                // imageURL={require('../../assets/images/logo.png')}
                            />
                        </TouchableOpacity>


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
                        {/* <CustomInputText
                            placeholder=" Pet's D.O.B"
                            value={this.state.petDob}
                            onChangeText={text=>this.setState({petDob:text})}
                        /> */}
                        <DatePicker
                                style={{width:320,margin:3, height:45,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff' }}
                                date={this.state.petDob}
                                mode="date"
                                placeholder="Select Pet's D.O.B"
                                format="YYYY-MM-DD"
                                //minDate={new Date()}
                                maxDate={new Date()}
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                dateIcon: { position: 'absolute', left: 20, top: 4, marginLeft: 0 },
                                dateInput: { borderColor:'#fff',borderWidth:0, }
                                }}
                                onDateChange={(date) => {this.setState({petDob: date})}}
                        />


                        <CustomInputText
                            placeholder=" Additional Information"
                            value={this.state.petInfo}
                            onChangeText={text=>this.setState({petInfo:text})}
                        />
                        <View style={{marginTop:20, alignItems:'center',height:60}}>
                            <CustomButton onPress={()=>{this.SignUpBtn()}}>Submit</CustomButton>
                        </View>

                    <View style={{position:"absolute", flex:1, flexDirection:'column', alignSelf:'center'}}>
                        {   //for loading and no data found 
                            this.state.showloading ? 
                                <View style={[styles.container, styles.horizontal]}>
                                    <ActivityIndicator size="large" color="#0000ff" />
                                </View>         
                            : null
                            //for loading and no data found  End.....
                        }
                    </View>

                    {/* .... Modal..... */}
                    <View style={styles.modalMainContainer}>
                        <Modal
                            visible={this.state.modalVisible}
                            animationType={'slide'}
                            transparent={true}
                            onRequestClose={() => this.closeModal()}
                        >
                            <View style={styles.modalContainer}>
                                <View style={styles.innerContainer}>
                                        <View >
                                                <Text style={{alignSelf:'center', marginTop:10, color:'#fff',fontSize:12}}>Select Image Source</Text>
                                        </View>     
                                        <View style={{flex:1, flexDirection:'column', justifyContent:'center', alignSelf:'center'}}>
                                                <View style={{margin:3}}>
                                                    <Text style={{fontSize:18, color:'#fff',alignSelf:'center'}} onPress={()=>{this.openLibrary()}}>Load from Library</Text>
                                                </View>
                                                <View style={{margin:3}}>
                                                    <Text style={{fontSize:18, color:'#fff',alignSelf:'center'}} onPress={()=>{this.openCamera()}}>Use Camera</Text>
                                                </View>
                                                <View style={{marginTop:10}}>
                                                    <Text style={{fontSize:18, color:'#ff8080',alignSelf:'center',fontSize:14, fontWeight:'bold'}} onPress={()=>{this.closeModal()}}>Cancel</Text>
                                                </View>
                                        </View>
                                </View>
                            </View>
                        </Modal>
                    </View>

                </View>
            </ScrollView> 

         </View>
    );
  }
  
}

const styles = StyleSheet.create({
   //for loading
   container: {
    top:height/3,
    flex: 1,
    justifyContent: 'center',
   // alignSelf:'center'
  },
  horizontal: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10
  },
  //loading end


    modalMainContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignSelf:'center'
    // backgroundColor: 'grey',
    },
    innerContainer: {
        //alignItems: 'center',
        alignSelf:'center',
        height:170,
        width:width-90,
        backgroundColor: '#7986cb',
        borderBottomWidth:5,
        borderLeftWidth:2,
        borderWidth:1,
        borderRadius:20,
        borderColor:'#3f51b5'
    }


});
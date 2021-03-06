import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,
    Image,ScrollView,Picker,AsyncStorage,ActivityIndicator,Platform, PickerIOS } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
 import { Actions } from 'react-native-router-flux';
 import DatePicker from 'react-native-datepicker';
 import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class Appointment extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            alldata:[],
            date: this.formatLocalDate(),
            time:'',
            selectPet:null,
            username:'',
            diseases:'',
            mobile:'',
            prefDoct:'',
            comment:'',
            allDoctor:[],
            headerUsername:'',
            showloading:false
        }
    }

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


    async componentWillMount(){
        let ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/');
        let docRef = firebase.database().ref('users/');
        ref.on('value',(snapshot)=>{
            if(snapshot.val()){
                let datasnap=[];
                let data = snapshot.val();
                for (let key in data) {
                    datasnap.push(data[key]);
                }
                this.setState({alldata:datasnap})
            }
        })
        docRef.on('value',(snap)=>{
            if(snap.val()){
                let dData = snap.val();
                var doctors=[];
                for (let key in dData){
                    dData[key].uid = key;
                    if(dData[key].type){
                        if(dData[key].type == 'doctor'){
                            doctors.push(dData[key]);
                        }
                    }
                }
                this.setState({allDoctor:doctors});
            }
        })

        //search username
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null){
            this.setState({headerUsername:value});
            }
          } catch (error) { console.log(error) }


    }
    

    openAlert(msg){
        alert(msg);
    }

    //submit pet Appointment
    SubmitPet(){

        if(this.state.date =='' || this.state.date == undefined || this.state.date == null ||
            this.state.time == '' || this.state.time == undefined || this.state.time == null || 
            this.state.selectPet == ''|| this.state.selectPet == undefined || this.state.selectPet == null ||
            this.state.diseases == '' || this.state.diseases == undefined || this.state.diseases == null ||
            this.state.username == '' || this.state.username == undefined || this.state.username == null ||
            this.state.mobile =='' || this.state.mobile == undefined || this.state.mobile == null ||
            this.state.prefDoct == '' || this.state.prefDoct == undefined || this.state.prefDoct == null
            ){

                if(this.state.date =='' || this.state.date == undefined || this.state.date == null){
                    this.openAlert("Date field can not be blank");
                }else if(this.state.time == '' || this.state.time == undefined || this.state.time == null){
                    this.openAlert("Time field can not be blank");
                }else if(this.state.selectPet == ''|| this.state.selectPet == undefined || this.state.selectPet == null){
                    this.openAlert("Pet field can not be blank");
                }else if(this.state.diseases == '' || this.state.diseases == undefined || this.state.diseases == null){
                    this.openAlert("Diseases can not be blank");
                }else if(this.state.username == '' || this.state.username == undefined || this.state.username == null){
                    this.openAlert("Username cannot be blank");
                }else if(this.state.mobile =='' || this.state.mobile == undefined || this.state.mobile == null){
                    this.openAlert("Mobile cannot be blank");
                }else if(this.state.prefDoct == '' || this.state.prefDoct == undefined || this.state.prefDoct == null){
                    this.openAlert("Doctor cannot be blank");
                }

                
            }else{
                this.setState({showloading:true});
                let data={
                    date:this.state.date,
                    time:this.state.time,
                    selectPet:this.state.selectPet.petId,
                    petname:this.state.selectPet.name,
                    species:this.state.selectPet.species,
                    breed:this.state.selectPet.breedName,
                    ownerUsername:this.state.username,
                    ownerContact:this.state.mobile,
                    doctor:this.state.prefDoct,
                    diseases:this.state.diseases,
                    ownerUid:firebase.auth().currentUser.uid,
                    comment:this.state.comment
                }
                firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/' + this.state.selectPet.petId + '/myAppointment/').push(data).then((success)=>{
                    firebase.database().ref('users/' + this.state.prefDoct + '/myAppointment/' + success.key + '/' ).set(data);
                    firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/myAppointment/' + success.key + '/' ).set(data);
                    firebase.database().ref('myAppointment/' +  success.key +'/' ).set(data)
                    .then(()=>{
                        this.setState({showloading:false});
                        Actions.pop();
                    });
                }).catch((error)=>{
                    this.setState({showloading:false});
                    console.log(error); 
                    this.openAlert(error)
                });
            }
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
                Textwelcome={this.state.headerUsername ? this.state.headerUsername :''} 
                onPressLogout={()=>{firebase.auth().signOut().then(()=>{Actions.reset('Home')})}}  
                onPressBack={()=>{Actions.pop()}}/>
            </View>
            <View style={{top:32, height:45, width:width, borderWidth:0.5, borderColor:'#002984', borderTopColor:'#002984'}}>
                <Text style={{alignSelf:'center',fontSize:20,padding:5, fontWeight:'bold', color:'#002984' }}>Book Appointment</Text>
            </View>
            <ScrollView style={{height:Dimensions.get('window').height-120, marginTop:31}}>
            
                <View style={{marginTop:30}}>
                    <DatePicker
                        style={{width:width-40,margin:3, height:45,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff' }}
                        date={this.state.date}
                        mode="date"
                        placeholder="Select Date"
                        format="YYYY-MM-DD"
                        minDate={new Date()}
                        //maxDate="2016-06-01"
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: { position: 'absolute', left: 20, top: 4, marginLeft: 0 },
                        dateInput: { borderColor:'#fff',borderWidth:0, }
                        }}
                        onDateChange={(date) => {this.setState({date: date})}}
                    />
                    <DatePicker
                        style={{width:width-40,margin:3, height:45,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff' }}
                        date={this.state.time}
                        mode="time"
                        placeholder="Select Time"
                        format="HH : MM"
                        //minDate={new Date()}
                        //maxDate="2016-06-01"
                        //is24Hour={false}
                        iconSource={require('/Users/pradip/Projects/DoctorApp/src/assets/images/AlarmSaveTime.png')}
                        is24Hour={true}
                        confirmBtnText="Confirm"
                        cancelBtnText="Cancel"
                        customStyles={{
                        dateIcon: { position: 'absolute', left: 20, top: 4, marginLeft: 0 },
                        dateInput: { borderColor:'#fff',borderWidth:0, }
                        }}
                        onDateChange={(time) => {console.log(time);this.setState({time: time})}}
                    />
                    {Platform.OS != 'ios' ? 
                        <View style={{width:width-40, height:45,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff', margin:3 }}>
                            <Picker
                                style={{width:width-80, height:35,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff'}}
                                selectedValue={this.state.selectPet}
                                onValueChange={(itemValue, itemIndex) => {this.setState({selectPet: itemValue},()=>{console.log(this.state.selectPet)});}}>
                                <Picker.Item label='Select Your Pet' value={null} />
                                {
                                    this.state.alldata? 
                                    this.state.alldata.map((item, index)=>{
                                        return <Picker.Item label={item.name} value={item} />
                                    })
                                    :null
                                }
                            </Picker>
                        </View>
                        :<Picker
                        style={{width:width-80, height:35,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff'}}
                        selectedValue={this.state.selectPet}
                        onValueChange={(itemValue, itemIndex) => {this.setState({selectPet: itemValue},()=>{console.log(this.state.selectPet)});}}>
                        <Picker.Item label='Select Your Pet' value={null} />
                        {
                            this.state.alldata? 
                            this.state.alldata.map((item, index)=>{
                                return <Picker.Item label={item.name} value={item} />
                            })
                            :null
                        }
                    </Picker>
                    }

                    <CustomInputText
                        placeholder=" Please Enter diseases"
                        value={this.state.diseases}
                        onChangeText={text=>this.setState({diseases:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter Username"
                        value={this.state.username}
                        onChangeText={text=>this.setState({username:text})}
                    />
                    <CustomInputText
                        placeholder=" Please Enter Mobile Number"
                        value={this.state.mobile}
                        keyboardType={'numeric'}
                        onChangeText={text=>this.setState({mobile:text})}
                    />
                        {Platform.OS != 'ios' ? 
                            <View style={{width:width-40, height:45,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff', margin:3 }}>
                                <Picker
                                    style={{width:width-80, height:35,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff' }}
                                    selectedValue={this.state.prefDoct}
                                    onValueChange={(itemValue, itemIndex) => this.setState({prefDoct: itemValue})}>
                                    <Picker.Item label='Preffered Doctor' value={null} />
                                    {
                                        this.state.allDoctor? 
                                        this.state.allDoctor.map((item, index)=>{
                                            return <Picker.Item label={item.name} value={item.uid} />
                                        })
                                        :null
                                    }
                                </Picker>
                            </View>
                            :<Text>i am ios platform</Text>
                        }
                    <CustomInputText
                        placeholder=" Additional Comments"
                        value={this.state.comment}
                        onChangeText={text=>this.setState({comment:text})}
                    />
                    <View style={{marginTop:10, alignItems:'center'}}>
                        <CustomButton onPress={()=>{this.SubmitPet()}}>Submit</CustomButton>
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

                    <View style={{marginTop:10, alignItems:'center', height:50}}>
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
    top:height/4,
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
});
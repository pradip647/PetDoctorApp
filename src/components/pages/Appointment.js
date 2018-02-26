import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,Picker } from 'react-native';
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
            date: new Date(),
            time:'',
            selectPet:'',
            username:'',
            mobile:'',
            prefDoct:'',
            comment:''


        }
    }
    componentWillMount(){
        let ref = firebase.database().ref('users/' + firebase.auth().currentUser.uid + '/mypets/');
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
    }

    SignUpBtn(){
       

    }

    openAlert(msg){
        alert(msg);
    }


  render() {
    return (
        // <View>

        
        <View>
            <View style={{top:30}}>
            <CustomHeader  Headershow={false} headerName="Dashboard" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
        </View>
        <View style={{top:32, height:50, width:width, borderWidth:0.5, borderColor:'#002984', borderTopColor:'#002984'}}>
            <Text style={{alignSelf:'center',fontSize:20,padding:5, fontWeight:'bold', color:'#002984' }}>Book Appointment</Text>
        </View>
        <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31}}>
          
                    <View style={{marginTop:30}}>

                        <DatePicker
                                style={{width:320, height:45,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff' }}
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

                        <CustomInputText
                            placeholder=" Time"
                            value={this.state.name}
                            onChangeText={text=>this.setState({name:text})}
                        />

                        <View style={{width:320, height:45,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff' }}>
                            <Picker
                                style={{width:200, height:35,borderRadius:35, borderColor:'#3f51b5', borderWidth:1, alignSelf:'center', backgroundColor:'#fff' }}
                                selectedValue={this.state.selectPet}
                                onValueChange={(itemValue, itemIndex) => this.setState({selectPet: itemValue})}>
                                <Picker.Item label='Select Your Pet' value={null} />
                                {
                                    this.state.alldata? 
                                    this.state.alldata.map((item, index)=>{
                                        return <Picker.Item label={item.name} value={item.petId} />
                                    })
                                    :null
                                }
                            </Picker>
                        </View>
                        
                        <CustomInputText
                            placeholder=" Please Enter Username"
                            value={this.state.username}
                            onChangeText={text=>this.setState({username:text})}
                        />
                        <CustomInputText
                            placeholder=" Please Enter Mobile Number"
                            value={this.state.ic}
                            onChangeText={text=>this.setState({mobile:text})}
                        />
                        <CustomInputText
                            placeholder=" Preffered Dr"
                            value={this.state.hp}
                            onChangeText={text=>this.setState({hp:text})}
                        />
                        <CustomInputText
                            placeholder=" Additional Comments"
                            value={this.state.password}
                            onChangeText={text=>this.setState({password:text})}
                        />
                        <View style={{marginTop:20, alignItems:'center'}}>
                            <CustomButton onPress={()=>{this.SubmitPet()}}>Submit</CustomButton>
                        </View>
                    </View> 
            </ScrollView> 
         </View>
    );
  }
}

const styles = StyleSheet.create({

});
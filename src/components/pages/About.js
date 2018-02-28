import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage} from '../common';
// import { ScrollView } from 'react-native-gesture-handler';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';

var {height, width} = Dimensions.get('window');
export default class About extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
    }

  render() {
    return (
        // <View>

        <View>
            <View style={{top:30}}>
                <CustomHeader  Headershow={true} headerName="About Us" showDataWelcome={false} showLogoutButton={false} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>
            </View>
            <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31}}>
                    <CustomImage
                        imageViewStyle={{alignSelf:'center'}}
                        imageTagStyle={{height:120, width:(width-100)}}
                        //imageURL={{uri:'http://www.imag.co.uk/images/gravel/raisby-golden-gravel-lg-1.jpg'}}
                        imageURL={require('../../assets/images/logo.png')}
                    />

                    <View style={{marginTop:30, padding:10}}>
                        <Text> 
                            Our first veterinary clinic has grew by leaps & bounds since it’s opening in 1972 by our founder, Dr S. Sivagurunathan. He is a founding member of VET-ONE USA (1975) and the second Asian member to join Veterinary Emergency and Critical Care Society (VECCS) in 1978. He was a pioneer in emergency veterinary services in Malaysia. Dr Sivagurunathan was appointed an Associate Professor Madya at UPM in 1990 for his early work in animal welfare and lectured the undergraduates on welfare and ethics. He was a Past President of the Veterinary Association of Malaysia (VAM), Malaysian Small Animal Veterinary Association (MSAVA)-  formerly SAPAM and a senior past member of the Malaysian Veterinary Council (MVC). He is currently an active in a number of boards and foundations.
                            During our 25th Anniversary in 1997, Dr S Sivagurunathan, launched his book “Pets Have Feelings Too” that payed tribute to the life and times of a young practitioner in his early days of veterinary medicine in Malaysia.  The event was officiated by the Minister of Agriculture at the time, YBhg Tan Sri Amar Sulaiman Daud.

                        </Text>
                        <Text> 
                            Since then, we have introduced various facilities and services in-line with international standards of practice in two veterinary practices in the Klang Valley. Our corporate headquarters, Animal Medical Centre is an internationally accredited referral hospital.
                        </Text>
                    </View>       
            </ScrollView> 
         </View>



    
    );
  }
}

const styles = StyleSheet.create({

});
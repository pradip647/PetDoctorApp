import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,AsyncStorage,ActivityIndicator } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage,CustomCardImg} from '../common';
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
            dataFound:true,
            headerUsername:'',
            showloading:true
        }

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
                        showloading:false,
                        allPets:alldata,
                        dataFound:false
                    },()=>{console.log(this.state.allPets)})
                } else{
                    this.setState({
                        showloading:false,
                        dataFound:true
                    },()=>{console.log(this.state.allPets)})
                }
            },1000) 
        })
    }

    //componentWillMount lifecycle
    async componentWillMount(){
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null){
                console.log("username : " + value);
            this.setState({headerUsername:value});
            }
          } catch (error) { console.log(error) }
    }

    //open alert
    openAlert(msg){
        alert(msg);
    }

    //go to patientlist function
    gotoPetDetails(data){
        Actions.PetDetails({data:data})
    }


  render() {
    return (
        <View > 
            <View style={{top:30}}>
            <CustomHeader  
                Headershow={false} 
                headerName="Dashboard" 
                showDataWelcome={true} 
                showLogoutButton={true} 
                showBackbutton= {true} 
                Textwelcome={this.state.headerUsername ? this.state.headerUsername : ''} 
                onPressLogout={()=>{firebase.auth().signOut().then(()=>{Actions.reset('Home')})}}  
                onPressBack={()=>{Actions.pop()}}
            />
            </View>
            {   //for loading and no data found 
                this.state.showloading ? 
                    <View style={[styles.container, styles.horizontal]}>
                        <ActivityIndicator size="large" color="#0000ff" />
                    </View>         
                :   
                    <View>
                        { this.state.dataFound ? 
                            <View style={{top:height/3, alignSelf:'center'}}><Text style={{fontWeight:'bold', fontSize:20}}>No Data found...</Text></View>
                            :null
                        }
                    </View>
                //for loading and no data found  End.....
            }
            <ScrollView style={{height:Dimensions.get('window').height-90, marginTop:31, alignSelf:'center'}}>
                {this.state.allPets ? 
                    this.state.allPets.map((item, index)=>{
                        return ( 
                            <TouchableOpacity onPress={()=>{this.gotoPetDetails(item)}} style={{margin:5, width:width-20, height:70, borderColor:'#00227a',borderWidth:1 }} key={item.petId}>
                                <View style={{flex:1, flexDirection:'row',justifyContent:'space-around'}}>
                                    <Image
                                            style={{height:68, width:100}}
                                            //styleName="small rounded-corners"
                                            //source={{ uri: 'https://shoutem.github.io/img/ui-toolkit/examples/image-10.png' }}
                                            source={{uri:item.image ? item.image : 'https://firebasestorage.googleapis.com/v0/b/doctorapp-539e5.appspot.com/o/No_image_3x4.svg.png?alt=media&token=a5a1f13b-694a-4a57-a1ad-4f62cbae58a9'}}
                                            // source={require('../../assets/images/dogone.jpg')}
                                        />
                                    <View style={{ width:width-90}}>
                                        <View style={{flex:1, flexDirection:'column'}}>
                                            <View><Text style={{top:10, left:40, fontWeight:'bold', fontSize:18}}>{item.name}</Text></View>
                                            <View><Text style={{top:10, left:40, }}>{item.species}</Text></View>
                                        </View>
                                    </View>
                                </View>
                                {/* <View style={{position:'absolute', left:5,}}>
                                    <Text>Delete</Text>
                                </View> */}
                            </TouchableOpacity>
                        )
                    }) : null
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
    //for loading
    container: {
        top:height/5,
        flex: 1,
        justifyContent: 'center',
       // alignSelf:'center'
      },
      horizontal: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        padding: 10
      }
      //loading end
});
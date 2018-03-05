import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView,AsyncStorage,ActivityIndicator } from 'react-native';
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
            dataFound:true,
            headerUsername:'',
            showloading:true
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
                        showloading:false,
                        allPets:alldata,
                        dataFound:false
                    },()=>{console.log(this.state.allPets)})
                } else{
                    this.setState({
                        //allPets:[],
                        showloading:false,
                        dataFound:true
                    },()=>{console.log(this.state.allPets)})
                }
            },1000)
            
        })

    }

    async componentWillMount(){
        try {
            const value = await AsyncStorage.getItem('username');
            if (value !== null){
                console.log("username : " + value);
            this.setState({headerUsername:value});
            }
          } catch (error) { console.log(error) }

    }

    

   

    openAlert(msg){
        alert(msg);
    }

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
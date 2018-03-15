import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage,CustomCardImg} from '../common';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';
import MapView,{Marker, Callout} from 'react-native-maps';
import ActionButton from 'react-native-action-button';
import { Icon } from 'react-native-elements';
import getDirections from 'react-native-google-maps-directions';

var {height, width} = Dimensions.get('window');
export default class Map extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            region: {
                latitude: 22.688208799999998,
                longitude: 88.47114280000005,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
        
    }
      onRegionChange(region) {
        this.setState({ region });
      }

      goToNavigate(){
          navigator.geolocation.getCurrentPosition(
            (position) => {
                  const data = {
                  source: {
                      latitude: position.coords.latitude,
                      longitude: position.coords.longitude
                  },
                  destination: {
                      latitude: this.state.region.latitude,
                      longitude: this.state.region.longitude
                  },
                  params: [
                      {
                      key: "dirflg",
                      value: "w"
                      }
                  ]
                  }
                  console.log(data);
                  getDirections(data);
          },
            (error) => console.log(error.message),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
          );
      }

  render() {
    return (
      <ScrollView style={{ flex: 1 ,top:(height-(height-24))}}>
        <View>
            <CustomHeader  Headershow={true} headerName="Location" showDataWelcome={false} showLogoutButton={false} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{Actions.pop()}}/>   
        </View>
          <MapView 
            style={{ height: height}}
            region={this.state.region}
          >
              <Marker
                  coordinate={this.state.region}
                  title={"Pet Care Clinic"}
                  description={"3 no, Sreenagar, madhyamgram, kol-700129"}
              />
          </MapView>
              <ActionButton
                style={{position:'absolute', bottom:100,}}
                buttonColor="transparent"
                onPress={() => { this.goToNavigate()}}
                renderIcon={active => active ? (<Icon name="ios-navigate" type='ionicon' color='rgba(231,76,60,1)' size={50} /> ) : (<Icon name="ios-navigate" type='ionicon' color='#000' size={50} />)}
              />
            </ScrollView>
    );
  }
}

const styles = StyleSheet.create({

});
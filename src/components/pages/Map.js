import React from 'react';
import { StyleSheet, Text, View,TextInput,Dimensions,TouchableOpacity ,Image,ScrollView } from 'react-native';
import { CustomHeader,CustomButton,CustomInputText,CustomImage,CustomCardImg} from '../common';
 import { Actions } from 'react-native-router-flux';
 import * as firebase from 'firebase';
//  import { MapView } from 'expo';
import MapView,{Marker, Callout} from 'react-native-maps';

var {height, width} = Dimensions.get('window');
export default class Map extends React.Component {
    
    static navigationOptions = {
        header: null,
    };
    constructor(props){
        super(props);
        this.state={
            region: {
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
        }
        
    }
      onRegionChange(region) {
        this.setState({ region });
      }

  render() {
    return (
            <MapView
              style={{ flex: 1 }}
              region={this.state.region}
              // onRegionChange={this.onRegionChange}
            >
                <Marker
                    coordinate={this.state.region}
                    title={"Pet Care Clinic"}
                    description={"3 no, Sreenagar, madhyamgram, kol-700129"}
                >
                </Marker>
            </MapView>
    );
  }
}

const styles = StyleSheet.create({

});
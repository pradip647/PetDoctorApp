import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator,AsyncStorage } from 'react-native';
import {Router, Route, Schema, Animations, TabBar,Stack,Scene, Actions,Lightbox} from 'react-native-router-flux'
//Custom component
import {CustomHeader} from './src/components/common';
//pages
import Home from './src/components/pages/Home';
import Login from './src/components/pages/Login';
import Register from './src/components/pages/Register';
import MainPage from './src/components/pages/Dashboard';
import Pets from './src/components/pages/Pets';
import AdPet from './src/components/pages/Adpet';
import PetDetails from './src/components/pages/PetDetails';
import Appointment from './src/components/pages/Appointment';
import PastHistory from './src/components/pages/PastHistory';
import Reminder from './src/components/pages/Reminder';
import About from './src/components/pages/About';
import Contact from './src/components/pages/Contact';

import * as firebase from 'firebase';
import Map from './src/components/pages/Map';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      openLoading:true
    }
  }
  componentWillMount(){
    var config = {
      apiKey: "AIzaSyAVmrAnSfnYJb2nAlhlxQo6rKm7oEUL7s4",
      authDomain: "doctorapp-539e5.firebaseapp.com",
      databaseURL: "https://doctorapp-539e5.firebaseio.com",
      projectId: "doctorapp-539e5",
      storageBucket: "doctorapp-539e5.appspot.com",
      messagingSenderId: "955540918554"
    };
    firebase.initializeApp(config);
    console.disableYellowBox = true;

    firebase.auth().onAuthStateChanged((user)=>{
        if(user){
          let userRef = firebase.database().ref('users/' + user.uid);
          userRef.once('value',(snapshot)=>{
            if(snapshot.val()){
              if(snapshot.val().username){
                let username = snapshot.val().username
;                try {
                  // AsyncStorage.setItem('username', value);
                  AsyncStorage.setItem('username', username);
                } catch (error) {
                  // Error saving data
                }

              }
            }
          })


          
          this.setState({ openLoading:false });
          Actions.reset('MainPage')
        }else{
          this.setState({ openLoading:false });
        }
    })


  }

  compo

  render() {
      if (this.state.openLoading){
          return (
              <View style={[styles.container, styles.horizontal]}>
                  <ActivityIndicator size="large" color="#0000ff" />
              </View>
          )
      }else{
              return (
              <Router>
                <Scene key="root">
                  <Scene key="Home" component={Home}  /> 
                  <Scene key="MainPage" component={MainPage} />
                  <Scene key="Login" component={Login} />
                  <Scene key="Register" component={Register} />
                  <Scene key="Pets" component={Pets} />
                  <Scene key="AdPet" component={AdPet} />
                  <Scene key="PetDetails" component={PetDetails} />
                  <Scene key="Appointment" component={Appointment} />
                  <Scene key="PastHistory" component={PastHistory} />
                  <Scene key="Reminder" component={Reminder} />
                  <Scene key="About" component={About} />
                  <Scene key="Contact" component={Contact} />
                  <Scene key="Map" component={Map} />
                </Scene>
              </Router>
              )
      }
  }

}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center'
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10
    }
})

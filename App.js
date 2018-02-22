import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {CustomHeader} from './src/components/common';
import Home from './src/components/pages/Home';
import Login from './src/components/pages/Login';
import Register from './src/components/pages/Register';
import MainPage from './src/components/pages/Dashboard';
import Pets from './src/components/pages/Pets';
import AdPet from './src/components/pages/Adpet'

import {Router, Route, Schema, Animations, TabBar,Stack,Scene, Actions} from 'react-native-router-flux'
import * as firebase from 'firebase';


export default class App extends React.Component {
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


  }

  render() {
    return (
//       <View style={styles.container}>
// <CustomHeader propdata="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{alert("back icon Clicked")}} />
//         <Text>Open up App.js to start working on your app!</Text>
//         <Text>Changes you make will automatically reload.</Text>
//         <Text>Shake your phone to open the developer menu.</Text>
//       </View>
      <Router>
        <Stack key="root">
            <Scene key="Home" component={Home} />
            <Scene key="Login" component={Login} />
            <Scene key="MainPage" component={MainPage} />
            <Scene key="Register" component={Register} />
            <Scene key="Pets" component={Pets} />
            <Scene key="AdPet" component={AdPet} />
            
        </Stack>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

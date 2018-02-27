import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import {CustomHeader} from '../common'
import Home from './Home';
import Login from './Login';
import Register from './Register';
import MainPage from './Dashboard';
import Pets from './Pets';
import AdPet from './Adpet';
import PetDetails from './PetDetails';
import Appointment from './Appointment';

import {Router, Route, Schema, Animations, TabBar,Stack,Scene, Actions,Lightbox} from 'react-native-router-flux'
import * as firebase from 'firebase';


export default class FailPage extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loggedin:false,
      openLoading:true
    }
  }


  render() {
            return (
              <Router>
                <Stack key="root">
                  <Scene key="Home" component={Home} /> 
                  <Scene key="MainPage" component={MainPage} />
                  <Scene key="Login" component={Login} />
                  <Scene key="Register" component={Register} />
                  <Scene key="Pets" component={Pets} />
                  <Scene key="AdPet" component={AdPet} />
                  <Scene key="PetDetails" component={PetDetails} />
                  <Scene key="Appointment" component={Appointment} />
                </Stack>
              </Router>
            );
    
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
import React from 'react';
import { StyleSheet, Text, View,ActivityIndicator } from 'react-native';
import {CustomHeader} from './src/components/common';
import Home from './src/components/pages/Home';
import Login from './src/components/pages/Login';
import Register from './src/components/pages/Register';
import MainPage from './src/components/pages/Dashboard';
import Pets from './src/components/pages/Pets';
import AdPet from './src/components/pages/Adpet';
import PetDetails from './src/components/pages/PetDetails';
import Appointment from './src/components/pages/Appointment';
import SuccessPage from './src/components/pages/Success';
import FailPage from './src/components/pages/Fail';
import PastHistory from './src/components/pages/PastHistory';

import {Router, Route, Schema, Animations, TabBar,Stack,Scene, Actions,Lightbox} from 'react-native-router-flux'
import * as firebase from 'firebase';


export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state={
      loggedin:false,
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
        console.log("user found");
        this.setState({
          loggedin:true,
          openLoading:false
        });
      }else{
        console.log("user not found");
        this.setState({
          loggedin:false,
          openLoading:false
        });
      }
    })

  }

  render() {
      if (this.state.openLoading){
        return (<View style={[styles.container, styles.horizontal]}>
              <ActivityIndicator size="large" color="#0000ff" />
        </View>
        )
      }else{
         // if(this.state.loggedin){
            //return (
              // <SuccessPage />
             // <MainPage />

              



              // <Router>
              //   <Lightbox>
              //         {this.state.loggedin ? 
              //         <Scene key="root">
              //         <Scene key="MainPage" component={MainPage} />
              //         <Scene key="Home" component={Home} /> 
              //         </Scene>
              //         :
              //         <Scene key="root">
              //         <Scene key="Home" component={Home} /> 
              //         <Scene key="MainPage" component={MainPage} />
              //         </Scene>
              //         }
              //     <Scene key="Login" component={Login} />
              //     <Scene key="Register" component={Register} />
              //     <Scene key="Pets" component={Pets} />
              //     <Scene key="AdPet" component={AdPet} />
              //     <Scene key="PetDetails" component={PetDetails} />
              //     <Scene key="Appointment" component={Appointment} />
              //   </Lightbox>
              // </Router>


              //);


            // return(
            //   <Router>
            //     <Stack key="root">
            //       <Scene key="MainPage" component={MainPage} />
            //       <Scene key="Home" component={Home} /> 
            //       <Scene key="Login" component={Login} />
            //       <Scene key="Register" component={Register} />
            //       <Scene key="Pets" component={Pets} />
            //       <Scene key="AdPet" component={AdPet} />
            //       <Scene key="PetDetails" component={PetDetails} />
            //       <Scene key="Appointment" component={Appointment} />
            //     </Stack>
            //   </Router>
            // )
        //  }else{
           // return (
              // <FailPage />
             // <Home/>
           // );
            return(
              <Router>
              {/* <Stack key="root"> */}
              <Stack key="root">
                <Scene key="Home" component={Home} /> 
                <Scene key="MainPage" component={MainPage} />
                <Scene key="Login" component={Login} />
                <Scene key="Register" component={Register} />
                <Scene key="Pets" component={Pets} />
                <Scene key="AdPet" component={AdPet} />
                <Scene key="PetDetails" component={PetDetails} />
                <Scene key="Appointment" component={Appointment} />
                <Scene key="PastHistory" component={PastHistory} />
              </Stack>
            </Router>
            )
          }
     // }

    
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

import React from 'react';
import {Text, View, TouchableOpacity,Dimensions} from 'react-native';
// import {Divider,Card,Subtitle, Image, Caption,Row , ImageBackground,Tile,Title } from '@shoutem/ui';
import { Icon } from 'react-native-elements'

//make a compontent

//  { onPressLogout }  props is for logout button click function
//  { onPressBack }  props is for back button click function
//  { Textwelcome } props and { showDataWelcome } props is for showing Wellcome View
//  { showBackbutton } props is for showing Back button
//  { showLogoutButton } props is for showing  Logout Button
//  { Headershow } props and { headerName } props is for showing only Header view

/*  for Example
<CustomHeader  Headershow={true} headerName="Home Page" showDataWelcome={true} showLogoutButton={true} showBackbutton= {true} Textwelcome="Pradip" onPressLogout={()=>{alert("Logout Clicked")}} onPressBack={()=>{alert("back icon Clicked")}}/>
*/

const CustomHeader = ({
        onPressLogout,
        onPressBack, 
        props, 
        Textwelcome, 
        showBackbutton,
        showLogoutButton,
        showDataWelcome,
        Headershow,
        headerName
    }) =>{
        
    const {mainView, mainFlex, childFlex, backIconView, welcomeView,wellcomeFlex,welcomeText,wellcomeNameText, logoutView, logoutTouch, headerView } = styles;


    showbackbutton=()=>{
        if(showBackbutton){
            return(
                <View style={backIconView}>
                    <TouchableOpacity onPress={onPressBack} >
                        <Icon size={40} color='#fff'  name='chevron-left' />
                    </TouchableOpacity>
                </View>
            )
        }
    }

    showLogout=()=>{
        if(showLogoutButton){
            return(
                <View style={logoutView} >
                    <TouchableOpacity onPress={onPressLogout} style={logoutTouch} >     
                            <Text style={welcomeText}>Logout</Text>
                    </TouchableOpacity>
                </View>
            )
        }
    }

    showWelcomeData=()=>{
        if(showDataWelcome){
            return (
                <View style={welcomeView}>
                <View style={wellcomeFlex}>
                    <View><Text style={welcomeText}>Welcome</Text></View>
                    <View ><Text style={wellcomeNameText}>{Textwelcome}</Text></View>
                    </View>
                </View>
            )
        }
    }

    showHeader=()=>{
        if(Headershow){
            return (
                <View style={headerView}>
                    <Text style={welcomeText}>{headerName}</Text>
                </View>
            )
        }

    }

    
    return (
        <View>
             <View style={mainView}>
                <View style={mainFlex}>
                    <View>
                        <View style={childFlex}>
                            {this.showbackbutton()}
                            {this.showWelcomeData()}
                            {this.showHeader()}    
                        </View>
                    </View>
                    {this.showLogout()}
                </View>
            </View>
        </View>
    );
};

const styles = {
    mainView:{height:60, backgroundColor:'#757de8'},
    mainFlex: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', position: 'absolute', width: Dimensions.get('window').width },
    childFlex:{flex: 1, flexDirection: 'row', justifyContent: 'space-between'},
    backIconView:{marginTop:10,left:5, marginBottom:10},
    welcomeView:{marginTop:10,left:7, marginBottom:10},
    wellcomeFlex:{flex: 1, flexDirection: 'column'},
    welcomeText:{color:'#fff',
     //fontFamily:'ColabReg', 
     fontWeight:'bold'},
    wellcomeNameText:{color:'#fff',
    //  fontFamily:'ColabReg'
    },
    headerView:{alignItems:'center',position:'absolute',marginTop:20,width:Dimensions.get('window').width},
    logoutView:{marginTop:15, marginBottom:10},
    logoutTouch:{width:70, height:30}



}
//make the component available to other parts of the app
export default CustomHeader;
import React from 'react';
import { Text, View,TouchableOpacity,StyleSheet} from 'react-native';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class TransactionScreen extends React.Component {
  constructor(){
    super();
    this.state={
      hasCameraPermisions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal'

    }
  }
  getCameraPermisions=async () => {
      const { status } = await Permissions.askAsync(Permisions.CAMERA)
      this.setState({
        hasCameraPermissions:status === 'granted',
        buttonState:'clicked',
        scanned:false
      })
    }
    handleBarCodeScanned=async ({type,data}) => {
      this.setState({
        scanned:true,
        scannedData:data,
        buttonState:'normal'
      })
    }
    render() {
      const hasCameraPermisions=this.state.hasCameraPermisions;
      const scanned=this.state.scanned;
      const buttonState=this.state.buttonState;
      if (buttonState==="clicked" && hasCameraPermissions) {
        return(
          <BarCodeScanner 
          onBarCodeScanned={scanned? undefined:this.handleBarCodeScanned} style={StyleSheet.absoluteFillObject}></BarCodeScanner>
        )
      }
      else if(buttonState==="normal"){

      
      return (
        <View style={styles.container}>
          <Text style={styles.displayText}>{
            hasCameraPermisions=== true ?
            this.state.scannedData:
            "Request Camera Permission"
          }</Text>
          <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermisions}>
            <Text style={styles.displayText}>Scan QR Code</Text>
          </TouchableOpacity>
        </View>
      );
    }
  }
}
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    displayText:{
      fontSize:15,
      textDecorationLine:'underline',
    },
    scanButton:{
      backgroundColor:"blue",
      padding:10,
      margin:10
    }
  });
  
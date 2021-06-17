import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from 'react-native';
import NotifService from './NotifService';
import Sound from 'react-native-sound';


export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTime: 10
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );

    this.sound = new Sound('shutup.mp3');
  }


  playSound = () => {
    this.sound.play()
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          ShutApp
        </Text>
        <Text style={{marginVertical: 20}}>How many times do I need to remind you to shut up ?</Text>
        <Text>Every: </Text>
      </View>
    );
  }

  /*
  <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif();
          }}>
          <Text>Local Notification (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.localNotif('shutup.mp3');
          }}>
          <Text>Local Notification with sound (now)</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif();
          }}>
          <Text>Schedule Notification in 30s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            this.notif.scheduleNotif('shutup.mp3');
          }}>
          <Text>Schedule Notification with sound in 5s</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={this.playSound}>
          <Text>Reminder</Text>
        </TouchableOpacity>
   */

  onRegister(token) {
    this.setState({registerToken: token.token, fcmRegistered: true});
  }

  onNotif(notif) {
    Alert.alert(notif.title, notif.message);
  }

  handlePerm(perms) {
    Alert.alert('Permissions', JSON.stringify(perms));
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    color: "purple"
  },
});
import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Button
} from 'react-native';
import NotifService from './NotifService';
import Sound from 'react-native-sound';
import DateTimePicker from '@react-native-community/datetimepicker';
import LottieView from 'lottie-react-native';



export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date: new Date(),
      mode: 'date',
      show: false
    };

    this.notif = new NotifService(
      this.onRegister.bind(this),
      this.onNotif.bind(this),
    );

    this.sound = new Sound('shutup.mp3');
    this.setState.bind({date: this.state.date.setSeconds(0)})
  }

  onChange = (event, selectedDate) => {
    const currentDate = selectedDate || this.state.date;
    this.setState({show: Platform.OS === 'ios', date: currentDate});
    this.notif.scheduleNotif('shutup.mp3', this.state.date);
  };

  showMode = (currentMode) => {
    this.setState({show: true, mode: currentMode});
  };

  showDatepicker = () => {
    this.showMode('date');
  };

  showTimepicker = () => {
    this.showMode('time');
  };

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
        <Text>Set the goddam time: </Text>
        <View>
          <Button onPress={this.showDatepicker} title="Show date picker!" />
        </View>
        <View>
          <Button onPress={this.showTimepicker} title="Show time picker!" />
        </View>
        {this.state.show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={this.state.date}
            mode={this.state.mode}
            is24Hour={true}
            display="default"
            onChange={this.onChange}
            minimumDate={new Date()}
          />
        )}
        <Text>{this.state.date.toLocaleString()}</Text>
        
        <View style={{ width: 200, height: 200}}>
          <LottieView source={require('./animation.json')} autoPlay loop />
        </View>
        
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
  },
});
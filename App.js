import React, {Component} from 'react';
import {
  TextInput,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Platform,
  Button,
  Animated,
  Image
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
      show: false,
      fadeAnimation: new Animated.Value(0),
      fadeAnimation2: new Animated.Value(0),
      opacity: 0,
      opacity2: new Animated.Value(0),
      playAnimation: false
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

  fadeIn = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 1,
      duration: 2000,
      useNativeDriver: true,
    }).start(this.fadeOut);
  };

  fadeOut = () => {
    Animated.timing(this.state.fadeAnimation, {
      toValue: 0,
      duration: 2000,
      useNativeDriver: true,
    }).start();
  };

  componentDidMount(){
    this.introductions()
  }

  introductions = () => {
    this.fadeIn()

    setInterval(() => {
      this.setState({opacity: 1, playAnimation: true})
    }, 4000)

    setInterval(() => {
      Animated.timing(this.state.opacity2, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start();
    }, 14000)
    //play lottiefile
  }

  render() {
    return (
      <View style={styles.container}>

        <Animated.View style={{opacity: this.state.fadeAnimation, justifyContent: "center", alignItems: "center"}}>
          <Image
            style={styles.logo}
            source={require('./images/my-icon.png')}
            tintColor="white"
          />
          <Text style={styles.headline}>A doggo development{"\n"}presents</Text>
        </Animated.View>

        {this.state.playAnimation ? 
        <View style={{ width: '100%', height: '100%', position: "absolute", opacity: this.state.opacity}}>
          <LottieView source={require('./background.json')} autoPlay loop={false} resizeMode='cover' />
        </View>
        : null}

        <Animated.View style={{position: "absolute",top:0, left:0, right:0, bottom: 0, opacity: this.state.opacity2, justifyContent: "center", alignItems: "center"}}>
          <Text style={styles.title}>SHUT APP</Text>
          <Text style={{margin: 20, color: "white", fontSize: 20}}>When do I need to remind you to shut up ?</Text>
          
          {/*<View>
            <Button onPress={this.showDatepicker} title="Show date picker!" />
          </View>*/}
          <TouchableOpacity onPress={this.showTimepicker} style={{backgroundColor: "black", justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: "white"}}>
            <Text style={{color:"white", fontSize: 20, padding: 20}}>Set the goddam time</Text>
          </TouchableOpacity>
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
          {/*<Text style={{color: "white"}}>{this.state.date.toLocaleString()}</Text>*/}
        </Animated.View>

      </View>
    );
  }

  /*
  
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
    backgroundColor: 'black',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 50,
    textAlign: 'center',
    color: "white"
  },
  headline: {
    fontSize: 25,
    textAlign: "center",
    color: "white"
  },
  logo: {
    width: 180,
    height: 150,
    marginVertical: "20%"
  },
});
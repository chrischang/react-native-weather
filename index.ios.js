import React, {Component} from 'react'
import {
  View,
  AppRegistry,
  MapView,
  StyleSheet,
  Text
} from 'react-native'
import Api from './src/api'

class Weather extends Component {
  constructor(props) {
    super(props)
    this.state = {
      pins: [{
        latitude: 0,
        longitude: 0
      }],
      city: '',
      temperature: '',
      description: ''
    }
  }
  render() {
    return (<View style={styles.container}>
      <MapView
      annotations={this.state.pins}
      onRegionChangeComplete={this.onRegionChangeComplete.bind(this)}
      style={styles.map}
      >
      </MapView>
      <View style={styles.description}>
        <Text style={styles.text}>{this.state.city}</Text>
        <Text style={styles.text}>{this.state.temperature}</Text>
        <Text style={styles.text}>{this.state.description}</Text>
      </View>
    </View>)
  }
  onRegionChangeComplete(region) {
    this.setState({
      pins: [{
        latitude: region.latitude,
        longitude: region.longitude
      }]
    });

    Api(region.latitude, region.longitude)
      .then((data) => {
        this.setState(data)
      })
  }
  borderHelper(color) {
    return {
      borderColor: color,
      borderWidth: 3
    }
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    backgroundColor: '#F5FCFF'
  },
  map: {
    flex: 2,
    marginTop: 30
  },
  description: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
  },
  text: {
    fontSize: 30
  }
})

AppRegistry.registerComponent('weather', () => Weather);
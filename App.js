import * as React from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Header } from 'react-native-elements';

export default class App extends React.Component {
  constructor() {
    super();
    this.state = { word: '', defination: '' };
  }
  getWord = (word) => {
    var url = 'https://api.dictionaryapi.dev/api/v2/entries/en/' + word;
    return fetch(url)
      .then((data) => {
        return data.json();
      })
      .then((response) => {
        console.log(response);
        //var responseObject = JSON.parse(response);
        var word = response[0].word;
        console.log(word);
        var defination = response[0].meanings[0].definitions[0].definition;
        console.log(defination);
        this.setState({
          word: word.trim(),
          defination: defination.trim(),
        });
      });
  };

  render() {
    return (
      <View style={styles.container}>
        <Header
          backgroundColor={'white'}
          centerComponent={{
            text: 'Pocket dictionary',
            style: { color: 'black', fontSize: 20, fontWeight: 'bold' },
          }}
        />
        <Text style={{ marginTop: 30, color: 'black', fontWeight: 'bold' }}>
          Type the word that you want to know the meaning
        </Text>

        <TextInput
          style={{
            borderWidth: 3,
            marginTop: 80,
            textAlign: 'center',
            color: 'black',
          }}
          onChangeText={(text) => {
            this.setState({
              text: text,
              isSearchedPressed: false,
              word: 'loading....',
              lexicalCategory: '',
              defination: '',
            });
          }}
        />

        <TouchableOpacity
          style={{
            backgroundColor: '',
            marginTop: 50,
            marginLeft: 230,
            width: 70,
            height: 40,
            alignItems: 'center',
            justifyContent: 'center',
            borderColor: 'black',
            borderRadius: 2,
          }}
          onPress={() => {
            this.setState({ isSearchedPressed: true });
            this.getWord(this.state.text);
          }}>
          <Text style={{ border: 20 }}>Search</Text>
        </TouchableOpacity>

        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
          Word : {this.state.word}
        </Text>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black' }}>
          Definition : {this.state.defination}
        </Text>
        <Text style={{ marginLeft: 215, marginTop: 270 }}>
          Done by : Jaiakash
        </Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});

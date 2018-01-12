import React, { Component } from 'react';
import { AppRegistry, FlatList, StyleSheet, Text, View,Image } from 'react-native';

export default class FlatListBasics extends Component {

  constructor(props){
    super(props);

    this.state = {
      movies: null,
    };
  }

  render() {
    if(!this.state.movies){
      return(
        <View style={styles.loading}>
          <Text style={styles.text}>加载中...</Text>
        </View>
      );
    } else {
      return (
        <View style={styles.container}>
          <FlatList
            data={this.state.movies}
            renderItem={({item}) => this.renderRow(item)}
          />
        </View>
      );
    }
  }

  componentDidMount() {
    fetch('https://api.douban.com/v2/movie/top250')
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          movies: responseJson.subjects
        });    
      })
      .catch((error) => {
        alert(error);
      });
  }

   renderRow(movies){
    return(
      <View style = {styles.item}>
          <Image 
            style = {styles.img} 
            source = {{uri: movies.images.small}}/>
          <Text style = {styles.text}>
            {movies.title}
          </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  loading:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  container: {
    flex: 1,
    paddingTop: 35
   },
   item: {
    flex: 1,
    flexDirection: 'row',
    margin: 5
  },
  img: {
    height: 75,
    width: 130
  },
   text: {
     padding: 10,
     fontSize: 18,
     textAlign: 'center'
   }
});

AppRegistry.registerComponent('AwesomeProject', () => FlatListBasics);

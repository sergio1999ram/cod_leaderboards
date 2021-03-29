import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions, TouchableOpacity } from 'react-native';

export default function App() {
  const [showResults, setShowResults] = useState(false)
  const [data, setData] = useState(null)
  
  const fetchUsers = () => {
    fetch(`https://www.callofduty.com/api/papi-client/leaderboards/v2/title/mw/platform/psn/time/alltime/type/core/mode/career/page/1`)
    .then(response => response.json())
    .then((data) => setData(data))

    if(data === null) { 
      setShowResults(false)
    }
    else if( data !== null) {
      setShowResults(true)
    }
  }

  useEffect(() => {
    fetchUsers()
  }, [data])
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Call of Duty: MW Leaderboard</Text>
      {
        showResults ? 
                        <FlatList
                        data={data.data.entries}
                        renderItem={({item}) => <View style={styles.itemContainer}
                        keyExtractor={({item}) => item.rank}
                        numColumns={2}>
                           <Text style={styles.items}>{item.username}</Text>
                          <Text style={{ margin: 'auto', padding: 10}}>{item.rank}</Text>
                        </View>
                      }/> : 
                            <Text>Nothing to show</Text>
      }
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  title: {
    paddingVertical: 10,
    fontSize: 24
  },
  itemContainer: {
    flex:1, 
    flexDirection: 'row', 
    width:Dimensions.get("window").width-10,
    borderWidth: 1,
    borderRadius: 3,
    marginVertical: 5,
    backgroundColor: "#9cacbf"
  },
  items: {
    flex:1,
    padding: 10,
    flexDirection: 'row',
  },

});

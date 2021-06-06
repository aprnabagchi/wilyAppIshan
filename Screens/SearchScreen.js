import React from 'react';
import {
  Text,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import db from '../config';
import { ScrollView } from 'react-native-gesture-handler';

export default class Searchscreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allTransactions: [],
      lastVisibleTransaction: null,
      search: '',
    };
    var cleared = 0;
  }

  fetchMoreTransactions = async () => {
    var text = this.state.search.toUpperCase();
    var enteredText = text.split('');

    if (enteredText[0].toUpperCase() === 'B') {
      const query = await db
        .collection('transactions')
        .where('bookID', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredText[0].toUpperCase() === 'S') {
      const query = await db
        .collection('transactions')
        .where('bookID', '==', text)
        .startAfter(this.state.lastVisibleTransaction)
        .limit(10)
        .get();
      query.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    }
  };

  searchTransactions = async (text) => {
    var enteredText = text.split('');
    if (enteredText[0].toUpperCase() === 'B') {
      const transaction = await db
        .collection('transactions')
        .where('bookID', '==', text)
        .get();
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else if (enteredText[0].toUpperCase() === 'S') {
      const transaction = await db
        .collection('transactions')
        .where('studentID', '==', text)
        .get();
      transaction.docs.map((doc) => {
        this.setState({
          allTransactions: [...this.state.allTransactions, doc.data()],
          lastVisibleTransaction: doc,
        });
      });
    } else {
      var temp = [];
      var text = this.state.search.toLowerCase();
      const query1 = await db
        .collection('books')
        .where('bookdetails', 'in', text)
        .get();
      query1.docs.map((doc) => {
        temp.push(doc.data());
      });
      const query2 = await db
        .collection('students')
        .where('studentDetails', 'in')
        .get();
      query2.docs.map((doc) => {
        temp.push(doc.data());
      });
      console.log(temp);
      this.setState({ allTransactions: temp });
    }
  };

  componentDidMount = async () => {
    const query = await db.collection('transactions').limit(10).get();
    query.docs.map((doc) => {
      this.setState({
        allTransactions: [],
        lastVisibleTransaction: doc,
      });
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.bar}
            placeholder="Enter Book Id or Student Id"
            onChangeText={(text) => {
              this.setState({ search: text });
            }}
          />
          <TouchableOpacity
            style={styles.searchButton}
            onPress={() => {
              this.setState({ allTransactions: [] });
              this.searchTransactions(this.state.search);
            }}>
            <Text>Search</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={this.state.allTransactions}
          renderItem={({ item }) =>
            typeof item.transactionType != undefined ? (
              <View style={{ borderBottomWidth: 2 }}>
                <Text>{'Book Id: ' + item.bookID}</Text>
                <Text>{'Student id: ' + item.studentID}</Text>
                <Text>{'Transaction Type: ' + item.transactionType}</Text>
                <Text>{'Date: ' + item.date.toDate()}</Text>
              </View>
            ) : typeof item.bookDetails != undefined ? (
              <View style={{ borderBottomWidth: 2 }}>
                <Text>{'book name: ' + item.bookdetails.bookName}</Text>
              </View>
            ) : typeof item.studentDetails != undefined ? (
              <View style={{ borderBottomWidth: 2 }}>
                <Text>{'book name: ' + item.bookdetails.bookName}</Text>
              </View>
            ) : (
              <Text>Sorry.Could not find this in our database!</Text>
            )
          }
          keyExtractor={(item, index) => index.toString()}
          onEndReached={this.fetchMoreTransactions}
          onEndReachedThreshold={0.7}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  searchBar: {
    flexDirection: 'row',
    height: 40,
    width: 'auto',
    borderWidth: 0.5,
    alignItems: 'center',
    backgroundColor: 'grey',
  },
  bar: {
    borderWidth: 2,
    height: 30,
    width: 300,
    paddingLeft: 10,
  },
  searchButton: {
    borderWidth: 1,
    height: 30,
    width: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'green',
  },
});

import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, Dimensions } from 'react-native';
import { Header, Icon, Input, Button, ListItem } from 'react-native-elements';

export default function App() {

  const [product, setProduct] = React.useState('');
  const [amount, setAmount] = React.useState(null);
  const [item, setItem] = React.useState([]);

  const saveItem = () => {
    if (product && amount) {
      setItem([...item, { product: product, amount: amount }]);
      setProduct('');
      setAmount(null);
    }
    else {
      return;
    }
  }

  const deleteItem = index => {
    const newItems = [...item];
    newItems.splice(index, 1);
    setItem(newItems);

  };


  renderItem = ({ item }) => (
    <ListItem style={{
      flex: 1, width: 200, alignContent: 'center', alignSelf: 'center', justifyContent:'center'
    }} bottomDivider
    >
      <ListItem.Content style={{ alignItems: 'flex-start' }}>
        <ListItem.Title>{item.product}</ListItem.Title>
        <ListItem.Subtitle> {item.amount}</ListItem.Subtitle>      
      </ListItem.Content>
      <ListItem.Content style={{ alignItems: 'flex-end'}}>
      <Icon type='material' name='delete' size={36} color='firebrick' onPress={item => deleteItem(item)}/>
      </ListItem.Content>
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <View style={{
        flex: 0
      }}>
        <Header
          leftComponent={{ icon: 'menu', color: '#fff' }}
          centerComponent={{ text: 'shopping list', style: { color: '#fff', fontSize: 26 } }}
          rightComponent={{ icon: 'home', color: '#fff' }}

        />
      </View>
      <View style={{
        flex: 0, width: 200, alignContent: 'center', marginTop:20, marginBottom:10
      }}>
        <Input placeholder='product' label='product' onChangeText={product => setProduct(product)} value={product} />
        <Input placeholder='amount' label='amount' onChangeText={amount => setAmount(amount)} value={amount} keyboardType='number-pad' />
        <Button icon={{type:'material', name:'save', color: 'white' }} onPress={saveItem} title="SAVE" />

      </View>
      <View style={{
        flex: 3, alignItems: 'center', justifyContent: 'center', width: 400
      }}>
       
        <FlatList data={item} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
      </View>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
   
  },
});

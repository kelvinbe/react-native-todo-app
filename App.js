import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, FlatList,Alert, TouchableWithoutFeedback, Keyboard } from "react-native";
import React, { useState } from "react";
import Header from "./components/header";
import TodoItem from "./components/todoItem";
import AddTodo from "./components/addTodo";
import SandBox from "./components/sandBox";

export default function App() {
  const [todos, setTodos,] = useState([
    { text: "buy coffee", key: "1" },
    { text: "create an app", key: "2" },
    { text: "play on the switch", key: "3" },
  ]);
  const [click, setClick] = useState(false)


  const pressHandler = (key) => {
      setTodos((prevTodos) => {
        return prevTodos.filter(todo => todo.key != key)
      })  
  }

  const submitHandler = (text) => {

    if(text.length > 2) {
      setTodos((prevTodos) => {
        return [
          {text: text, key: Math.random().toString()},
          ...prevTodos
        ]
      }) 
      setClick(true)

    }else{
      Alert.alert('OOPS', 'Todos must be over 3 chars long', [
        {text: 'OK', onPress: () => console.log('Alert closed')}
      ])
    }
    
  }

  return (
    // <SandBox />
    <TouchableWithoutFeedback onPress={() => {
      Keyboard.dismiss()
      console.log('Dismissed keyboard')
    }}>
    <View style={styles.container}>
      <Header />

      <View style={styles.content}>
        <AddTodo submitHandler={submitHandler} click={click} />
        <View style={styles.list}>
          <FlatList
            data={todos}
            renderItem={({ item }) => <TodoItem item={item} pressHandler={pressHandler}  />}
          />
        </View>
      </View>
    </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  content: {
    padding: 40,
    backgroundColor: 'pink',
    flex: 1
  },
  list: {
    marginTop: 20,
    flex: 1
  },
});

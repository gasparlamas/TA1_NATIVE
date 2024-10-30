import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
} from "react-native";
import { HelloWave } from "@/components/HelloWave";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function HomeScreen() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [valor, setValor] = useState(0);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { id: Date.now().toString(), text: task }]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };


  const sumarTask = () => {
    setValor(valor + 1);
  };

  const restarTask = () => {
    if (valor > 0) {
      setValor(valor - 1);
    }
  };

  return (
    <FlatList
      ListHeaderComponent={
        <>
          <View style={styles.headerContainer}>
            <Image
              source={require("@/assets/images/partial-react-logo.png")}
              style={styles.reactLogo}
            />
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Lista modificable!</ThemedText>
              <HelloWave />
            </ThemedView>
            <ThemedView style={styles.contadorContainer}>
              <Button
                onPress={sumarTask}
                title="Sumar"
                color={"blue"}
              />
              <Text style={styles.contadorText}>{valor}</Text>
              <Button
                onPress={restarTask}
                title="Restar"
                color={"red"}
              />
            </ThemedView>

            <ThemedView style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Añadir tarea"
                value={task}
                onChangeText={setTask}
              />
              <Button title="Añadir tarea" onPress={addTask} />
            </ThemedView>
          </View>
        </>
      }
      data={tasks}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ThemedView style={styles.taskContainer}>
          <Text style={styles.taskText}>{item.text}</Text>
          <TouchableOpacity onPress={() => deleteTask(item.id)}>
            <Text style={styles.deleteText}>Borrar</Text>
          </TouchableOpacity>
        </ThemedView>
      )}
    />
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  contadorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    justifyContent: 'space-around',
    width: '100%',
  },
  contadorText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 8,
    marginRight: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  taskText: {
    fontSize: 16,
  },
  deleteText: {
    color: 'red',
    fontWeight: 'bold',
  },
  reactLogo: {
    height: 178,
    width: 290,
  },
});
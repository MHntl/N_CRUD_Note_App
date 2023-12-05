import React, {useState, useEffect, useContext} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  FlatList,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomTextInput from '../components/CustomTextInput';
import SearchIcon from '../assets/images/SearchIcon.png';
import colors from '../themes/Colors';
import CustomButton from '../components/CustomButton';
import TodoItem from '../components/TodoItem';
import {useNavigation} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {useTaskContext} from '../context/AppContext';

const TaskListScreen = () => {
  const [searchText, setSearchText] = useState('');
  const navigation = useNavigation();
  // const {tasks} = useTaskContext();

  const [tasks, setTask] = useState([
    {
      userId: 1,
      id: 1,
      title: 'delectus aut autem',
      completed: false,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 2,
      title: 'quis ut nam facilis et officia qui',
      completed: false,
      status: 'open',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 3,
      title: 'fugiat veniam minus',
      completed: false,
      status: 'open',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 4,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 5,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 6,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      userId: 1,
      id: 7,
      title: 'et porro tempora',
      completed: true,
      status: 'progress',
      startDate: new Date(),
      endDate: new Date(),
    },
  ]);
  const renderHeader = () => {
    return (
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}> Task</Text>
      </View>
    );
  };
  const renderEmptyList = () => {
    return (
      <View style={styles.emptyListContainer}>
        <Icon name="text-box-remove" size={60} color={'gray'} />
        <Text style={styles.emptyText}> Empty Task</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainContextContainer}>
        <SafeAreaView style={[styles.container, {marginBottom: 20}]}>
          <CustomTextInput
            onChangeText={setSearchText}
            value={searchText}
            ImageSource={SearchIcon}
            style={{marginHorizontal: 0}}
            placeholder={'Search'}
          />
          {/* //! Component Map */}
          <FlatList
            data={tasks}
            ListHeaderComponent={renderHeader}
            ListEmptyComponent={renderEmptyList}
            showsVerticalScrollIndicator={false}
            keyExtractor={item => item.id?.toString()}
            renderItem={({item}) => <TodoItem data={item} />}
          />
        </SafeAreaView>
        <CustomButton
          onPress={() => navigation.navigate(ScreenName.addTask)}
          label="Add Task"
        />
      </View>
    </View>
  );
};

export default TaskListScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    //alignItems: 'center',
  },
  mainContextContainer: {
    height: '100%',
    width: Dimensions.get('screen').width,
    position: 'absolute',
    padding: 20,
  },
  headerText: {fontSize: 25, fontWeight: 'bold', color: colors.text.primary},
  headerContainer: {marginVertical: 10},
  emptyText: {fontSize: 15, fontWeight: '500', color: 'gray'},
  emptyListContainer: {flex: 1, justifyContent: 'center', alignItems: 'center'},
  inputContainer: {flexDirection: 'row', marginBottom: 20},
  input: {
    flex: 1,
    marginRight: 10,
    borderWidth: 1,
    padding: 12,
    borderRadius: 10,
    borderColor: 'gray',
  },
  todoItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  button: {
    marginLeft: 10,
    padding: 5,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  addButton: {backgroundColor: 'blue'},
  updateButton: {backgroundColor: 'green'},
  buttonText: {color: '#fff'},
});

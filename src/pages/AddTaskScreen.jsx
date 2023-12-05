import {View, Text, StyleSheet} from 'react-native';
import React, {useLayoutEffect, useState} from 'react';
import LottieView from 'lottie-react-native';
import CustomTextInput from '../components/CustomTextInput';
import TaskNameIcon from '../assets/images/SearchIcon.png';
import CustomButton from '../components/CustomButton';
import colors from '../themes/Colors';
import DropDownPicker from 'react-native-dropdown-picker';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import Status from '../constants/Status';
import {useTaskContext} from '../context/AppContext';
import {useNavigation, useRoute} from '@react-navigation/native';
import ScreenName from '../constants/ScreenName';

const AddTaskScree = () => {
  const [title, setTitle] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [SelectedStartDate, setSelectedStartDate] = useState(new Date());
  const [SelectedEndDate, setSelectedEndDate] = useState(new Date());
  const {addTask, updateTask} = useTaskContext();
  const navigation = useNavigation();
  const route = useRoute();
  const task = route?.params?.task;

  //-DateTimePickerModal
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    // console.warn('A date has been picked: ', date);
    hideDatePicker();
  };
  //-----------------

  //? DropdownPicker
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'Open', value: 'open'},
    {label: 'Progress', value: 'progress'},
    {label: 'Pending', value: 'pending'},
    {label: 'Closed', value: 'closed'},
  ]);
  //? -------------

  const handleAddTask = () => {
    const newTask = {
      id: task ? task?.id : Date.now(),
      title,
      completed: false,
      startDate: SelectedStartDate?.toString(),
      endDate: SelectedEndDate?.toString(),
      status: value ? value : Status.open,
    };
    if (task?.id) {
      updateTask(newTask);
    } else {
      addTask(newTask);
    }
    navigation.navigate(ScreenName.taskList);
  };
  // useLayoutEffect =useEffect'le ayni kullanimi vardir.Dom yada arayuzde degisiklik yapmada kullanilir
  useLayoutEffect(() => {
    setTitle(task?.title);
    setSelectedStartDate(task ? task?.startDate : new Date()?.toISOString());
    setSelectedEndDate(task ? task?.endDateDate : new Date()?.toISOString());
    setValue(task?.status);
    navigation.setOptions({
      title: task?.title ? 'Task Düzenle' : 'Task Oluştur',
    });
  }, [navigation, task]);

  return (
    <View style={styles.container}>
      <View style={styles.inlineContainer}>
        <View style={StyleSheet.taskImageContainer}></View>
        <CustomTextInput
          onChangeText={setTitle}
          value={title}
          label={'Task Name'}
          ImageSource={TaskNameIcon}
        />
        <View style={{flexDirection: 'row'}}>
          <CustomTextInput
            label={'Start Date'}
            style={{width: '40%'}}
            onChangeText={setTitle}
            value={SelectedStartDate}
            ImageSource={TaskNameIcon}
            onPressIcon={() => showDatePicker()}
            isDate
          />
          <CustomTextInput
            style={{width: '40%'}}
            label={'Finish Date'}
            onChangeText={setTitle}
            value={SelectedEndDate}
            ImageSource={TaskNameIcon}
            onPressIcon={() => showDatePicker()}
            isDate
          />
        </View>
        <View style={styles.dropdownContainer}>
          <View>
            <Text style={styles.status}>Status</Text>
            {/* DropDownPicker */}
            <DropDownPicker
              listMode="SCROLLVIEW"
              open={open}
              value={value}
              items={items}
              setOpen={setOpen}
              setValue={setValue}
              setItems={setItems}
              containerStyle={{width: '90%'}}
              style={{borderWidth: 0}}
            />
          </View>
        </View>
      </View>
      <CustomButton
        onPress={() => {
          handleAddTask();
        }}
        style={{width: '95%'}}
        label={task ? 'Task Düzenle' : 'Task Oluştur'}></CustomButton>
      {/* DateTimePickerModal */}

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="datetime"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        locale="tr-TR"
        confirmTextIOS="Onayla"
        cancelTextIOS="İptal"
      />
    </View>
  );
};

export default AddTaskScree;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
    alignItems: 'center',
  },
  inlineContainer: {width: '100%'},
  taskImageContainer: {marginTop: 60},
  status: {
    fontSize: 15,
    fontWeight: 600,
    marginBottom: 5,
    color: colors.text.primary,
  },
  dropdownContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 350,
  },
});

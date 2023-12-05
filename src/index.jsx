//!Ana klasor icindeki App.js i devredisi biraktik
//!bu sayfayinun path ini anaklasordeki index.js in icerisine yazdik

import React from 'react';
//navigation klasorunun icinde olusturdugumuz dosya
import Routes from './navigation/Routes';
import {NavigationContainer} from '@react-navigation/native';

// import TaskProvider from './context/AppContext';
import Toast from 'react-native-toast-message';
import {TaskProvider} from './context/AppContext';

export default function App() {
  return (
    <TaskProvider>
      <NavigationContainer>
        {/* navigation klasoru icinde olusturdugumuz dosya burada konulur*/}
        <Routes />
      </NavigationContainer>
      <Toast />
    </TaskProvider>
  );
}

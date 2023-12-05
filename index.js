/**
 * @format
 */

import {AppRegistry} from 'react-native';
//import App from './App';

//!Eklenen dosya path'i
import App from './src';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => App);

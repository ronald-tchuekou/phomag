import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../../screens/manager/home.screen'
import PrinterServicesDetailsScreen from '../../screens/manager/printer-services-details.screen'
import PrinterServicesAddScreen from '../../screens/manager/printer-services.add.screen'
import PrinterServicesScreen from '../../screens/manager/printer-services.screen'
import RequestDetailsScreen from '../../screens/manager/request-details.screen'

const PrinterServicesFlow = createStackNavigator({
   PrinterServicesScreen: PrinterServicesScreen,
   PrinterServicesAddScreen: PrinterServicesAddScreen,
   PrinterServicesDetailsScreen: PrinterServicesDetailsScreen,
   RequestDetailsScreen: RequestDetailsScreen
}, {
   initialRouteName: 'PrinterServicesScreen'
})

export default PrinterServicesFlow
